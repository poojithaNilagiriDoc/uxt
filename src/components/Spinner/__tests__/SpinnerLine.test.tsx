import React from 'react';
import { mount } from 'enzyme';
import SpinnerLine, { SpinnerLineProps } from '../SpinnerLine';

const initialProps: SpinnerLineProps = {
  duration: 1000,
  width: 200,
};
const component = mount(<SpinnerLine {...initialProps} />);

describe('UxtSpinnerLine', () => {
  it('check render of component', () => {
    expect(component.find(SpinnerLine).length).toEqual(1);
  });

  it('check for width and height', () => {
    component.setProps({
      width: 200,
      height: 200,
    });
    component.update();

    expect(component.find(SpinnerLine).prop('width')).toEqual(200);
    expect(component.find(SpinnerLine).prop('height')).toEqual(200);
  });
});
