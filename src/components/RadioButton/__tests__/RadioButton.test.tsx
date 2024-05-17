import React from 'react';
import { mount } from 'enzyme';
import RadioButton, { RadioButtonProps } from '..';

const initialProps: RadioButtonProps = {
  text: 'Text',
  selectedValue: 'Text',
  value: 1,
};
const component = mount(<RadioButton {...initialProps} />);

describe('UxtRadioButton', () => {
  it('check render of component', () => {
    expect(component.find(RadioButton).length).toEqual(1);
  });

  it('check for isDisabled', () => {
    component.setProps({
      isDisabled: true,
    });

    expect(component.find(RadioButton).prop('isDisabled')).toEqual(true);
  });

  it('check for onSelect', () => {
    const mockOnSelect = jest.fn();

    component.setProps({
      onSelect: mockOnSelect,
    });
    component.find(RadioButton).prop('onSelect')();

    expect(mockOnSelect).toHaveBeenCalled();
  });

  it('check for text and value', () => {
    component.setProps({
      text: 'Test',
      value: 1,
    });

    expect(component.find(RadioButton).prop('text')).toEqual('Test');
    expect(component.find(RadioButton).prop('value')).toEqual(1);
  });
});
