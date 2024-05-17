import React from 'react';
import { mount } from 'enzyme';
import star from 'uxt-graphics/icons/star';
import IconButton, { IconButtonProps } from '..';

const initialProps: IconButtonProps = {
  isDisabled: true,
  iconSvg: star,
};
const component = mount(<IconButton {...initialProps} />);

describe('UxtIconButton', () => {
  it('check render of component', () => {
    expect(component.find(IconButton).length).toEqual(1);
  });

  it('check for className', () => {
    component.setProps({
      className: 'iconButton',
    });

    expect(component.find(IconButton).prop('className')).toEqual('iconButton');
  });

  it('check for isDisabled and size', () => {
    component.setProps({
      isDisabled: true,
      size: 50,
    });
    component.update();

    expect(component.find(IconButton).prop('isDisabled')).toEqual(true);
    expect(component.find(IconButton).prop('size')).toEqual(50);
  });

  it('check for iconSvg and onClick', () => {
    const mockOnClick = jest.fn();

    component.setProps({
      iconSvg: star,
      onClick: mockOnClick,
    });
    component.update();
    component.find(IconButton).prop('onClick')();

    expect(component.find(IconButton).prop('iconSvg')).toEqual(star);
    expect(mockOnClick).toHaveBeenCalled();
  });
});
