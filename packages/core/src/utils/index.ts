export * from './array';
export * from './dom';
export * from './enum';
export * from './error';

/* no op function (ಠ‿ಠ) */
export function noop<T>(...args: unknown[]): T {
  // eslint-disable-next-line no-console
  console.trace('noop (ಠ‿ಠ)', args);
  return undefined as never;
}
