import React from 'react';
import { mount } from 'enzyme';
import Tooltip from '..';

const component = mount(<Tooltip />);

describe('UxtTooltip', () => {
  it('check render of component', () => {
    expect(component.find(Tooltip).length).toEqual(1);
  });

  it('check for className and text', () => {
    component.setProps({
      className: 'tooltip',
      text: 'Sample Tooltip',
    });

    expect(component.find(Tooltip).prop('className')).toEqual('tooltip');
    expect(component.find(Tooltip).prop('text')).toEqual('Sample Tooltip');
  });
});
