import React from 'react';
import { mount } from 'enzyme';
import UserMenu from '..';
import UserMenuItem from '../../UserMenuItem';

const component = mount(<UserMenu />);

describe('UxtUserMenu', () => {
  it('check render of component', () => {
    expect(component.find(UserMenu).length).toEqual(1);
  });

  it('check for className', () => {
    component.setProps({
      className: 'user-menu',
    });
    component.update();

    expect(component.find(UserMenu).prop('className')).toEqual('user-menu');
  });

  it('check for text', () => {
    component.setProps({
      text: 'Text',
    });
    component.update();

    expect(component.find(UserMenu).prop('text')).toEqual('Text');
  });

  it('check for children', () => {
    component.setProps({
      children: <UserMenuItem text="Settings" />,
    });
    component.update();

    expect(component.find(UserMenu).prop('children')).toEqual(
      <UserMenuItem text="Settings" />,
    );
  });
});
