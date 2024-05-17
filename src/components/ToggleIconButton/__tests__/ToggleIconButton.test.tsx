import React from 'react';
import { mount } from 'enzyme';
import star from 'uxt-graphics/icons/star';
import ToggleIconButton, { ToggleIconButtonProps } from '../index';
import Icon from '../../Icon';

const mockOnIsActiveChange = jest.fn();
const initialProps: ToggleIconButtonProps = {
  size: 'regular',
  isActive: true,
  onIsActiveChange: mockOnIsActiveChange,
};
const component = mount(<ToggleIconButton {...initialProps} />);

describe('UxtToggleIconButton', () => {
  it('check render of component', () => {
    expect(component.find(ToggleIconButton).length).toEqual(1);
  });

  it('check for is isDisabled and isActive props', () => {
    component.setProps({
      isDisabled: true,
      isActive: true,
    });
    component.update();

    expect(component.find(ToggleIconButton).prop('isDisabled')).toEqual(true);
    expect(component.find(ToggleIconButton).prop('isActive')).toEqual(true);
  });

  it('check for onIsActiveChange', () => {
    component.setProps({
      isActive: true,
    });
    component.update();

    component.find(ToggleIconButton).simulate('click');

    expect(mockOnIsActiveChange).toHaveBeenCalledWith(false);
    expect(mockOnIsActiveChange).toHaveBeenCalledTimes(1);
  });

  it('check for the iconSvg and size', () => {
    component.setProps({
      iconSvg: star,
      size: 'large',
    });
    component.update();

    expect(component.find(Icon).prop('svg')).toEqual(star);
    expect(component.find(ToggleIconButton).prop('size')).toEqual('large');
  });

  it('check for className', () => {
    component.setProps({
      className: 'ToggleIconButton',
    });
    component.update();

    expect(component.find(ToggleIconButton).prop('className')).toEqual(
      'ToggleIconButton',
    );
  });

  it('check for the children', () => {
    component.setProps({
      children: <h3>ToggleIconButton</h3>,
    });
    component.update();

    expect(component.find(ToggleIconButton).prop('children')).toEqual(
      <h3>ToggleIconButton</h3>,
    );
  });
});
