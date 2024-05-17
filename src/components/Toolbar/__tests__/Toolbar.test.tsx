import React from 'react';
import { mount } from 'enzyme';
import star from 'uxt-graphics/icons/star';
import Toolbar, { ToolbarProps } from '..';
import IconButton from '../../IconButton';

const initialProps: ToolbarProps = {
  isCentered: false,
  position: 'bottom',
};
const component = mount(<Toolbar {...initialProps} />);

describe('UxtToolbar', () => {
  it('check render of component', () => {
    expect(component.find(Toolbar).length).toEqual(1);
  });

  it('check for isCentered and position', () => {
    component.setProps({
      isCentered: true,
      position: 'top',
    });
    component.update();

    expect(component.find(Toolbar).prop('isCentered')).toEqual(true);
    expect(component.find(Toolbar).prop('position')).toEqual('top');
  });

  it('check for children', () => {
    component.setProps({
      children: <IconButton iconSvg={star} />,
    });

    expect(component.find(Toolbar).prop('children')).toEqual(
      <IconButton iconSvg={star} />,
    );
  });

  it('check for className', () => {
    component.setProps({
      className: 'toolbar',
    });

    expect(component.find(Toolbar).prop('className')).toEqual('toolbar');
  });
});
