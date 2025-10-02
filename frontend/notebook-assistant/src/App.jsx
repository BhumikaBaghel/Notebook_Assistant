import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import { OpenAPIProvider } from './openapi/OpenAPIContext.jsx';
import { OpenAPILoader } from './components/OpenAPILoader.jsx';
import { Layout } from './components/Layout.jsx';
import { Provider } from './components/ui/provider.jsx';

/**
 * App.jsx
 * Root application component now hosts the OpenAPI-driven API Explorer MVP.
 * It wraps content with ChakraProvider and OpenAPIProvider.
 */
function App() {
  return (
    <Provider>
      <OpenAPIProvider>
        <OpenAPILoader specUrl="http://localhost:8000/openapi.json">
          <Layout />
        </OpenAPILoader>
      </OpenAPIProvider>
      {/* <Box position="fixed" top={0} left={0} p={2}>
        <Heading size="xs" color="gray.400">Notebook Assistant - API Explorer (MVP)</Heading>
      </Box> */}
    </Provider>
  );
}

export default App;

