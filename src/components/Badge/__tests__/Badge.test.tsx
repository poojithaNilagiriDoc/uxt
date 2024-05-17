import React from 'react';
import { mount } from 'enzyme';
import Badge from '../index';

const component = mount(<Badge />);

describe('UxtBadge', () => {
  it('check render of component', () => {
    expect(component.find(Badge).length).toEqual(1);
  });

  it('check rendered elements on setting  isVisible to true and, count and isDot to false', () => {
    expect(component.find('div').length).toEqual(1);

    component.setProps({
      isVisible: true,
      count: false,
      isDot: false,
    });
    component.update();

    expect(component.find('div').length).toEqual(2);
    expect(component.find('span').length).toEqual(1);
  });

  it('check rendered elements on setting  isVisible false', () => {
    component.setProps({
      isVisible: false,
      count: false,
    });
    component.update();

    expect(component.find('div').length).toEqual(1);
    expect(component.find('span').length).toEqual(0);
  });

  it('check rendered elements on setting  count to false and isVisible,isDot to true ', () => {
    component.setProps({
      isVisible: true,
      count: false,
      isDot: true,
    });
    component.update();

    expect(component.find('div').length).toEqual(2);
    expect(component.find('span').length).toEqual(0);
  });
});
