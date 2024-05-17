import React from 'react';
import { mount } from 'enzyme';
import italic from 'uxt-graphics/icons/italic';
import underline from 'uxt-graphics/icons/underline';
import bold from 'uxt-graphics/icons/bold';
import ToggleIconButtonGroup, { Items, ToggleIconButtonGroupProps } from '..';
import Orientation from '../../constants/orientation';
import SelectionMode from '../../constants/selectionMode';

const mockOnActiveItemChange = jest.fn();
const mockOnActiveItemsChange = jest.fn();
const initialProps: ToggleIconButtonGroupProps = {
  iconSvgAccessor: 'iconSvg',
  itemDisabledAccessor: 'disabled',
  onActiveItemChange: mockOnActiveItemChange,
  onActiveItemsChange: mockOnActiveItemsChange,
};
const component = mount(<ToggleIconButtonGroup {...initialProps} />);

describe('UxtToggleIconButtonGroup', () => {
  it('check render of component', () => {
    expect(component.find(ToggleIconButtonGroup).length).toEqual(1);
  });

  it('check render orientation and selectionMode', () => {
    component.setProps({
      orientation: Orientation.Horizontal,
      selectionMode: SelectionMode.Multiple,
    });
    component.update();

    expect(component.find(ToggleIconButtonGroup).prop('orientation')).toEqual(
      Orientation.Horizontal,
    );
    expect(component.find(ToggleIconButtonGroup).prop('selectionMode')).toEqual(
      SelectionMode.Multiple,
    );
  });

  it('check for items and activeItem', () => {
    const items: Items = [
      { iconSvg: italic },
      { iconSvg: underline },
      { iconSvg: bold },
    ];

    component.setProps({
      items: items,
      activeItem: items[1],
    });

    expect(component.find(ToggleIconButtonGroup).prop('items')).toEqual(items);
    expect(component.find(ToggleIconButtonGroup).prop('activeItem')).toEqual(
      items[1],
    );
  });
});
