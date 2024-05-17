import React from 'react';
import { mount } from 'enzyme';
import document from 'uxt-graphics/graphics/document';
import Graphic from '..';

const component = mount(<Graphic />);

describe('UxtGraphic', () => {
  it('check render of component', () => {
    expect(component.find(Graphic).length).toEqual(1);
  });

  it('check for className', () => {
    component.setProps({
      className: 'graphic',
    });

    expect(component.find(Graphic).prop('className')).toEqual('graphic');
  });

  it('check for isDisabled and size', () => {
    component.setProps({
      svg: document,
      size: 50,
    });
    component.update();

    expect(component.find(Graphic).prop('svg')).toEqual(document);
    expect(component.find(Graphic).prop('size')).toEqual(50);
  });
});
