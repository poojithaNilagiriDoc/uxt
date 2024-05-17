import React from 'react';
import { mount } from 'enzyme';
import add from 'uxt-graphics/icons/add';
import FloatingToolbar from '../index';
import IconButton from '../../IconButton';

const component = mount(<FloatingToolbar />);

describe('UxtFloatingToolbar', () => {
  it('Check render of component', () => {
    expect(component.find(FloatingToolbar).length).toEqual(1);
  });

  it('Check for children', () => {
    component.setProps({
      children: <IconButton iconSvg={add} />,
    });
    component.update();

    expect(component.find(IconButton).prop('iconSvg')).toEqual(add);
  });
});
