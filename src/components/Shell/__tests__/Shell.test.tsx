import React from 'react';
import { mount } from 'enzyme';
import Shell from '..';
import Topbar from '../../Topbar';

const component = mount(<Shell />);

describe('UxtShell', () => {
  it('check render of component', () => {
    expect(component.find(Shell).length).toEqual(1);
  });

  it('check for children', () => {
    component.setProps({
      children: <Topbar />,
    });

    expect(component.find(Shell).prop('children')).toEqual(<Topbar />);
  });

  it('check for className', () => {
    component.setProps({
      className: 'shell',
    });

    expect(component.find(Shell).prop('className')).toEqual('shell');
  });
});
