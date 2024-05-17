import React from 'react';
import { mount } from 'enzyme';
import star from 'uxt-graphics/icons/star';
import RibbonBarButton, { RibbonBarButtonProps } from '../index';
import Icon from '../../Icon';
import RibbonBarType from '../../constants/ribbonBarType';

const initialProps: RibbonBarButtonProps = {
  disabled: false,
  text: 'text',
  iconSvg: star,
};
const component = mount(<RibbonBarButton {...initialProps} />);

describe('UxtRibbonBarButton', () => {
  it('check render of component', () => {
    expect(component.find(RibbonBarButton).length).toEqual(1);
  });

  it('check button props', () => {
    expect(component.find('button').length).toEqual(1);
    expect(component.find('button').prop('disabled')).toEqual(false);

    component.setProps({ disabled: true });

    expect(component.find('button').prop('disabled')).toEqual(true);
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
    expect(component.find(Icon).prop('size')).toEqual(20);
    expect(component.find(Icon).prop('svg')).toEqual(star);
  });

  it('check for appearance', () => {
    component.setProps({
      appearance: RibbonBarType.Classic,
    });
    component.update();

    expect(component.find(RibbonBarButton).prop('appearance')).toEqual(
      RibbonBarType.Classic,
    );
  });
});
