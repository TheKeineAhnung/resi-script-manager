## apiGet

### General information

- Function: execute a GET request to an API from ReSi and if necessary cache the API
- Path: `./src/ts/helper/api.ts`
- Asynchronous function: `Yes`

### Function parameters

- api

  - Type: `string`
  - Explanation: Name of the API as it appears in the URL, without `/` in front of it to execute a request
  - Optional: `No`
  - Default:

- storage

  - Type: `Storage`
  - Explanation: Specify whether the API should be cached in localStorage or in sessionStorage
  - Optional: `No`
  - Default:

- cache

  - Type: `boolean`
  - Explanation: Determines whether the data can be taken from the cache, or the API must be requested
  - Optional: `yes`
  - Default value: `true`

- params

  - Type: `object`
  - Explanation: Expects the parameters for the API request
  - Optional: `Yes`
  - Default value:

### Return value

- `Promise<unknown>`
