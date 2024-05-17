import React from 'react';
import { mount } from 'enzyme';
import ShellContent from '..';
import Topbar from '../../Topbar';

const component = mount(<ShellContent />);

describe('UxtShellContent', () => {
  it('check render of component', () => {
    expect(component.find(ShellContent).length).toEqual(1);
  });

  it('check for children', () => {
    component.setProps({
      children: <Topbar />,
    });

    expect(component.find(ShellContent).prop('children')).toEqual(<Topbar />);
  });

  it('check for className', () => {
    component.setProps({
      className: 'shell-content',
    });

    expect(component.find(ShellContent).prop('className')).toEqual(
      'shell-content',
    );
  });
});
