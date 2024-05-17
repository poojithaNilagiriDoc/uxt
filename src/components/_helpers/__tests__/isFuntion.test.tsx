import isFunction from '../isFunction';

describe('UxtIsFunction helper', () => {
  it('check the isFunction helper', () => {
    expect(isFunction(() => {})).toEqual(true);
  });

  it('check for string', () => {
    expect(isFunction('')).toEqual(false);
  });
});
