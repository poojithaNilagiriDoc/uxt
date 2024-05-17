import React from 'react';
import { mount } from 'enzyme';
import About from '../index';
import HexagonLogo from '../../_internal/HexagonLogo';

const component = mount(<About />);

describe('UxtAbout', () => {
  it('check render of component', () => {
    expect(component.find(About).length).toEqual(1);
  });

  it('check render of div', () => {
    expect(component.find('div').length).toEqual(5);
  });

  it('check render of HexagonLogo component', () => {
    expect(component.find(HexagonLogo).length).toEqual(1);
  });
});
