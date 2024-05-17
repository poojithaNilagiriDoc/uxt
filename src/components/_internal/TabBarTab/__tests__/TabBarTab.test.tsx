import React from 'react';
import { mount } from 'enzyme';
import home from 'uxt-graphics/icons/home';
import TabBarTab from '..';

const tab = {
  id: 'home',
  text: 'home',
  iconSvg: home,
};
const component = mount(<TabBarTab tab={tab} />);

describe('UxtTabBarTab', () => {
  it('check render of component', () => {
    expect(component.find(TabBarTab).length).toEqual(1);
  });

  it('check for className and maxChars', () => {
    component.setProps({
      className: 'tab-bar-tab',
      maxChars: 20,
    });

    expect(component.find(TabBarTab).prop('className')).toEqual('tab-bar-tab');
    expect(component.find(TabBarTab).prop('maxChars')).toEqual(20);
  });

  it('check for isDisabled, title and tab', () => {
    component.setProps({
      isDisabled: true,
      title: 'Home',
    });
    component.update();

    expect(component.find(TabBarTab).prop('isDisabled')).toEqual(true);
    expect(component.find(TabBarTab).prop('title')).toEqual('Home');
    expect(component.find(TabBarTab).prop('tab')).toEqual(tab);
  });
});
