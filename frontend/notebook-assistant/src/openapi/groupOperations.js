/**
 * groupOperations.js
 * Utility to transform OpenAPI paths object into a tag->operations map.
 * Each operation entry: { path, method, summary, operationObject }
 * Untagged operations fall under key 'untagged'.
 */
export function groupOperationsByTag(spec) {
  if (!spec || !spec.paths) return {};
  const groups = {};
  for (const path of Object.keys(spec.paths)) {
    const pathItem = spec.paths[path];
    for (const method of Object.keys(pathItem)) {
      const operation = pathItem[method];
      // Skip non-HTTP keys (like parameters at path level) by checking operationId or summary presence heuristically
      const lower = method.toLowerCase();
      if (!['get','post','put','patch','delete','options','head'].includes(lower)) continue;
      const tags = operation.tags && operation.tags.length ? operation.tags : ['untagged'];
      tags.forEach(tag => {
        if (!groups[tag]) groups[tag] = [];
        groups[tag].push({
          path,
            method: lower,
            summary: operation.summary || operation.operationId || `${lower.toUpperCase()} ${path}`,
            operationObject: operation
        });
      });
    }
  }
  // Sort operations alphabetically inside each tag for deterministic UI
  Object.keys(groups).forEach(tag => {
    groups[tag].sort((a,b) => a.summary.localeCompare(b.summary));
  });
  return groups;
}
