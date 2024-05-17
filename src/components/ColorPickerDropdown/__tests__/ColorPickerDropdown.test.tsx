import React from 'react';
import { mount } from 'enzyme';
import chevronDown from 'uxt-graphics/icons/chevron-down';
import ColorPickerDropdown from '../index';
import Icon from '../../Icon';

const component = mount(<ColorPickerDropdown />);

describe('UxtColorPickerDropdown', () => {
  it('check render of component', () => {
    expect(component.find(ColorPickerDropdown).length).toEqual(1);
  });

  it('check Icon props', () => {
    expect(component.find('div').length).toEqual(6);
    expect(component.find(Icon).prop('size')).toEqual('small');
    expect(component.find(Icon).prop('svg')).toEqual(chevronDown);
  });
});
