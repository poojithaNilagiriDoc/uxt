import { mount } from 'enzyme';
import React from 'react';
import UxtCheckbox from '../index';

describe('UxtCheckbox', () => {
  const mockIsIndeterminateChange = jest.fn();
  const mockIsActiveChange = jest.fn();
  const initialProps = {
    isDisabled: false,
    isIndeterminate: false,
    isActive: false,
    text: 'text',
    onIsIndeterminateChange: mockIsIndeterminateChange,
    onIsActiveChange: mockIsActiveChange,
  };

  const component = mount(<UxtCheckbox {...initialProps} />);

  it('check render of component', () => {
    expect(component.find(UxtCheckbox).length).toEqual(1);
  });

  it('check components render and initial props', () => {
    expect(component.find('input').length).toBe(1);
    expect(component.find('label').length).toBe(1);
    expect(component.find('label').text()).toEqual('text');
    expect(component.find('div').first().prop('tabIndex')).toBe(0);
    expect(component.find('input').prop('checked')).toBe(false);
    expect(component.find('input').prop('disabled')).toBe(false);
  });

  it('check div props on setting isDisabled and isActive', () => {
    component.setProps({ isDisabled: true });
    component.update();

    expect(component.find('div').first().prop('tabIndex')).toBe(-1);

    component.setProps({ isDisabled: false, isActive: false });
    component.update();

    expect(component.find('input').prop('type')).toBe('checkbox');
  });

  it('check input props on setting isIndeterminate and isActive', () => {
    component.setProps({ isIndeterminate: true, isActive: true });
    component.update();
    component.find('input').prop('onChange')();

    expect(mockIsIndeterminateChange).toHaveBeenCalledTimes(1);
    component.setProps({ isIndeterminate: false, isActive: true });
    component.update();
    component.find('input').prop('onChange')();

    expect(mockIsActiveChange).toHaveBeenCalledTimes(1);
  });
});
