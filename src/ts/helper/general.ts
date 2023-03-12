const sleep = function (ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
};

const firstLetterUppercase = function (string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export { firstLetterUppercase, sleep };
