const isFunction = <T extends (...args: unknown[]) => unknown>(
  maybe: unknown,
): maybe is T => typeof maybe === 'function';

export default isFunction;
