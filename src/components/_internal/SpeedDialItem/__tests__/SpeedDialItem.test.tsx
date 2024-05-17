import React from 'react';
import { mount } from 'enzyme';
import copy from 'uxt-graphics/icons/copy';
import SpeedDialItem from '..';

const component = mount(<SpeedDialItem />);

describe('UxtSpeedDialItem', () => {
  it('check render of component', () => {
    expect(component.find(SpeedDialItem).length).toEqual(1);
  });

  it('check for className, text, iconProps and iconSvg', () => {
    component.setProps({
      className: 'speed-dial-item',
      text: 'Copy',
      iconSvg: copy,
      iconProps: {
        value: 1,
      },
    });

    expect(component.find(SpeedDialItem).prop('className')).toEqual(
      'speed-dial-item',
    );
    expect(component.find(SpeedDialItem).prop('text')).toEqual('Copy');
    expect(component.find(SpeedDialItem).prop('iconSvg')).toEqual(copy);
    expect(component.find(SpeedDialItem).prop('iconProps')).toEqual({
      value: 1,
    });
  });

  it('check for action and onActionInvoke', () => {
    const mockAction = jest.fn();
    const mockOnActionInvoke = jest.fn();

    component.setProps({
      action: mockAction,
      onActionInvoke: mockOnActionInvoke,
    });

    component.find('div').first().prop('onClick')();

    expect(mockOnActionInvoke).toHaveBeenCalled();
    expect(mockAction).toHaveBeenCalled();
  });
});
