import React from 'react';
import { mount } from 'enzyme';
import star from 'uxt-graphics/icons/star';
import Button from '../index';
import Icon from '../../Icon';

const initialProps = { disabled: false, text: 'text', iconSvg: star };
const component = mount(<Button {...initialProps} />);

describe('UxtButton', () => {
  it('check render of component', () => {
    expect(component.find(Button).length).toEqual(1);
  });

  it('check button props', () => {
    expect(component.find('button').length).toEqual(1);
    expect(component.find('button').prop('disabled')).toEqual(false);

    component.setProps({ disabled: true });

    expect(component.find('button').prop('disabled')).toEqual(true);
    expect(component.find('button').prop('type')).toEqual('button');
  });

  it('check span values', () => {
    expect(component.find('span').length).toEqual(1);
    expect(component.find('span').text()).toEqual('text');

    component.setProps({
      text: 'updated text',
    });
    component.update();

    expect(component.find('span').text()).toEqual('updated text');
  });

  it('check prop values of Icon component', () => {
    expect(component.find(Icon).length).toEqual(1);
    expect(component.find(Icon).prop('size')).toEqual('small');
    expect(component.find(Icon).prop('svg')).toEqual(star);
  });
});
