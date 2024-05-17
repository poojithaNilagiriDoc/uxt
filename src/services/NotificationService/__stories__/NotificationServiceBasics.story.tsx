import React from 'react';
import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';
import Button from '../../../components/Button';
import NotificationService from '../index';

export default function NotificationServiceBasics() {
  const handleErrorClick = React.useCallback(function handleErrorClick() {
    NotificationService.error(
      text('Error text', 'Default error text'),
      action('ACTION_CLICKED'),
      'action',
      undefined,
      undefined,
      { error: 'uxt-notification--error' },
    );
  }, []);

  const handleInfoClick = React.useCallback(function handleInfoClick() {
    NotificationService.info(
      text('Info text', 'Default info text'),
      action('ACTION_CLICKED'),
      'action',
    );
  }, []);

  const handleSuccessClick = React.useCallback(function handleSuccessClick() {
    NotificationService.success(
      text('Success text', 'Default success text'),
      action('ACTION_CLICKED'),
      'action',
    );
  }, []);

  const handleWarningClick = React.useCallback(function handleWarningClick() {
    NotificationService.warning(
      text('Warning text', 'Default warning text'),
      action('ACTION_CLICKED'),
      'action',
    );
  }, []);

  return (
    <>
      <Button onClick={handleErrorClick}>Error</Button>
      <Button onClick={handleInfoClick}>Info</Button>
      <Button onClick={handleSuccessClick}>Success</Button>
      <Button onClick={handleWarningClick}>Warning</Button>
      <Button onClick={NotificationService.clearAll}>Close All</Button>
    </>
  );
}
