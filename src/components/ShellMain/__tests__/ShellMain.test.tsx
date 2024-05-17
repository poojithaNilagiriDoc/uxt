import React from 'react';
import { mount } from 'enzyme';
import ShellMain from '..';
import Topbar from '../../Topbar';

const component = mount(<ShellMain />);

describe('UxtShellMain', () => {
  it('check render of component', () => {
    expect(component.find(ShellMain).length).toEqual(1);
  });

  it('check for children', () => {
    component.setProps({
      children: <Topbar />,
    });

    expect(component.find(ShellMain).prop('children')).toEqual(<Topbar />);
  });

  it('check for className', () => {
    component.setProps({
      className: 'shell-main',
    });

    expect(component.find(ShellMain).prop('className')).toEqual('shell-main');
  });
});
