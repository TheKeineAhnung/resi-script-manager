## apiPost

### General information

- Function: Execute a POST request to an API from ReSi
- Path: `./src/ts/helper/api.ts`
- Asynchronous function: `Yes`

### Function parameters

- api

  - Typ: `string`
  - Explanation: Name of the API as it appears in the URL, without `/` in front of it to execute a request
  - Optional: `No`
  - Default:

- data

  - Typ: `object`
  - Explanation: Expects the data for the API request
  - Optional: `No`
  - Default:

### Return value

- `Promise<unknown>`
