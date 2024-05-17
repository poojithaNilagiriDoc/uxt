import React from 'react';
import { mount } from 'enzyme';
import RibbonBarTab, { RibbonBarTabProps } from '../index';

const initialProps: RibbonBarTabProps = {
  id: 'home',
  activeTabName: 'home',
  name: 'home',
};
const component = mount(<RibbonBarTab {...initialProps} />);

describe('UXTRibbonBarTab', () => {
  it('check render of component', () => {
    expect(component.find(RibbonBarTab).length).toEqual(1);
  });

  it('check for isContextual and isDisabled', () => {
    component.setProps({
      isContextual: true,
      isDisabled: false,
      id: 'home',
      activeTabName: 'home',
      name: 'home',
    });
    component.update();

    expect(component.find(RibbonBarTab).prop('isContextual')).toEqual(true);
    expect(component.find(RibbonBarTab).prop('isDisabled')).toEqual(false);
  });

  it('check for name, activeTabName and children', () => {
    component.setProps({
      id: 'home',
      activeTabName: 'home',
      children: <h4>home</h4>,
    });
    component.update();

    expect(component.find(RibbonBarTab).prop('id')).toEqual('home');
    expect(component.find(RibbonBarTab).prop('activeTabName')).toEqual('home');
    expect(component.find(RibbonBarTab).prop('children')).toEqual(
      <h4>home</h4>,
    );
  });

  it('check for text and isBackArrowVisible', () => {
    component.setProps({
      id: 'home',
      activeTabName: 'home',
      children: <h4>home</h4>,
      text: 'Home',
      isBackArrowVisible: true,
    });
    component.update();

    expect(component.find(RibbonBarTab).prop('text')).toEqual('Home');
    expect(component.find(RibbonBarTab).prop('isBackArrowVisible')).toEqual(
      true,
    );
  });

  it('check for panelContent and sidebarContent', () => {
    component.setProps({
      id: 'home',
      activeTabName: 'home',
      children: <h4>home</h4>,
      isBackArrowVisible: true,
      panelContent: <h4>Panel Content</h4>,
      sidebarContent: <h4>Sidebar Content</h4>,
    });
    component.update();

    expect(component.find(RibbonBarTab).prop('panelContent')).toEqual(
      <h4>Panel Content</h4>,
    );
    expect(component.find(RibbonBarTab).prop('sidebarContent')).toEqual(
      <h4>Sidebar Content</h4>,
    );
  });
});
