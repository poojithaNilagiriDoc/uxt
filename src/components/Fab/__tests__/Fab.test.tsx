import React from 'react';
import { mount } from 'enzyme';
import add from 'uxt-graphics/icons/add';
import star from 'uxt-graphics/icons/star';
import Fab from '../index';
import Icon from '../../Icon';

const initialProps = {
  iconSvg: add,
  text: 'text',
};
const component = mount(<Fab {...initialProps} />);

describe('UxtFab', () => {
  it('check render of component', () => {
    expect(component.find(Fab).length).toEqual(1);
  });

  it('Check Icon props on update', () => {
    expect(component.find('div').length).toEqual(3);
    expect(component.find(Icon).length).toEqual(1);

    component.setProps({
      isDisabled: true,
      text: 'text',
    });
    component.update();

    expect(component.find(Icon).prop('svg')).toEqual(add);

    component.setProps({
      iconSvg: star,
    });
    component.update();

    expect(component.find(Icon).prop('svg')).toEqual(star);
    expect(component.find('div').at(2).text()).toEqual('text');
  });
});
