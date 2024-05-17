import React from 'react';
import { mount } from 'enzyme';
import chevronUp from 'uxt-graphics/icons/chevron-up';
import chevronDown from 'uxt-graphics/icons/chevron-down';
import ExpanderHeader from '../index';
import Icon from '../../Icon';

const mockIsOpenChange = jest.fn();
const initialProps = {
  onIsOpenChange: mockIsOpenChange,
};
const component = mount(<ExpanderHeader {...initialProps} />);

describe('UxtExpanderHeader', () => {
  it('check render of component', () => {
    expect(component.find(ExpanderHeader).length).toEqual(1);
  });

  it('check values on click and update', () => {
    expect(component.find('div').length).toEqual(3);

    component.setProps({
      isDisabled: true,
    });
    component.update();
    component.find('div').at(0).prop('onClick')();

    expect(mockIsOpenChange).not.toHaveBeenCalled();

    component.setProps({
      isDisabled: false,
      text: 'text',
    });
    component.update();
    component.find('div').at(0).prop('onClick')();

    expect(mockIsOpenChange).toHaveBeenCalled();
    expect(component.find('div').at(1).text()).toEqual('text');
  });

  it('check Icon component props', () => {
    component.setProps({
      isDisabled: true,
    });
    component.update();
    expect(component.find(Icon).length).toEqual(0);

    component.setProps({
      isDisabled: false,
      isOpen: true,
    });
    component.update();

    expect(component.find(Icon).length).toEqual(1);
    expect(component.find(Icon).prop('size')).toEqual('small');
    expect(component.find(Icon).prop('svg')).toEqual(chevronUp);

    component.setProps({
      isOpen: false,
    });
    component.update();

    expect(component.find(Icon).prop('svg')).toEqual(chevronDown);
  });
});
