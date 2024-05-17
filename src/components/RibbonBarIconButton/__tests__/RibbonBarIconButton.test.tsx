import React from 'react';
import { mount } from 'enzyme';
import star from 'uxt-graphics/icons/star';
import RibbonBarIconButton, { RibbonBarIconButtonProps } from '..';
import RibbonBarType from '../../constants/ribbonBarType';

const initialProps: RibbonBarIconButtonProps = {
  isDisabled: true,
  iconSvg: star,
};
const component = mount(<RibbonBarIconButton {...initialProps} />);

describe('UxtRibbonBarIconButton', () => {
  it('check render of component', () => {
    expect(component.find(RibbonBarIconButton).length).toEqual(1);
  });

  it('check for className', () => {
    component.setProps({
      className: 'ribbon-bar-icon-button',
    });

    expect(component.find(RibbonBarIconButton).prop('className')).toEqual(
      'ribbon-bar-icon-button',
    );
  });

  it('check for isDisabled and size', () => {
    component.setProps({
      isDisabled: true,
      size: 50,
    });
    component.update();

    expect(component.find(RibbonBarIconButton).prop('isDisabled')).toEqual(
      true,
    );
    expect(component.find(RibbonBarIconButton).prop('size')).toEqual(50);
  });

  it('check for iconSvg and onClick', () => {
    const mockOnClick = jest.fn();

    component.setProps({
      iconSvg: star,
      onClick: mockOnClick,
    });
    component.update();
    component.find(RibbonBarIconButton).prop('onClick')();

    expect(component.find(RibbonBarIconButton).prop('iconSvg')).toEqual(star);
    expect(mockOnClick).toHaveBeenCalled();
  });

  it('check for appearance', () => {
    component.setProps({
      type: RibbonBarType.Classic,
    });
    component.update();

    expect(component.find(RibbonBarIconButton).prop('type')).toEqual(
      RibbonBarType.Classic,
    );
  });
});
