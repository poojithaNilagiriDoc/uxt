const toUpperCase = <T>(value: T): T | string =>
  typeof value === 'string' ? value.toUpperCase() : value;

export default toUpperCase;
