import { cleanupAttributes } from './attribute';

describe('cleanupAttributes', () => {
  const ignoredValues = [undefined, 'undefined', null, 'null', '', ' '];

  it.each(ignoredValues)('remove key with %s value', async value => {
    const expectedAttributes = { cleanK: true };
    const dirtyAttributes = { ...expectedAttributes, dirtyK: value };
    expect(cleanupAttributes(dirtyAttributes)).toEqual(expectedAttributes);
  });
});
