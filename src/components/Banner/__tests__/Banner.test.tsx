import React from 'react';
import { mount } from 'enzyme';
import globe from 'uxt-graphics/icons/globe';
import Banner from '..';
import Button from '../../Button';

const component = mount(<Banner />);

describe('UxtBanner', () => {
  it('check render of component', () => {
    expect(component.find(Banner).length).toEqual(1);
  });

  it('check for iconSvg, isOpen and message', () => {
    component.setProps({
      iconSvg: globe,
      isOpen: true,
      message:
        'Your password was updated on your other device. In order to continue working, please sign in again to access your account.',
    });
    component.update();

    expect(component.find(Banner).prop('iconSvg')).toEqual(globe);
    expect(component.find(Banner).prop('isOpen')).toEqual(true);
    expect(component.find(Banner).prop('message')).toEqual(
      'Your password was updated on your other device. In order to continue working, please sign in again to access your account.',
    );
  });

  it('check for actions', () => {
    const mockAction1 = jest.fn();
    const mockAction2 = jest.fn();

    component.setProps({
      iconSvg: globe,
      isOpen: true,
      message:
        'Your password was updated on your other device. In order to continue working, please sign in again to access your account.',
      actionButton1Text: 'continue as guest',
      actionButton2Text: 'sign in',
      onActionButton1Click: mockAction1,
      onActionButton2Click: mockAction2,
    });
    component.update();

    component.find(Button).first().simulate('click');
    component.find(Button).last().simulate('click');

    expect(component.find(Banner).prop('actionButton1Text')).toEqual(
      'continue as guest',
    );
    expect(component.find(Banner).prop('actionButton2Text')).toEqual('sign in');

    expect(mockAction1).toHaveBeenCalledTimes(1);
    expect(mockAction2).toHaveBeenCalledTimes(1);
  });

  it('check for className', () => {
    component.setProps({
      className: 'banner',
    });

    expect(component.find(Banner).prop('className')).toEqual('banner');
  });
});
