import React from 'react';
import { mount } from 'enzyme';
import star from 'uxt-graphics/icons/star';
import RibbonBarToggleIconButton, {
  RibbonBarToggleIconButtonProps,
} from '../index';
import Icon from '../../Icon';
import RibbonBarType from '../../constants/ribbonBarType';

const mockOnIsActiveChange = jest.fn();
const initialProps: RibbonBarToggleIconButtonProps = {
  size: 'regular',
  isActive: true,
  onIsActiveChange: mockOnIsActiveChange,
  iconSvg: star,
};
const component = mount(<RibbonBarToggleIconButton {...initialProps} />);

describe('UxtRibbonBarToggleIconButton', () => {
  it('check render of component', () => {
    expect(component.find(RibbonBarToggleIconButton).length).toEqual(1);
  });

  it('check for is isDisabled and isActive props', () => {
    component.setProps({
      isDisabled: true,
      isActive: true,
    });
    component.update();

    expect(
      component.find(RibbonBarToggleIconButton).prop('isDisabled'),
    ).toEqual(true);
    expect(component.find(RibbonBarToggleIconButton).prop('isActive')).toEqual(
      true,
    );
  });

  it('check for the iconSvg and size', () => {
    component.setProps({
      iconSvg: star,
      size: 'large',
    });
    component.update();

    expect(component.find(Icon).prop('svg')).toEqual(star);
    expect(component.find(RibbonBarToggleIconButton).prop('size')).toEqual(
      'large',
    );
  });

  it('check for className', () => {
    component.setProps({
      className: 'RibbonBarToggleIconButton',
    });
    component.update();

    expect(component.find(RibbonBarToggleIconButton).prop('className')).toEqual(
      'RibbonBarToggleIconButton',
    );
  });

  it('check for the children', () => {
    component.setProps({
      children: <h3>RibbonBarToggleIconButton</h3>,
    });
    component.update();

    expect(component.find(RibbonBarToggleIconButton).prop('children')).toEqual(
      <h3>RibbonBarToggleIconButton</h3>,
    );
  });

  it('check for appearance', () => {
    component.setProps({
      type: RibbonBarType.Classic,
    });
    component.update();

    expect(component.find(RibbonBarToggleIconButton).prop('type')).toEqual(
      RibbonBarType.Classic,
    );
  });
});
