import React from 'react';
import { mount } from 'enzyme';
import user from 'uxt-graphics/icons/user';
import star from 'uxt-graphics/icons/star';
import Avatar from '../index';
import Icon from '../../Icon';

const mockOnClick = jest.fn();
const initialProps = {
  showStatus: false,
  iconSvg: user,
  onClick: mockOnClick,
};
const component = mount(<Avatar {...initialProps} />);

describe('UxtAvatar', () => {
  it('check render of component', () => {
    expect(component.find(Avatar).length).toEqual(1);
  });

  it('check if mockOnClick is being called or not on click', () => {
    expect(component.find('div').length).toEqual(3);
    component.find('div').first().prop('onClick')();

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('check Icon props on update', () => {
    expect(component.find(Icon).length).toEqual(1);
    expect(component.find(Icon).prop('svg')).toEqual(user);

    component.setProps({ iconSvg: star, size: 'regular' });
    component.update();

    expect(component.find(Icon).prop('size')).toEqual('regular');
    expect(component.find(Icon).prop('svg')).toEqual(star);
  });

  it('check props of path on setting statusType to available', () => {
    component.setProps({ showStatus: true });
    component.update();

    expect(component.find('div').length).toEqual(5);

    component.setProps({ statusType: 'available' });
    component.update();

    expect(component.find('path').length).toEqual(2);
    expect(component.find('path').first().props().d).toEqual(
      'M6,0A6,6,0,1,1,0,6,6.01764,6.01764,0,0,1,6,0Z',
    );
  });

  it('check props of path on setting statusType to busy', () => {
    component.setProps({ statusType: 'busy' });
    component.update();

    expect(component.find('path').length).toEqual(1);
    expect(component.find('path').first().props().d).toEqual(
      'M6,0A6,6,0,1,1,0,6,6,6,0,0,1,6,0Z',
    );
  });

  it('check props of path on setting statusType to do not disturb', () => {
    component.setProps({ statusType: 'do not disturb' });
    component.update();

    expect(component.find('path').length).toEqual(2);
    expect(component.find('path').at(0).props().d).toEqual(
      'M6,0A6,6,0,1,1,0,6,6,6,0,0,1,6,0Z',
    );
    expect(component.find('path').at(1).props().d).toEqual(
      'M9,7H3A1,1,0,0,1,2,6H2A1,1,0,0,1,3,5H9a1,1,0,0,1,1,1h0A1,1,0,0,1,9,7Z',
    );
  });
});
