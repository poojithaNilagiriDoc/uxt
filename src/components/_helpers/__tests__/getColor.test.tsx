import getColor from '../getColor';

describe('UxtGetColor', () => {
  it('check the getColor helper', () => {
    expect(getColor('rgb(2,107,227)')).toEqual('#026BE3');
  });

  it('check if color is not available', () => {
    expect(getColor('')).toEqual(undefined);
  });
});
