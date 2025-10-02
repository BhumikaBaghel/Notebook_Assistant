/**
 * OpenAPIContext.jsx
 * Provides global access to the loaded OpenAPI specification and selection state.
 * Plain JS (no TS) for early MVP simplicity.
 *
 * Responsibilities:
 *  - Store the fetched spec
 *  - Expose loading/error states
 *  - Allow selection of a specific operation (method + path)
 */
import React, { createContext, useState, useMemo } from 'react';

const OpenAPIContext = createContext(null);

function OpenAPIProvider({ children }) {
  const [spec, setSpec] = useState(null); // The entire OpenAPI document JSON
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedOperation, setSelectedOperation] = useState(null); // { path, method, operationObject }

  const value = useMemo(() => ({
    spec,
    setSpec,
    loading,
    setLoading,
    error,
    setError,
    selectedOperation,
    setSelectedOperation
  }), [spec, loading, error, selectedOperation]);

  return (
    <OpenAPIContext.Provider value={value}>
      {children}
    </OpenAPIContext.Provider>
  );
}

export default OpenAPIContext;

export { OpenAPIProvider };