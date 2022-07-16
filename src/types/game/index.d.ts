declare function callApi(
  url: string,
  data: object,
  // eslint-disable-next-line no-undef
  callbackSuccess?: function,
  defaultError?: boolean,
  // eslint-disable-next-line no-undef
  callbackError?: function
): void;
