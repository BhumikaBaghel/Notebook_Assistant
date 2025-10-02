
# Frontend – Notebook LM Clone

This is the frontend for the Notebook LM Clone project. It is a React + Vite app for document upload, notebook editing, and AI-powered chat.

---

## 🚀 Quickstart

1. **Install Node.js (v18+)**  
	 Download from [nodejs.org](https://nodejs.org/). Check with:
	 ```sh
	 node --version
	 npm --version
	 ```
2. **Install dependencies**  
	 In the `frontend/notebook-assistant/` directory, run:
	 ```sh
	 npm install
	 ```
3. **Start the development server**  
	 ```sh
	 npm run dev
	 ```
	 The app will be available at the local address shown in the terminal (usually http://localhost:5173).

---

## 📁 Project Structure

```
frontend/
	notebook-assistant/
		src/
			components/      # React components
			openapi/         # OpenAPI helpers
			assets/          # Static assets
		public/            # Static files
		package.json       # Project dependencies
		vite.config.js     # Vite config
```

---

## 🛠️ Development Notes

- **IDE**: VS Code + [VS Code React Plugin](https://marketplace.visualstudio.com/items?itemName=ms-vscode.reactjs-react-native) recommended.
- **API**: Expects backend FastAPI server running (see backend/README.md).
- **Environment Variables**: If you need to customize API endpoints, create a `.env` file (see Vite docs for details).
- **Styling**: Uses CSS modules and Vite defaults.

---

## 🐞 Troubleshooting

- **Port Conflicts**:  
	- If `npm run dev` fails, check if port 5173 is in use or set a new port in `.env`.
- **Dependency Issues**:  
	- Delete `node_modules/` and `package-lock.json`, then run `npm install` again.
- **API Errors**:  
	- Ensure the backend is running and accessible at the expected URL.
- **Windows Path Issues**:  
	- Use Git Bash or WSL if you encounter path or shell issues.

---

## 💡 Useful Commands

```sh
cd frontend/notebook-assistant
npm install
npm run dev
```

---

## 🤝 Contributing

1. Follow the roadmap in `../../PROJECT_ROADMAP.md`.
2. Use feature branches for new work.
3. Keep code modular and document new components.

---

## 📚 References

- [React Docs](https://react.dev/)
- [Vite Docs](https://vitejs.dev/)

## How OpenAPI → UI Works

Flow:
1. `OpenAPILoader` fetches the spec once and stores it in a React context.
2. `groupOperationsByTag()` converts `spec.paths` into a structure grouped by tag (fallback `untagged`).
3. `EndpointList` renders an accordion of tags and buttons for each operation.
4. On selection, `OperationForm` introspects the operation's `parameters` array and `requestBody` schema.
5. Path/query/header parameters become form fields; a JSON `requestBody` becomes an editable textarea with an auto-generated example.
6. Submitting builds the URL, injects params, and issues `fetch`.
7. `ResponseBlock` displays status, headers, and a pretty-printed JSON (or raw text) body.

## Key Files

```
src/openapi/OpenAPIContext.jsx   # Context provider storing spec + selection
src/openapi/useOpenAPI.js        # Hook for consuming context
src/openapi/fetchSpec.js         # Fetch logic
src/openapi/groupOperations.js   # Tag grouping utility
src/openapi/generateExample.js   # Simple schema example generator
src/components/OpenAPILoader.jsx # Loads spec (loading/error UI)
src/components/EndpointList.jsx  # Tag accordion + operation buttons
src/components/OperationForm.jsx # Dynamic form + request execution
src/components/Layout.jsx        # Two-pane layout
src/App.jsx                      # Root wiring
src/components/icons.js          # Central Font Awesome (react-icons) exports
```

## Example: Mapping Parameters

Given an OpenAPI snippet:
```json
{
	"/items/{id}": {
		"get": {
			"parameters": [
				{ "name": "id", "in": "path", "required": true, "schema": {"type": "string"}},
				{ "name": "verbose", "in": "query", "schema": {"type": "boolean"}}
			]
		}
	}
}
```
The form will render:
* Path input (required) for `id`
* Query input (optional) for `verbose`

## Body Example Generation

`generateExampleFromSchema()` performs a minimal recursive walk:
* object → each property seeded
* array → single element example
* string/integer/boolean → primitive placeholder
You can later swap this out for `openapi-sampler` or `json-schema-faker`.

## Extending the MVP

Planned enhancements:
* Better type-specific inputs (numbers, booleans as toggles)
* Enum → Select dropdown
* Auth token injection (header)
* Response schema visualizer
* Streaming support (for chat endpoints)
* Central icon theming (current: Font Awesome via react-icons)
* Reintroduce richer collapsible groups (replaced Chakra Accordion with custom collapse due to export mismatch)

## Design Principles

* Keep early layer pure React + fetch (no heavy state libs yet)
* Replace minimal utilities with libraries only when complexity rises
* Provide clear extension points (utilities are isolated)
* Use a central icon module (`icons.js`) to avoid scattered icon imports and allow easy replacement later

## Adding Validation (Future)

Introduce `zod` or `ajv` to validate form inputs before request dispatch. Display inline error states using Chakra `FormErrorMessage`.

## Troubleshooting

| Issue | Cause | Fix |
|-------|-------|-----|
| Spec never loads | Backend not running / CORS | Start backend; ensure CORS enabled or use proxy |
| 404 endpoints | Backend path mismatch | Confirm base URL; adjust `specUrl` in `App.jsx` |
| JSON parse error | Non-JSON response | Viewer falls back to raw text automatically |
| Missing AlertIcon export | Chakra version doesn't include named export | Replaced with Font Awesome icon (`icons.js`) |
| Missing Accordion* exports | Chakra build mismatch / partial install | Implemented custom collapse (see `EndpointList.jsx`) |
| UI not updating after dependency change | Vite cached old module | Stop dev server, remove `.vite` cache: delete `node_modules/.vite` and restart |
| Icons not rendering | `react-icons` not installed | Run `npm install react-icons` |

## Converting to TypeScript Later

When ready: add `typescript`, rename files to `.tsx`, introduce interfaces for `OperationEntry` & context value, and tighten utilities.

## License

Internal project (add license details here if needed).

