import React from 'react';
import { mount } from 'enzyme';
import Login from '..';

const component = mount(<Login />);

describe('UxtLogin', () => {
  it('check render of component', () => {
    expect(component.find(Login).length).toEqual(1);
  });

  it('check for children', () => {
    component.setProps({
      children: <h4>Log in.......... Do it.</h4>,
    });

    expect(component.find(Login).prop('children')).toEqual(
      <h4>Log in.......... Do it.</h4>,
    );
  });

  it('check for className', () => {
    component.setProps({
      className: 'login',
    });

    expect(component.find(Login).prop('className')).toEqual('login');
  });

  it('check for productTitle and release', () => {
    component.setProps({
      productTitle: 'Product Title',
      release: 'Release',
    });
    component.update();

    expect(component.find(Login).prop('productTitle')).toEqual('Product Title');
    expect(component.find(Login).prop('release')).toEqual('Release');
  });
});
