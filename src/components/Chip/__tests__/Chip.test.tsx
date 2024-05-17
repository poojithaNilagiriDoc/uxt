import React from 'react';
import { mount } from 'enzyme';
import star from 'uxt-graphics/icons/star';
import Chip from '../index';
import Icon from '../../Icon';

const mockIsActiveChange = jest.fn();
const mockClickChange = jest.fn();
const initialProps = {
  onIsActiveChange: mockIsActiveChange,
};
const component = mount(<Chip {...initialProps} />);

describe('UxtChip', () => {
  it('check render of component', () => {
    expect(component.find(Chip).length).toEqual(1);
  });

  it('check div click event', () => {
    expect(component.find('div').length).toEqual(2);
    component.find('div').at(0).prop('onClick')();

    expect(mockIsActiveChange).toHaveBeenCalled();
  });

  it('check Icon component props on setting star and text', () => {
    expect(component.find(Icon).length).toEqual(0);

    component.setProps({
      iconSvg: star,
      text: 'text',
    });
    component.update();

    expect(component.find(Icon).at(0).length).toEqual(1);
    expect(component.find(Icon).at(1).length).toEqual(0);
    expect(component.find(Icon).at(0).prop('svg')).toEqual(star);
    expect(component.find('span').length).toEqual(1);
    expect(component.find('span').text()).toEqual('text');
  });

  it('check Icon component props on Delete', () => {
    component.setProps({
      onDelete: mockClickChange,
    });
    component.update();

    expect(component.find(Icon).at(1).length).toEqual(1);
    expect(component.find(Icon).at(1).prop('size')).toEqual(18);
    expect(component.find(Icon).at(1).prop('svg')).toEqual(
      '<svg viewBox="0 0 24 24"><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm4.3 14.3c-.39.39-1.02.39-1.41 0L12 13.41 9.11 16.3c-.39.39-1.02.39-1.41 0-.39-.39-.39-1.02 0-1.41L10.59 12 7.7 9.11c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0L12 10.59l2.89-2.89c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41L13.41 12l2.89 2.89c.38.38.38 1.02 0 1.41z"/></svg>',
    );
    component.find(Icon).at(1).prop('onClick')();

    expect(mockClickChange).toHaveBeenCalled();
  });
});
