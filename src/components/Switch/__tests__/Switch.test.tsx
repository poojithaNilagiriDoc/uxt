import React from 'react';
import { mount } from 'enzyme';
import Switch from '../index';

const component = mount(<Switch />);

describe('UxtSwitch', () => {
  it('check render of component', () => {
    expect(component.find(Switch).length).toEqual(1);
  });

  it('check for is isDisabled and on props', () => {
    component.setProps({
      isDisabled: true,
      on: true,
    });
    component.update();

    expect(component.find(Switch).prop('isDisabled')).toEqual(true);
    expect(component.find(Switch).prop('on')).toEqual(true);
  });

  it('check for the text', () => {
    component.setProps({
      text: 'On',
    });
    component.update();

    expect(component.find(Switch).prop('text')).toEqual('On');
  });

  it('check for className', () => {
    component.setProps({
      className: 'switch',
    });
    component.update();

    expect(component.find(Switch).prop('className')).toEqual('switch');
  });

  it('check for onIsOnChange', () => {
    const mockOnIsOnChange = jest.fn();
    component.setProps({
      onIsOnChange: mockOnIsOnChange,
    });
    component.update();

    component.find(Switch).prop('onIsOnChange')();
    expect(mockOnIsOnChange).toHaveBeenCalled();
  });

  it('check for onIsOnChange', () => {
    const mockOnIsOnChange = jest.fn();

    component.setProps({
      onIsOnChange: mockOnIsOnChange,
      text: 'Switch',
      isDisabled: false,
    });
    component.update();

    component.find('div').first().simulate('click');

    expect(mockOnIsOnChange).toHaveBeenCalledTimes(1);
  });
});
