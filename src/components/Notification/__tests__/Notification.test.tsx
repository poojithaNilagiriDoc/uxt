import React from 'react';
import { mount } from 'enzyme';
import Notification, { NotificationNotification, NotificationProps } from '..';

const mockOnDismiss = jest.fn();
const initialProps: NotificationProps = {
  onDismiss: mockOnDismiss,
};
const component = mount(<Notification {...initialProps} />);

describe('UxtNotification', () => {
  it('check render of component', () => {
    expect(component.find(Notification).length).toEqual(1);
  });

  it('check for notification', () => {
    const mockAction = jest.fn();
    const notification: NotificationNotification = {
      id: 1,
      headerText: 'Notification',
      action: mockAction,
      actionText: 'Details',
      type: 'error',
    };
    component.setProps({
      notification: notification,
    });

    expect(component.find(Notification).prop('notification')).toEqual(
      notification,
    );
  });

  it('check for onDismiss', () => {
    const mockOnDismiss = jest.fn();

    component.setProps({
      onDismiss: mockOnDismiss,
    });
    component.find(Notification).prop('onDismiss')();

    expect(mockOnDismiss).toHaveBeenCalled();
  });
});
