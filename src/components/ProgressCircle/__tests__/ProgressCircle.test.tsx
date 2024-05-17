import React from 'react';
import { mount } from 'enzyme';
import ProgressCircle, { ProgressCircleProps } from '..';

const initialProps: ProgressCircleProps = {
  size: 50,
};
const component = mount(<ProgressCircle {...initialProps} />);

describe('UxtProgressCircle', () => {
  it('check render of component', () => {
    expect(component.find(ProgressCircle).length).toEqual(1);
  });

  it('check for size and value', () => {
    component.setProps({
      size: 75,
      value: 60,
    });
    component.update();

    expect(component.find(ProgressCircle).prop('size')).toEqual(75);
    expect(component.find(ProgressCircle).prop('value')).toEqual(60);
  });

  it('check for style', () => {
    component.setProps({
      style: {
        stroke: 10,
      },
    });
    component.update();

    expect(component.find(ProgressCircle).prop('style')).toEqual({
      stroke: 10,
    });
  });
});
