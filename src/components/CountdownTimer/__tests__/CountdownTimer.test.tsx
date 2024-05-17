import React from 'react';
import { mount } from 'enzyme';
import globe from 'uxt-graphics/icons/globe';
import CountdownTimer from '..';

const component = mount(<CountdownTimer remainingTime="1000" />);

describe('UxtCountdownTimer', () => {
  it('check render of component', () => {
    expect(component.find(CountdownTimer).length).toEqual(1);
  });

  it('check for texts', () => {
    component.setProps({
      showText: globe,
      daysText: 'days',
      hoursText: 'hours',
      minutesText: 'minutes',
      yearsText: 'years',
      remainingTime: '2000',
    });
    component.update();

    expect(component.find(CountdownTimer).prop('showText')).toEqual(globe);
    expect(component.find(CountdownTimer).prop('daysText')).toEqual('days');
    expect(component.find(CountdownTimer).prop('hoursText')).toEqual('hours');
    expect(component.find(CountdownTimer).prop('minutesText')).toEqual(
      'minutes',
    );
    expect(component.find(CountdownTimer).prop('yearsText')).toEqual('years');
    expect(component.find(CountdownTimer).prop('remainingTime')).toEqual(
      '2000',
    );
  });
});
