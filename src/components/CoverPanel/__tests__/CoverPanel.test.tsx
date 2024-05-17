import React from 'react';
import { motion } from 'framer-motion';
import { mount } from 'enzyme';
import CoverPanel from '../index';
import Resizer from '../../_internal/Resizer';

const mockIsOpenChange = jest.fn();
const initialProps = {
  isOnRight: true,
  isOpen: true,
};
const component = mount(<CoverPanel {...initialProps} />);

describe('UxtCoverPanel', () => {
  it('check render of component', () => {
    expect(component.find(CoverPanel).length).toEqual(1);
  });

  it('check motion.div props on updating props', () => {
    expect(component.find(motion.div).length).toEqual(1);
    expect(component.find(motion.div).prop('animate')).toEqual({
      display: 'flex',
      marginRight: 0,
    });

    component.setProps({
      isOpen: false,
      width: 10,
    });

    expect(component.find(motion.div).prop('animate')).toEqual({
      transitionEnd: { display: 'none' },
      marginRight: -10,
    });

    component.setProps({
      isOnRight: false,
    });

    expect(component.find(motion.div).prop('animate')).toEqual({
      transitionEnd: { display: 'none' },
      marginLeft: -10,
    });

    component.setProps({
      isOpen: true,
    });

    expect(component.find(motion.div).prop('animate')).toEqual({
      display: 'flex',
      marginLeft: 0,
    });
    expect(component.find(motion.div).prop('initial')).toEqual(false);
    expect(component.find(motion.div).prop('transition')).toEqual({
      duration: 0.25,
    });
    expect(component.find(motion.div).prop('style').width).toEqual(10);
  });

  it('check Resizer props on update', () => {
    expect(component.find(Resizer).length).toEqual(0);

    component.setProps({
      onWidthChange: mockIsOpenChange,
    });
    expect(component.find(Resizer).length).toEqual(1);
    expect(component.find(Resizer).prop('enabledDragHandles')).toEqual(['r']);

    component.setProps({
      isOnRight: true,
      maxWidth: 10,
      minWidth: 10,
    });

    expect(component.find(Resizer).prop('enabledDragHandles')).toEqual(['l']);
    expect(component.find(Resizer).prop('maxWidth')).toEqual(10);
    expect(component.find(Resizer).prop('minWidth')).toEqual(10);
    expect(component.find(Resizer).prop('width')).toEqual(10);
    component.find(Resizer).prop('onWidthChange')();

    expect(mockIsOpenChange).toHaveBeenCalled();
  });
});
