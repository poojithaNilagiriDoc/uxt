import React from 'react';
import { mount } from 'enzyme';
import Progressbar, { ProgressBarProps } from '..';

const initialProps: ProgressBarProps = {
  isIndeterminate: true,
};
const component = mount(<Progressbar {...initialProps} />);

describe('UxtProgressBar', () => {
  it('check render of component', () => {
    expect(component.find(Progressbar).length).toEqual(1);
  });

  it('check for className', () => {
    component.setProps({
      className: 'progressbar',
    });

    expect(component.find(Progressbar).prop('className')).toEqual(
      'progressbar',
    );
  });

  it('check for isIndeterminate and value', () => {
    component.setProps({
      isIndeterminate: false,
      value: 50,
    });

    expect(component.find(Progressbar).prop('isIndeterminate')).toEqual(false);
    expect(component.find(Progressbar).prop('value')).toEqual(50);
  });
});
