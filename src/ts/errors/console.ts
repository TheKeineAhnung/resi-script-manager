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
