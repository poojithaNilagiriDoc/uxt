import isEmpty from 'lodash/fp/isEmpty';
import noop from 'lodash/fp/noop';
import take from 'lodash/fp/take';
import uniqueId from 'lodash/fp/uniqueId';
import without from 'lodash/fp/without';
import { ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import ReactDOM from 'react-dom';
import SnackbarStack from '../../components/_internal/SnackbarStack';
import light from '../../themes/light';

export type NotificationServiceNotificationType =
  | 'error'
  | 'info'
  | 'success'
  | 'warning';

type NotifyFunction = (
  message: string,
  action?: Function,
  actionText?: string,
  duration?: number,
  multiline?: boolean,
  snackbarClasses?: object,
) => void;

export interface NotificationServiceNotification {
  actionText?: string;
  duration?: number;
  id?: string;
  isMultiline?: boolean;
  message?: string;
  onActionClick?: () => void;
  classes?: object;
  type?: NotificationServiceNotificationType;
}

export interface NotificationService {
  clearAll: Function;
  error: NotifyFunction;
  info: NotifyFunction;
  success: NotifyFunction;
  warning: NotifyFunction;
}

const defaultDuration = 3500;
const state: {
  activeNotifications: Array<NotificationServiceNotification>;
  queuedNotifications: Array<NotificationServiceNotification>;
} = { activeNotifications: [], queuedNotifications: [] };

export default {
  clearAll(): void {
    state.activeNotifications = [];
    state.queuedNotifications = [];

    this.updateActiveNotifications();
  },

  closeNotification(id: number): void {
    const animateOutDuration = 250;
    const isNotTargetNotification = n => n.id !== id;

    state.activeNotifications = state.activeNotifications.filter(
      isNotTargetNotification,
    );

    state.queuedNotifications = state.queuedNotifications.filter(
      isNotTargetNotification,
    );

    setTimeout(() => {
      this.updateActiveNotifications();
    }, animateOutDuration);
  },

  error(...args) {
    return this.notify('error', ...args);
  },

  info(...args) {
    return this.notify('info', ...args);
  },

  notify(
    type: NotificationServiceNotificationType,
    message: string,
    action = noop,
    actionText: string = undefined,
    duration: number = defaultDuration,
    isMultiline: boolean = false,
    snackbarClasses: object = {},
  ) {
    const id = uniqueId();

    state.queuedNotifications = [
      ...state.queuedNotifications,
      {
        onActionClick: () => {
          action();

          this.closeNotification(id);
        },
        actionText,
        classes: snackbarClasses,
        duration,
        id,
        isMultiline,
        message,
        type,
      },
    ];

    this.updateActiveNotifications();

    return id;
  },

  rerender() {
    render(
      <ThemeProvider theme={light}>
        <SnackbarStack notifications={state.activeNotifications} />
      </ThemeProvider>,
    );
  },

  success(...args) {
    return this.notify('success', ...args);
  },

  updateActiveNotifications() {
    if (isEmpty(state.queuedNotifications)) {
      this.rerender();
      return;
    }

    const maxActive: number = 5;
    const activeLength: number = state.activeNotifications.length;
    const openActiveSlots: number = maxActive - activeLength;

    if (openActiveSlots < 1) return;

    const notificationsToActivate: Array<NotificationServiceNotification> =
      take(openActiveSlots, state.queuedNotifications);

    state.activeNotifications = [
      ...state.activeNotifications,
      ...notificationsToActivate,
    ];

    state.queuedNotifications = without(
      notificationsToActivate,
      state.queuedNotifications,
    );

    notificationsToActivate.forEach(notification => {
      if (!notification.duration || notification.duration === Infinity) return;

      setTimeout(() => {
        this.closeNotification(notification.id);
      }, notification.duration);
    });

    this.rerender();
  },

  warning(...args) {
    return this.notify('warning', ...args);
  },
} as NotificationService;

function appendSnackbarStack() {
  const target = document.createElement('div');

  target.setAttribute('id', 'UxtNotificationService-SnackbarStack');

  document.body.appendChild(target);

  return target;
}

function render(component) {
  if (!document.querySelector('#UxtNotificationService-SnackbarStack')) {
    appendSnackbarStack();
  }

  ReactDOM.render(
    component,
    document.querySelector('#UxtNotificationService-SnackbarStack'),
  );
}
