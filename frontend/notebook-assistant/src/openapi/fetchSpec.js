/**
 * fetchSpec.js
 * Fetches the OpenAPI specification from the backend endpoint.
 * For MVP we keep it extremely small. Handles network & JSON errors.
 */
export async function fetchOpenAPISpec(url) {
  const started = performance.now();
  const res = await fetch(url, {
    headers: {
      'Accept': 'application/json'
    }
  });
  if (!res.ok) {
    throw new Error(`Failed to load spec: ${res.status} ${res.statusText}`);
  }
  try {
    const json = await res.json();
    return { spec: json, ms: Math.round(performance.now() - started) };
  } catch (e) {
    throw new Error('Invalid JSON in OpenAPI spec: ' + e.message);
  }
}
