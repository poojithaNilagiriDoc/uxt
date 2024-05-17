import React from 'react';
import { mount } from 'enzyme';
import italic from 'uxt-graphics/icons/italic';
import underline from 'uxt-graphics/icons/underline';
import bold from 'uxt-graphics/icons/bold';
import RibbonBarToggleIconButtonGroup, {
  Items,
  RibbonBarToggleIconButtonGroupProps,
} from '..';
import Orientation from '../../constants/orientation';
import SelectionMode from '../../constants/selectionMode';
import RibbonBarType from '../../constants/ribbonBarType';

const mockOnActiveItemChange = jest.fn();
const mockOnActiveItemsChange = jest.fn();
const initialProps: RibbonBarToggleIconButtonGroupProps = {
  iconSvgAccessor: 'iconSvg',
  itemDisabledAccessor: 'disabled',
  onActiveItemChange: mockOnActiveItemChange,
  onActiveItemsChange: mockOnActiveItemsChange,
};
const component = mount(<RibbonBarToggleIconButtonGroup {...initialProps} />);

describe('UxtRibbonBarToggleIconButtonGroup', () => {
  it('check render of component', () => {
    expect(component.find(RibbonBarToggleIconButtonGroup).length).toEqual(1);
  });

  it('check render orientation and selectionMode', () => {
    component.setProps({
      orientation: Orientation.Horizontal,
      selectionMode: SelectionMode.Multiple,
    });
    component.update();

    expect(
      component.find(RibbonBarToggleIconButtonGroup).prop('orientation'),
    ).toEqual(Orientation.Horizontal);
    expect(
      component.find(RibbonBarToggleIconButtonGroup).prop('selectionMode'),
    ).toEqual(SelectionMode.Multiple);
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

    expect(
      component.find(RibbonBarToggleIconButtonGroup).prop('items'),
    ).toEqual(items);
    expect(
      component.find(RibbonBarToggleIconButtonGroup).prop('activeItem'),
    ).toEqual(items[1]);
  });

  it('check for type', () => {
    component.setProps({
      type: RibbonBarType.Classic,
    });
    component.update();

    expect(component.find(RibbonBarToggleIconButtonGroup).prop('type')).toEqual(
      RibbonBarType.Classic,
    );
  });
});
