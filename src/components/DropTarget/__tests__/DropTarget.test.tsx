import React from 'react';
import { mount } from 'enzyme';
import { motion } from 'framer-motion';
import DropTarget from '../index';
import Tooltip from '../../_internal/Tooltip';

const component = mount(<DropTarget />);

describe('UxtDropTarget', () => {
  it('check render of component', () => {
    expect(component.find(DropTarget).length).toEqual(1);
  });

  it('check motion.div props on update', () => {
    expect(component.find(motion.div).length).toEqual(2);
    expect(component.find(motion.div).at(0).prop('animate')).toEqual({
      opacity: 0,
    });

    component.setProps({
      isFileOver: true,
    });
    component.update();

    expect(component.find(motion.div).at(0).prop('animate')).toEqual({
      opacity: 1,
    });
    expect(component.find(motion.div).at(0).prop('initial')).toEqual(false);
    expect(component.find(motion.div).at(0).prop('transition')).toEqual({
      duration: 0.25,
    });
    expect(component.find(motion.div).at(1).prop('animate')).toEqual('active');

    component.setProps({
      isFileOver: false,
    });
    component.update();

    expect(component.find(motion.div).at(1).prop('animate')).toEqual(
      'inactive',
    );
    expect(component.find(motion.div).at(1).prop('initial')).toEqual(false);
    expect(component.find(motion.div).at(1).prop('transition')).toEqual({
      duration: 0.25,
    });
    expect(component.find(motion.div).at(1).prop('variants')).toEqual({
      active: { opacity: 1, x: '-50%', y: 0 },
      inactive: { opacity: 0, x: '-50%', y: 32 },
    });
  });

  it('check Tooltip props on update', () => {
    expect(component.find(Tooltip).length).toEqual(1);
    component.setProps({
      text: 'text',
    });
    component.update();

    expect(component.find(Tooltip).prop('text')).toEqual('text');
  });
});
