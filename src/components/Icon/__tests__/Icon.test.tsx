import React from 'react';
import { mount } from 'enzyme';
import star from 'uxt-graphics/icons/star';
import Icon from '..';

const component = mount(<Icon />);

describe('UxtIcon', () => {
  it('check render of component', () => {
    expect(component.find(Icon).length).toEqual(1);
  });

  it('check for className', () => {
    component.setProps({
      className: 'icon',
    });

    expect(component.find(Icon).prop('className')).toEqual('icon');
  });

  it('check for isDisabled and size', () => {
    component.setProps({
      svg: star,
      size: 50,
    });
    component.update();

    expect(component.find(Icon).prop('svg')).toEqual(star);
    expect(component.find(Icon).prop('size')).toEqual(50);
  });
});
