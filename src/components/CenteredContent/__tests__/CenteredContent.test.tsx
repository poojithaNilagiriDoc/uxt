import React from 'react';
import { mount } from 'enzyme';
import CenteredContent from '../index';

const initialProps = {
  children: 'Some Content',
};

const component = mount(<CenteredContent {...initialProps} />);

describe('UxtCenteredContent', () => {
  it('check render of component', () => {
    expect(component.find(CenteredContent).length).toEqual(1);
  });

  it('check CenteredContent render and children prop', () => {
    expect(component.find('div').length).toEqual(2);
    expect(component.find('div').at(1).prop('children')).toEqual(
      'Some Content',
    );
  });
});
