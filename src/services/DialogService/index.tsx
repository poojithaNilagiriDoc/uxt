import { ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import ReactDOM from 'react-dom';
import Dialog from '../../components/_internal/Dialog';
import light from '../../themes/light';
import dark from '../../themes/dark';

export interface IDialogConfirmOptions {
  cancelText?: string;
  message: React.ReactNode;
  submitText?: string;
  titleText: string;
  theme?: typeof light | typeof dark;
}
export interface IDialogAlertOptions {
  message?: React.ReactNode;
  submitText?: string;
  titleText: string;
  type?: string;
  theme?: typeof light | typeof dark;
}

type DialogAlert = (options: IDialogAlertOptions) => Promise<boolean>;
type DialogConfirm = (options: IDialogConfirmOptions) => Promise<boolean>;

export interface DialogService {
  alert: DialogAlert;
  confirm: DialogConfirm;
}

export default {
  alert: ({ theme, ...rest }: { [key: string]: any }) =>
    new Promise(resolve => {
      render(
        <ThemeProvider theme={theme || light}>
          <Dialog onSubmit={resolve} {...rest} />
        </ThemeProvider>,
      );
    }),
  confirm: ({ theme, ...rest }: { [key: string]: any }) =>
    new Promise(resolve => {
      render(
        <ThemeProvider theme={theme || light}>
          <Dialog onCancel={resolve} onSubmit={resolve} {...rest} />
        </ThemeProvider>,
      );
    }),
} as DialogService;

function appendDialogTarget() {
  const target = document.createElement('UxtDialog');

  target.setAttribute('id', 'UxtDialog');

  document.body.appendChild(target);

  return target;
}

function render(component) {
  appendDialogTarget();

  ReactDOM.render(component, document.querySelector('#UxtDialog'));
}
