/**
 * useOpenAPI.js
 * Separate hook file to keep fast refresh happy (component file exports only components).
 */
import { useContext } from 'react';
import OpenAPIContext from './OpenAPIContext.jsx';

// Central hook for accessing OpenAPI context. Keeping in its own file avoids React Fast Refresh warnings
// about mixing component and non-component exports.
export function useOpenAPI() {
  const ctx = useContext(OpenAPIContext);
  if (!ctx) throw new Error('useOpenAPI must be used within OpenAPIProvider');
  return ctx;
}
