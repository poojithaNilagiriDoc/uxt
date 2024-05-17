import React from 'react';
import { mount } from 'enzyme';
import UserMenuItem from '..';

const component = mount(<UserMenuItem />);

describe('UxtUserMenuItem', () => {
  it('check render of component', () => {
    expect(component.find(UserMenuItem).length).toEqual(1);
  });

  it('check for className', () => {
    component.setProps({
      className: 'user-menu-item',
    });
    component.update();

    expect(component.find(UserMenuItem).prop('className')).toEqual(
      'user-menu-item',
    );
  });

  it('check for text', () => {
    component.setProps({
      text: 'Text',
    });
    component.update();

    expect(component.find(UserMenuItem).prop('text')).toEqual('Text');
  });
});
