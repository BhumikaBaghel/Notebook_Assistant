/**
 * OpenAPILoader.jsx
 * Fetches and initializes the OpenAPI spec on mount.
 * Shows loading and error UI. Children render once spec is available.
 */
import React, { useEffect } from 'react';
import { Box, Spinner, Alert, Text, Flex } from '@chakra-ui/react';
import { IconError } from './icons.js';
import { useOpenAPI } from '../openapi/useOpenAPI.js';
import { fetchOpenAPISpec } from '../openapi/fetchSpec.js';

export function OpenAPILoader({ specUrl, children }) {
  const { spec, setSpec, loading, setLoading, error, setError } = useOpenAPI();

  useEffect(() => {
    let cancelled = false;
    async function load() {
      if (spec) return; // already loaded
      setLoading(true);
      setError(null);
      try {
        const { spec: json } = await fetchOpenAPISpec(specUrl);
        if (!cancelled) setSpec(json);
      } catch (e) {
        if (!cancelled) setError(e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [specUrl, spec, setSpec, setLoading, setError]);

  if (loading) {
    return <Box p={6} textAlign="center"><Spinner size="xl" /> <Text mt={2}>Loading API specification...</Text></Box>;
  }
  if (error) {
    return (
      <Alert status='error'>
        <Flex align="flex-start" gap={2}>
          <IconError style={{ marginTop: 4 }} />
          <Text>Failed to load spec: {error.message}</Text>
        </Flex>
      </Alert>
    );
  }
  if (!spec) return null; // Should be brief
  return <>{children}</>;
}
