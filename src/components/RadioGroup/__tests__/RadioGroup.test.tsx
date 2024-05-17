import React from 'react';
import { mount } from 'enzyme';
import RadioGroup from '..';
import RadioButton from '../../RadioButton';

const component = mount(<RadioGroup />);

describe('UxtRadioGroup', () => {
  it('check render of component', () => {
    expect(component.find(RadioGroup).length).toEqual(1);
  });

  it('check for the label', () => {
    component.setProps({
      label: 'Select',
    });
    component.update();

    expect(component.find(RadioGroup).prop('label')).toEqual('Select');
  });

  it('check for children', () => {
    component.setProps({
      children: (
        <>
          <RadioButton text="One" value={1} selectedValue={1} />
          <RadioButton text="Two" value={2} selectedValue={0} />
        </>
      ),
      value: 1,
    });
    component.update();

    expect(component.find(RadioGroup).prop('value')).toEqual(1);
  });
});
