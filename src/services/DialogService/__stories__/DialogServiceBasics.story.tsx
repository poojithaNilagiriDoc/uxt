import React from 'react';
import createStyles from '@material-ui/core/styles/createStyles';
import { v4 as uuid } from 'uuid';
import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';
import Button from '../../../components/Button';
import dark from '../../../themes/dark';
import DialogService from '../index';
import makeStyles from '../../../components/_helpers/makeStyles';
import type { UxtTheme } from '../../../themes/UxtTheme';

const longText =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur porta, urna id facilisis pharetra, est felis rhoncus libero, sollicitudin semper leo purus suscipit ex. Vivamus pulvinar sagittis est. Pellentesque ullamcorper consequat arcu. Proin et est et turpis lacinia dapibus. In quis eros nisi. Nam lorem nisi, mollis non arcu vel, elementum fermentum justo. Ut efficitur ac tortor rutrum mollis. Integer venenatis mattis nibh non malesuada. Aliquam quis arcu rutrum, pulvinar lorem sed, pharetra dolor. Maecenas eget convallis nisl. Donec malesuada nec erat laoreet tincidunt. Vivamus ut convallis turpis, vitae tempor velit. Sed nec nisi efficitur ex pretium dignissim.';

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: theme.spacing(2),
      },
    }),
  { name: 'UxtStorybookDialogServiceCustomMessage' },
);

const CustomMessage = () => {
  const classes = useStyles({});
  return (
    <div className={classes.root}>
      <span>Log ID: {uuid()}</span>
      <span>Lorem ipsum dolor sit amet</span>
    </div>
  );
};

export default function DialogServiceBasics() {
  return (
    <div>
      <Button
        onClick={() => {
          DialogService.alert({
            message: text('Alert text', 'The specified user has been deleted.'),
            submitText: 'dismiss',
            titleText: text('', ''),
          }).then(action('dismiss'));
        }}
        style={{
          margin: 16,
        }}
      >
        Alert
      </Button>
      <Button
        onClick={() => {
          DialogService.confirm({
            message: text(
              'Confirm message',
              'Are you sure you want to delete the user?',
            ),
            titleText: text('Confirm title', 'Delete User'),
          }).then(action('dismiss'));
        }}
        style={{
          margin: 16,
        }}
      >
        Confirm
      </Button>
      <Button
        onClick={() => {
          DialogService.confirm({
            message: text('Confirm message', longText),
            titleText: text('Confirm title', 'Delete User'),
          }).then(action('dismiss'));
        }}
        style={{
          margin: 16,
        }}
      >
        Confirm (Long)
      </Button>
      <Button
        onClick={() => {
          DialogService.alert({
            message: 'Something bad has happened and things are broken.',
            submitText: 'dismiss',
            titleText: 'This is an error',
            type: 'error',
          }).then(action('dismiss'));
        }}
        style={{
          margin: 16,
        }}
      >
        Error
      </Button>
      <Button
        onClick={() => {
          DialogService.alert({
            theme: dark,
            message: 'The process has succeeded!',
            submitText: 'dismiss',
            titleText: 'Success',
            type: 'success',
          }).then(action('dismiss'));
        }}
        style={{
          margin: 16,
        }}
      >
        Success
      </Button>
      <Button
        onClick={() => {
          DialogService.alert({
            message:
              "Something kinda bad has happened and things don't seem quite right.",
            submitText: 'dismiss',
            titleText: 'This is a warning',
            type: 'warning',
          }).then(action('dismiss'));
        }}
        style={{
          margin: 16,
        }}
      >
        Warning
      </Button>
      <Button
        onClick={() => {
          DialogService.alert({
            htmlMessage:
              'This is <strong>HTML</strong> <span style="text-decoration: underline;">Baby!</span>',
            submitText: 'dismiss',
          }).then(action('dismiss'));
        }}
        style={{
          margin: 16,
        }}
      >
        HTML Message
      </Button>
      <Button
        onClick={() => {
          DialogService.alert({
            message: React.createElement(CustomMessage, {}, null),
            submitText: 'dismiss',
            titleText: text('titleText', 'An error occured'),
            type: text('type', 'error'),
          }).then(action('dismiss'));
        }}
        style={{
          margin: 16,
        }}
      >
        Alert with Custom React Child
      </Button>
    </div>
  );
}
