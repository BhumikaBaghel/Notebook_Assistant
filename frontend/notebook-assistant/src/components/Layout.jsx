/**
 * Layout.jsx
 * Provides the high-level two-pane layout for the API explorer.
 */
import React from 'react';
import { Flex, Box } from '@chakra-ui/react';
import { EndpointList } from './EndpointList.jsx';
import { OperationForm } from './OperationForm.jsx';

export function Layout() {
  return (
    <Flex h="100vh" overflow="hidden">
      <Box w="380px" borderRight="1px solid" borderColor="gray.200" p={2}>
        <EndpointList />
      </Box>
      <Box flex="1" overflow="hidden">
        <OperationForm />
      </Box>
    </Flex>
  );
}
