import React from 'react';
import { mount } from 'enzyme';
import star from 'uxt-graphics/icons/star';
import Tab from '..';

const component = mount(<Tab />);

describe('UxtTab', () => {
  it('check render of component', () => {
    expect(component.find(Tab).length).toEqual(1);
  });

  it('check for name and text', () => {
    component.setProps({
      name: 'Tab A',
      text: 'Tab A',
    });

    expect(component.find(Tab).prop('name')).toEqual('Tab A');
    expect(component.find(Tab).prop('text')).toEqual('Tab A');
  });

  it('check for iconSvg and isDisabled', () => {
    component.setProps({
      name: 'Tab A',
      iconSvg: star,
      isDisabled: true,
    });

    expect(component.find(Tab).prop('name')).toEqual('Tab A');
    expect(component.find(Tab).prop('iconSvg')).toEqual(star);
    expect(component.find(Tab).prop('isDisabled')).toEqual(true);
  });

  it('check for children', () => {
    component.setProps({
      name: 'Tab A',
      children: <p>Tab A content</p>,
    });

    expect(component.find(Tab).prop('name')).toEqual('Tab A');
    expect(component.find(Tab).prop('children')).toEqual(<p>Tab A content</p>);
  });
});
