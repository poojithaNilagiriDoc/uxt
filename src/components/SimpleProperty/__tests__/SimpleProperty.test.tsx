import React from 'react';
import { mount } from 'enzyme';
import SimpleProperty from '..';

const component = mount(<SimpleProperty />);

describe('UxtSimpleProperty', () => {
  it('check render of component', () => {
    expect(component.find(SimpleProperty).length).toEqual(1);
  });

  it('check for className', () => {
    component.setProps({
      className: 'simple-property',
    });
    component.update();

    expect(component.find(SimpleProperty).prop('className')).toEqual(
      'simple-property',
    );
  });

  it('check for name and value', () => {
    component.setProps({
      name: 'Property Name',
      value: 'Some value for the property',
    });
    component.update();

    expect(component.find(SimpleProperty).prop('name')).toEqual(
      'Property Name',
    );
    expect(component.find(SimpleProperty).prop('value')).toEqual(
      'Some value for the property',
    );
  });
});
