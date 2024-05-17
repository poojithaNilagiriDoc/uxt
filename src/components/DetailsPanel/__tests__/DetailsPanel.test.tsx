import React from 'react';
import { mount } from 'enzyme';
import MediaQuery from 'react-responsive';
import closeSvg from 'uxt-graphics/icons/close';
import DetailsPanel from '../index';
import Toolbar from '../../Toolbar';
import IconButton from '../../IconButton';

const mockIsOpenChange = jest.fn();
const initialProps = {
  onIsOpenChange: mockIsOpenChange,
};
const component = mount(<DetailsPanel {...initialProps} />);

describe('UxtDetailsPanel', () => {
  it('check render of component', () => {
    expect(component.find(DetailsPanel).length).toEqual(1);
  });

  it('check Toolbar, MediaQuery and IconButton props on update', () => {
    expect(component.find(MediaQuery).length).toEqual(1);
    component.find(MediaQuery).prop('onChange')();

    expect(mockIsOpenChange).toHaveBeenCalled();

    component.setProps({
      showToolbar: false,
    });
    component.update();

    expect(component.find(Toolbar).length).toEqual(0);
    expect(component.find(IconButton).length).toEqual(0);

    component.setProps({
      showToolbar: true,
    });
    component.update();

    expect(component.find(Toolbar).length).toEqual(1);
    expect(component.find(Toolbar).prop('position')).toEqual('top');
    expect(component.find(IconButton).length).toEqual(1);
    expect(component.find(IconButton).prop('iconSvg')).toEqual(closeSvg);
    component.find(IconButton).prop('onClick')();

    expect(mockIsOpenChange).toHaveBeenCalled();
  });
});
