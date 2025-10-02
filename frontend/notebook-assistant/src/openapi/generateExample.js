/**
 * generateExample.js
 * Very small heuristic to produce a JSON example skeleton from a JSON schema.
 * This is intentionally minimal for MVP; can be replaced later with a library.
 */
export function generateExampleFromSchema(schema) {
  if (!schema) return {};
  if (schema.example) return schema.example;
  if (schema.default) return schema.default;
  if (schema.enum) return schema.enum[0];
  switch (schema.type) {
    case 'string': return schema.format === 'date-time' ? new Date().toISOString() : 'string';
    case 'integer':
    case 'number': return 0;
    case 'boolean': return false;
    case 'array': return [generateExampleFromSchema(schema.items)];
    case 'object': {
      const obj = {};
      if (schema.properties) {
        Object.keys(schema.properties).forEach(key => {
          obj[key] = generateExampleFromSchema(schema.properties[key]);
        });
      }
      return obj;
    }
    default: return null;
  }
}
