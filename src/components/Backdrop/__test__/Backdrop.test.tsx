import React from 'react';
import { mount } from 'enzyme';
import Backdrop from '../index';

const component = mount(<Backdrop />);

describe('UxtBackdrop', () => {
  it('check render of component', () => {
    expect(component.find(Backdrop).length).toEqual(1);
  });

  it('Check for isOpen and showOverlay props', () => {
    expect(component.find('div').length).toEqual(0);

    component.setProps({
      isOpen: true,
    });
    component.update();

    expect(component.find('div').length).toEqual(3);

    component.setProps({
      showOverlay: false,
    });
    component.update();

    expect(component.find('div').length).toEqual(2);
  });
});
