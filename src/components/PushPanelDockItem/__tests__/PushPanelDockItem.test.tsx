import React from 'react';
import { mount } from 'enzyme';
import star from 'uxt-graphics/icons/star';
import PushPanelDockItem from '..';

const component = mount(<PushPanelDockItem />);

describe('UxtPushPanelDockItem', () => {
  it('check render of component', () => {
    expect(component.find(PushPanelDockItem).length).toEqual(1);
  });

  it('check for item and iconSvgAccessor', () => {
    const item = {
      iconSvg: star,
      title: 'star',
    };

    component.setProps({
      item: item,
      iconSvgAccessor: 'iconSvg',
    });
    component.update();

    expect(component.find(PushPanelDockItem).prop('item')).toEqual(item);
    expect(component.find(PushPanelDockItem).prop('iconSvgAccessor')).toEqual(
      'iconSvg',
    );
  });

  it('check for panelContent', () => {
    const item = {
      iconSvg: star,
      title: 'star',
      panelContent: <h1>Panel Content</h1>,
    };

    component.setProps({
      item: item,
      iconSvgAccessor: 'iconSvg',
    });
    component.update();

    expect(component.find(PushPanelDockItem).prop('item')).toEqual(item);
  });

  it('check for onIsActiveChange', () => {
    const mockOnIsActiveChange = jest.fn();
    const item = {
      iconSvg: star,
      title: 'star',
      panelContent: <h1>Panel Content</h1>,
    };

    component.setProps({
      onIsActiveChange: mockOnIsActiveChange,
      item: item,
    });
    component.update();
    component.find(PushPanelDockItem).simulate('click');

    expect(mockOnIsActiveChange).toHaveBeenCalledWith(item);
    expect(mockOnIsActiveChange).toHaveBeenCalledTimes(1);
  });
});
