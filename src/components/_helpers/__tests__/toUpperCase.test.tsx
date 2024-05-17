import toUpperCase from '../toUpperCase';

describe('UxtToUpperCase', () => {
  it('check the toUpperCase helper', () => {
    expect(toUpperCase('product title')).toEqual('PRODUCT TITLE');
  });

  it('check if string is not defined', () => {
    expect(toUpperCase('')).toEqual('');
  });
});
