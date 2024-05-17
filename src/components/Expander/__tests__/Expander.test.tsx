import React from 'react';
import { mount } from 'enzyme';
import EmptyState from '../index';
import ExpanderHeader from '../../ExpanderHeader';
import Expander from '../index';

const mockIsOpenChange = jest.fn();
const initialProps = {
  onIsOpenChange: mockIsOpenChange,
};
const component = mount(<EmptyState {...initialProps} />);

describe('UxtExpander', () => {
  it('check render of component', () => {
    expect(component.find(Expander).length).toEqual(1);
  });

  it('check ExpanderHeader props and div render on update', () => {
    expect(component.find(ExpanderHeader).length).toEqual(1);

    component.setProps({
      isDisabled: true,
      isOpen: false,
      headerText: 'text',
    });
    component.update();

    expect(component.find(ExpanderHeader).prop('isDisabled')).toEqual(true);
    expect(component.find(ExpanderHeader).prop('isOpen')).toEqual(false);
    component.find(ExpanderHeader).prop('onIsOpenChange')();

    expect(mockIsOpenChange).toHaveBeenCalled();
    expect(component.find(ExpanderHeader).prop('text')).toEqual('text');
    expect(component.find('div').at(3).length).toEqual(0);

    component.setProps({
      isOpen: true,
    });
    component.update();

    expect(component.find('div').at(3).length).toEqual(1);
  });
});
