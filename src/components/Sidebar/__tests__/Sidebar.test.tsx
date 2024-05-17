import { mount } from 'enzyme';
import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import MediaQuery from 'react-responsive';
import { motion } from 'framer-motion';
import { act } from 'react-dom/test-utils';
import UxtSidebar from '../index';
import CoverPanel from '../../CoverPanel';
import IconPanel from '../../IconPanel';
import Sidebar from '../index';

describe('UxtSidebar', () => {
  const mockIsOpenChange = jest.fn();
  const initialProps = {
    isOpen: false,
    areIconsAlwaysVisible: false,
    onIsOpenChange: mockIsOpenChange,
  };
  const component = mount(<UxtSidebar {...initialProps} />);

  it('check render of component', () => {
    expect(component.find(Sidebar).length).toEqual(1);
  });

  it('check component renders', () => {
    expect(component.find(ThemeProvider).length).toBe(1);
    expect(component.find(MediaQuery).length).toBe(1);
    expect(component.find(motion.div).length).toBe(1);
  });

  it('check MediaQuery on updating props', () => {
    expect(component.find(MediaQuery).length).toBe(1);

    component.setProps({ isOpen: false });
    component.update();
    act(() => component.find('MediaQuery').prop('onChange')());

    expect(mockIsOpenChange).toHaveBeenCalledTimes(0);

    component.setProps({ isOpen: true });
    component.update();
    act(() => component.find('MediaQuery').prop('onChange')());

    expect(mockIsOpenChange).toHaveBeenCalledTimes(1);
  });

  it('check motion div onClick', () => {
    component.setProps({ displayMode: 'cover' });
    component.update();
    component.find(motion.div).first().prop('onClick')();

    expect(mockIsOpenChange).toHaveBeenCalledTimes(2);
  });

  it('check render of CoverPanel and IconPanel on change of props', () => {
    component.setProps({ displayMode: 'push', areIconsAlwaysVisible: true });
    component.update();

    expect(component.find(CoverPanel).length).toBe(0);
    expect(component.find(IconPanel).length).toBe(1);

    component.setProps({ displayMode: 'cover' });
    component.update();

    expect(component.find(CoverPanel).length).toBe(1);
    expect(component.find(IconPanel).length).toBe(0);
  });
});
