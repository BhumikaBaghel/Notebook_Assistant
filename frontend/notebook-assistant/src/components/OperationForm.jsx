/**
 * OperationForm.jsx
 * Renders a form for the currently selected operation.
 * Handles path/query/header params and JSON body.
 * This is intentionally simple for MVP; more robust validation & typed rendering can come later.
 */
import React, { useState, useMemo } from 'react';
import { Box, Heading, Text, Stack, Button, Code, Alert, Flex } from '@chakra-ui/react';
import { IconError } from './icons.js';
import { useOpenAPI } from '../openapi/useOpenAPI.js';
import { generateExampleFromSchema } from '../openapi/generateExample.js';

export function OperationForm() {
  const { selectedOperation } = useOpenAPI();
  const [paramValues, setParamValues] = useState({});
  const [bodyValue, setBodyValue] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const op = selectedOperation;
  const operationObject = op?.operationObject;

  const params = useMemo(() => {
    if (!operationObject) return [];
    return (operationObject.parameters || []).filter(p => !!p); // basic guard
  }, [operationObject]);

  const pathParams = params.filter(p => p.in === 'path');
  const queryParams = params.filter(p => p.in === 'query');
  const headerParams = params.filter(p => p.in === 'header');

  const requestBodySchema = useMemo(() => {
    const content = operationObject?.requestBody?.content;
    if (content && content['application/json']) {
      return content['application/json'].schema;
    }
    return null;
  }, [operationObject]);

  // Pre-populate example for body when operation changes.
  React.useEffect(() => {
    if (requestBodySchema) {
      try {
        const example = generateExampleFromSchema(requestBodySchema);
        setBodyValue(JSON.stringify(example, null, 2));
      } catch {
        setBodyValue('{}');
      }
    } else {
      setBodyValue('');
    }
    setParamValues({});
    setResponse(null);
    setError(null);
  }, [requestBodySchema, op?.path, op?.method]);

  if (!op) {
    return <Box p={6}><Text fontSize="lg" color="gray.500">Select an endpoint to begin.</Text></Box>;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setResponse(null);
    try {
      const url = buildUrl(op.path, pathParams, queryParams, paramValues);
      const headers = buildHeaders(headerParams, paramValues, requestBodySchema);
      const init = { method: op.method.toUpperCase(), headers };
      if (requestBodySchema) {
        try {
          init.body = JSON.stringify(JSON.parse(bodyValue));
        } catch (parseErr) {
          throw new Error('Body is not valid JSON: ' + parseErr.message);
        }
      }
      const started = performance.now();
      const res = await fetch(url, init);
      const elapsed = Math.round(performance.now() - started);
      let text = await res.text();
      let parsed = null;
      try { parsed = JSON.parse(text); } catch { /* keep raw */ }
      setResponse({ status: res.status, ok: res.ok, headers: Object.fromEntries(res.headers.entries()), time: elapsed, bodyText: text, bodyJson: parsed });
      if (!res.ok) {
        setError(new Error('Request failed with status ' + res.status));
      }
    } catch (err) {
      setError(err);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Box p={6} h="100%" overflowY="auto">
      <Heading size="md" mb={2}>{op.method.toUpperCase()} {op.path}</Heading>
      {operationObject?.summary && <Text mb={4}>{operationObject.summary}</Text>}
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          {pathParams.length > 0 && <SectionHeading title="Path Parameters" />}
          {pathParams.map(p => (
            <ParamField key={p.name} param={p} value={paramValues[p.name] || ''} onChange={v => setParamValues(vs => ({ ...vs, [p.name]: v }))} />
          ))}

          {queryParams.length > 0 && <SectionHeading title="Query Parameters" />}
          {queryParams.map(p => (
            <ParamField key={p.name} param={p} value={paramValues[p.name] || ''} onChange={v => setParamValues(vs => ({ ...vs, [p.name]: v }))} />
          ))}

          {headerParams.length > 0 && <SectionHeading title="Header Parameters" />}
          {headerParams.map(p => (
            <ParamField key={p.name} param={p} value={paramValues[p.name] || ''} onChange={v => setParamValues(vs => ({ ...vs, [p.name]: v }))} />
          ))}

          {requestBodySchema && (
            <Box>
              <SectionHeading title="JSON Body" />
              <Field label="Body (editable)">
                <Box
                  as="textarea"
                  value={bodyValue}
                  onChange={e => setBodyValue(e.target.value)}
                  fontFamily="mono"
                  rows={10}
                  w="100%"
                  p={3}
                  borderWidth="1px"
                  borderRadius="md"
                  _focus={{ outline: 'none', borderColor: 'blue.400', boxShadow: '0 0 0 1px var(--chakra-colors-blue-400)' }}
                  resize="vertical"
                />
              </Field>
            </Box>
          )}

          <Box h="1px" bg="gray.200" />
          <Button colorScheme="blue" type="submit" isLoading={isSubmitting}>Send Request</Button>
        </Stack>
      </form>

      {error && (
        <Alert status='error' mt={6}>
          <Flex align="flex-start" gap={2}>
            <IconError style={{ marginTop: 4 }} />
            <Text>{error.message}</Text>
          </Flex>
        </Alert>
      )}
      {response && <ResponseBlock response={response} />}
    </Box>
  );
}

function SectionHeading({ title }) {
  return <Heading size="sm" mt={6} mb={2}>{title}</Heading>;
}

function ParamField({ param, value, onChange }) {
  return (
    <Field label={<>{param.name}{param.required && ' *'} <ParamTypeHint schema={param.schema} /></>} required={param.required}>
      <Box
        as="input"
        type="text"
        value={value}
        placeholder={param.description || ''}
        onChange={e => onChange(e.target.value)}
        w="100%"
        p={2}
        borderWidth="1px"
        borderRadius="md"
        fontSize="sm"
        _focus={{ outline: 'none', borderColor: 'blue.400', boxShadow: '0 0 0 1px var(--chakra-colors-blue-400)' }}
      />
    </Field>
  );
}

function Field({ label, children, required }) {
  return (
    <Box>
      <Text fontSize="sm" fontWeight="semibold" mb={1}>
        {label}{' '}
        {required && <Text as="span" color="red.500">*</Text>}
      </Text>
      {children}
    </Box>
  );
}

function ParamTypeHint({ schema }) {
  if (!schema) return null;
  const type = schema.type || (schema.anyOf ? 'anyOf' : 'value');
  return <Code ml={2} fontSize="0.7rem">{type}</Code>;
}

function buildUrl(path, pathParams, queryParams, values) {
  let url = path;
  pathParams.forEach(p => {
    const v = values[p.name];
    if (v == null || v === '') throw new Error(`Missing path param: ${p.name}`);
    url = url.replace(`{${p.name}}`, encodeURIComponent(v));
  });
  const qsPairs = [];
  queryParams.forEach(p => {
    const v = values[p.name];
    if (v != null && v !== '') qsPairs.push(`${encodeURIComponent(p.name)}=${encodeURIComponent(v)}`);
  });
  if (qsPairs.length) url += (url.includes('?') ? '&' : '?') + qsPairs.join('&');
  // Prepend backend base if relative
  if (!/^https?:/i.test(url)) {
    url = 'http://localhost:8000' + (url.startsWith('/') ? url : '/' + url);
  }
  return url;
}

function buildHeaders(headerParams, values, hasBody) {
  const headers = {};
  headerParams.forEach(p => {
    const v = values[p.name];
    if (v != null && v !== '') headers[p.name] = v;
  });
  if (hasBody) headers['Content-Type'] = 'application/json';
  return headers;
}

function ResponseBlock({ response }) {
  return (
    <Box mt={8}>
      <Heading size="sm" mb={2}>Response ({response.status}) {response.time}ms</Heading>
      <Heading size="xs" mb={1}>Headers</Heading>
      <Box as={Code} display="block" whiteSpace="pre" p={2} mb={4} maxH="150px" overflowY="auto">{JSON.stringify(response.headers, null, 2)}</Box>
      <Heading size="xs" mb={1}>Body</Heading>
      <Box as={Code} display="block" whiteSpace="pre" p={2} maxH="300px" overflowY="auto">{response.bodyJson ? JSON.stringify(response.bodyJson, null, 2) : response.bodyText}</Box>
    </Box>
  );
}
