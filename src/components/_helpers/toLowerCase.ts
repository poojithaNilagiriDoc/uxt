const toLowerCase = <T>(value: T): T | string =>
  typeof value === 'string' ? value.toLowerCase() : value;

export default toLowerCase;
