import React from 'react';
import { mount } from 'enzyme';
import Button from '../../../Button';
import Snackbar from '..';

const component = mount(<Snackbar />);

describe('UxtSnackbar', () => {
  it('check render of component', () => {
    expect(component.find(Snackbar).length).toEqual(1);
  });

  it('check for message and className props', () => {
    const mockOnActionClick = jest.fn();

    component.setProps({
      onActionClick: mockOnActionClick,
      className: 'snack-bar',
      message: 'A sample message',
      actionText: 'view',
      isMultiline: true,
      type: 'success',
    });

    expect(component.find(Snackbar).prop('className')).toEqual('snack-bar');
    expect(component.find(Snackbar).prop('message')).toEqual(
      'A sample message',
    );
    expect(component.find(Snackbar).prop('actionText')).toEqual('view');
    expect(component.find(Snackbar).prop('isMultiline')).toEqual(true);
    expect(component.find(Snackbar).prop('type')).toEqual('success');

    component.find(Button).prop('onClick')();
    expect(mockOnActionClick).toHaveBeenCalled();
  });
});
