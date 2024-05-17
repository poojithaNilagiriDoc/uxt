import toLowerCase from '../toLowerCase';

describe('UxtToLowerCase', () => {
  it('check the toLowerCase helper', () => {
    expect(toLowerCase('PRODUCT TITLE')).toEqual('product title');
  });

  it('check if string is not defined', () => {
    expect(toLowerCase('')).toEqual('');
  });
});
