import React from 'react';
import { mount } from 'enzyme';
import star from 'uxt-graphics/icons/star';
import RibbonBarButton, { RibbonBarDropdownButtonProps } from '../index';
import Icon from '../../Icon';
import RibbonBarType from '../../constants/ribbonBarType';

const initialProps: RibbonBarDropdownButtonProps = {
  disabled: false,
  text: 'text',
  iconSvg: star,
};
const component = mount(<RibbonBarButton {...initialProps} />);

describe('UxtRibbonBarDropdownButton', () => {
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
    expect(component.find(Icon).length).toEqual(2);
    expect(component.find(Icon).first().prop('size')).toEqual(20);
    expect(component.find(Icon).first().prop('svg')).toEqual(star);
  });

  it('check for appearance and isActive', () => {
    component.setProps({
      appearance: RibbonBarType.Classic,
      isActive: true,
    });
    component.update();

    expect(component.find(RibbonBarButton).prop('appearance')).toEqual(
      RibbonBarType.Classic,
    );
    expect(component.find(RibbonBarButton).prop('isActive')).toEqual(true);
  });

  it('check for popoverContent', () => {
    component.setProps({
      isOpen: true,
      popoverContent: <h3>Popover Content</h3>,
    });
    component.update();

    expect(component.find(RibbonBarButton).prop('isOpen')).toEqual(true);
    expect(component.find(RibbonBarButton).prop('popoverContent')).toEqual(
      <h3>Popover Content</h3>,
    );
  });
});
