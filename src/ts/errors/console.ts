// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-console */
const variableIsNull = function (variableName: string, fileName: string): void {
  console.error(`Variable ${variableName} from file ${fileName} is null`);
};

const variableIsUndefined = function (
  variableName: string,
  fileName: string
): void {
  console.error(`Variable ${variableName} from file ${fileName} is undefined`);
};

export { variableIsNull, variableIsUndefined };
