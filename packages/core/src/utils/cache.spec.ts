import { getAppVersion, getItem, removeItem, setAppVersion, setItem } from './cache';

describe('cache', () => {
  it('Should write and read application version', () => {
    setAppVersion('version');
    expect(getAppVersion()).toEqual('version');
  });

  it('Should write and read item', () => {
    setItem('key', 'value');
    expect(getItem('key')).toEqual('value');
  });

  it('Should update item value', () => {
    setItem('key', 'fee');
    setItem('key', 'foo');
    expect(getItem('key')).toEqual('foo');
  });

  it('Should remove item', () => {
    setItem('key', 'value');
    removeItem('key');
    expect(getItem('key')).toBeNull();
  });
});
