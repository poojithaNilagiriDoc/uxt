import React from 'react';
import { mount } from 'enzyme';
import Spinner, { SpinnerProps } from '..';

const initialProps: SpinnerProps = {
  appearance: 'line',
  size: 'medium',
};
const component = mount(<Spinner {...initialProps} />);

describe('UxtSpinner', () => {
  it('check render of component', () => {
    expect(component.find(Spinner).length).toEqual(1);
  });

  it('check for duration and size', () => {
    component.setProps({
      duration: 3000,
      size: 'small',
    });
    component.update();

    expect(component.find(Spinner).prop('duration')).toEqual(3000);
    expect(component.find(Spinner).prop('size')).toEqual('small');
  });

  it('check for className', () => {
    component.setProps({
      className: 'Spinner',
    });
    component.update();

    expect(component.find(Spinner).prop('className')).toEqual('Spinner');
  });
});
