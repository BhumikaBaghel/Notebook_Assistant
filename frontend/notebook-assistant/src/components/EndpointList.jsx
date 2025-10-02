/**
 * EndpointList.jsx
 * Displays grouped endpoints by tag. Selecting one sets the current operation in context.
 */
import React, { useMemo, useState } from 'react';
import { Box, Stack, Button, Badge, Text, Flex } from '@chakra-ui/react';
import { useOpenAPI } from '../openapi/useOpenAPI.js';
import { groupOperationsByTag } from '../openapi/groupOperations.js';
import { IconChevronDown, IconChevronRight } from './icons.js';

export function EndpointList() {
  const { spec, setSelectedOperation, selectedOperation } = useOpenAPI();
  const groups = useMemo(() => groupOperationsByTag(spec), [spec]);
  // Track open/closed state manually; default all collapsed except first.
  const initialOpen = React.useMemo(() => {
    const sortedTags = Object.keys(groups).sort();
    const obj = {};
    sortedTags.forEach((tag, idx) => { obj[tag] = idx === 0; });
    return obj;
  }, [groups]);
  const [openMap, setOpenMap] = useState(initialOpen);

  function toggle(tag) {
    setOpenMap(m => ({ ...m, [tag]: !m[tag] }));
  }

  return (
    <Box maxW="400px" overflowY="auto" h="100%" pr={2}>
      {Object.keys(groups).sort().map(tag => {
        const open = openMap[tag];
        return (
          <Box key={tag} mb={3}>
            <Flex
              role="button"
              onClick={() => toggle(tag)}
              cursor="pointer"
              align="center"
              px={2}
              py={2}
              borderRadius="md"
              _hover={{ bg: 'blue.600' }}
              bg={open ? 'blue.800' : 'transparent'}
            >
              <Box mr={2}>{open ? <IconChevronDown /> : <IconChevronRight />}</Box>
              <Box flex="1" fontWeight="semibold">{tag}</Box>
              <Badge ml={2}>{groups[tag].length}</Badge>
            </Flex>
            {open && (
              <Box pl={6} pt={2}>
                <Stack spacing={2}>
                  {groups[tag].map(op => {
                    const isActive = selectedOperation && selectedOperation.path === op.path && selectedOperation.method === op.method;
                    return (
                      <Button key={op.method + op.path}
                              size="sm"
                              justifyContent="flex-start"
                              variant={isActive ? 'solid' : 'ghost'}
                              colorScheme={isActive ? 'blue.900' : 'blue.600'}
                              onClick={() => setSelectedOperation(op)}
                              leftIcon={<MethodBadge method={op.method} />}
                      >
                        <Text noOfLines={1}>{op.summary}</Text>
                      </Button>
                    );
                  })}
                </Stack>
              </Box>
            )}
          </Box>
        );
      })}
    </Box>
  );
}

function MethodBadge({ method }) {
  const colorMap = {
    get: 'green', post: 'blue', put: 'orange', delete: 'red', patch: 'purple'
  };
  return <Badge colorScheme={colorMap[method] || 'gray'}>{method.toUpperCase()}</Badge>;
}
