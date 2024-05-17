import React from 'react';
import { mount } from 'enzyme';
import star from 'uxt-graphics/icons/star';
import RibbonBarSplitButton, { RibbonBarSplitButtonProps } from '..';

const initialProps: RibbonBarSplitButtonProps = {
  isDisabled: true,
  iconSvg: star,
};
const component = mount(<RibbonBarSplitButton {...initialProps} />);

describe('UxtRibbonBarSplitButton', () => {
  it('check render of component', () => {
    expect(component.find(RibbonBarSplitButton).length).toEqual(1);
  });

  it('check for className', () => {
    component.setProps({
      className: 'RibbonBarSplitButton',
    });

    expect(component.find(RibbonBarSplitButton).prop('className')).toEqual(
      'RibbonBarSplitButton',
    );
  });

  it('check for isDisabled', () => {
    component.setProps({
      isDisabled: true,
    });
    component.update();

    expect(component.find(RibbonBarSplitButton).prop('isDisabled')).toEqual(
      true,
    );
  });

  it('check for iconSvg and onClick', () => {
    const mockOnClick = jest.fn();

    component.setProps({
      iconSvg: star,
      onClick: mockOnClick,
    });
    component.update();
    component.find(RibbonBarSplitButton).prop('onClick')();

    expect(component.find(RibbonBarSplitButton).prop('iconSvg')).toEqual(star);
    expect(mockOnClick).toHaveBeenCalled();
  });

  it('check for popoverContent', () => {
    component.setProps({
      isOpen: true,
      popoverContent: <h3>Popover Content</h3>,
    });
    component.update();

    expect(component.find(RibbonBarSplitButton).prop('isOpen')).toEqual(true);
    expect(component.find(RibbonBarSplitButton).prop('popoverContent')).toEqual(
      <h3>Popover Content</h3>,
    );
  });
});
