import React from 'react';
import { mount } from 'enzyme';
import upload from 'uxt-graphics/icons/upload';
import star from 'uxt-graphics/icons/star';
import SpeedDial from '..';

const component = mount(<SpeedDial />);

describe('UxtSpeedDial', () => {
  it('check render of component', () => {
    expect(component.find(SpeedDial).length).toEqual(1);
  });

  it('check for className', () => {
    component.setProps({
      className: 'speedDial',
    });

    expect(component.find(SpeedDial).prop('className')).toEqual('speedDial');
  });

  it('check for the actions', () => {
    const actions = [
      { action: () => {}, iconSvg: star, text: 'Star' },
      { action: () => {}, iconSvg: upload, text: 'Upload' },
    ];

    component.setProps({
      actions,
    });
    component.update();

    expect(component.find(SpeedDial).prop('actions')).toEqual(actions);
  });

  it('check for isOpen and onIsOpenChange', () => {
    const mockOnIsOpenChange = jest.fn();
    component.setProps({
      isOpen: true,
      onIsOpenChange: mockOnIsOpenChange,
    });
    component.update();
    component.find(SpeedDial).prop('onIsOpenChange')();

    expect(component.find(SpeedDial).prop('isOpen')).toEqual(true);
    expect(mockOnIsOpenChange).toHaveBeenCalled();
  });
});
