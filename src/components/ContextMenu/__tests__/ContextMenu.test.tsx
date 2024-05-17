import React from 'react';
import { mount } from 'enzyme';
import { Popover } from '@material-ui/core';
import ContextMenu from '../index';
import Menu from '../../_internal/Menu';
import MenuItem from '../../MenuItem';

const mockIsOpenChange = jest.fn();
const initialProps = {
  usePortal: true,
  onIsOpenChange: mockIsOpenChange,
  isOpen: false,
};
const component = mount(<ContextMenu {...initialProps} />);

describe('UxtContextMenu', () => {
  it('check render of component', () => {
    expect(component.find(ContextMenu).length).toEqual(1);
  });

  it('check Popover component props', () => {
    expect(component.find(Popover).length).toEqual(1);
    expect(component.find(Popover).prop('anchorOrigin')).toEqual({
      horizontal: 'left',
      vertical: 'bottom',
    });
    expect(component.find(Popover).prop('anchorPosition')).toEqual(undefined);

    component.setProps({
      anchorPoint: { x: 200, y: 100 },
    });
    component.update();
    expect(component.find(Popover).prop('anchorPosition')).toEqual({
      left: 200,
      top: 100,
    });
    expect(component.find(Popover).prop('anchorReference')).toEqual(
      'anchorPosition',
    );
    expect(component.find(Popover).prop('BackdropProps').invisible).toEqual(
      true,
    );
    component.find(Popover).prop('onClose')();

    expect(mockIsOpenChange).toHaveBeenCalled();
    expect(component.find(Popover).prop('marginThreshold')).toEqual(0);
    expect(component.find(Popover).prop('open')).toEqual(false);

    component.setProps({
      isOpen: true,
    });
    component.update();

    expect(component.find(Popover).prop('open')).toEqual(true);
    expect(component.find(Popover).prop('transformOrigin')).toEqual({
      horizontal: 'left',
      vertical: 'top',
    });
    expect(component.find(Popover).prop('transitionDuration')).toEqual('auto');

    component.setProps({
      isOpen: false,
    });
    component.update();

    expect(component.find(Popover).prop('transitionDuration')).toEqual(0);
  });

  it('check Menu props', () => {
    expect(component.find(Menu).length).toEqual(1);

    component.setProps({
      actionArguments: ['Hey'],
    });
    component.update();

    expect(component.find(Menu).prop('actionArguments')).toEqual(['Hey']);
    expect(component.find(Menu).prop('itemComponent')).toEqual(MenuItem);
    const event: MouseEvent = new MouseEvent('click');

    component.find(Menu).prop('onActionInvoke')(event);

    expect(mockIsOpenChange).toHaveBeenCalled();
  });
});
