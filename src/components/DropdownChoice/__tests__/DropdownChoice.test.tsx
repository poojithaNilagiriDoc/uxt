import React from 'react';
import { mount } from 'enzyme';
import DropdownChoice from '../index';
import ListItem from '../../ListItem';

const mockIsOpenChange = jest.fn();
const initialProps = {
  onSelect: mockIsOpenChange,
};
const component = mount(<DropdownChoice {...initialProps} />);

describe('DropdownChoice', () => {
  it('check render of component', () => {
    expect(component.find(DropdownChoice).length).toEqual(1);
  });

  it('check ListItem props on update', () => {
    expect(component.find(ListItem).length).toEqual(1);
    expect(component.find(ListItem).prop('isDisabled')).toEqual(false);

    component.setProps({
      isItemDisabled: true,
    });
    component.update();

    expect(component.find(ListItem).prop('isDisabled')).toEqual(true);
    expect(component.find(ListItem).prop('isSelected')).toEqual(false);

    component.setProps({
      selectedValue: 4,
      value: 4,
    });
    component.update();

    expect(component.find(ListItem).prop('isSelected')).toEqual(true);

    component.setProps({
      selectedValue: null,
      value: 4,
      text: 'text',
    });
    component.update();

    expect(component.find(ListItem).prop('isSelected')).toEqual(false);
    component.find(ListItem).prop('onPointerUp')();
    expect(mockIsOpenChange).toHaveBeenCalled();
  });
});
