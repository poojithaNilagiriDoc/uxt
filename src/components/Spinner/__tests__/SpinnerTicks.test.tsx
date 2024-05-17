import React from 'react';
import { mount } from 'enzyme';
import SpinnerTicks, { SpinnerTicksProps } from '../SpinnerTicks';

const initialProps: SpinnerTicksProps = {
  duration: 1000,
  width: 200,
};
const component = mount(<SpinnerTicks {...initialProps} />);

describe('UxtSpinnerTicks', () => {
  it('check render of component', () => {
    expect(component.find(SpinnerTicks).length).toEqual(1);
  });

  it('check for width and height', () => {
    component.setProps({
      width: 200,
      height: 200,
    });
    component.update();

    expect(component.find(SpinnerTicks).prop('width')).toEqual(200);
    expect(component.find(SpinnerTicks).prop('height')).toEqual(200);
  });
});
