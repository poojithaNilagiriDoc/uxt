import isEmpty from 'lodash/fp/isEmpty';
import sample from 'lodash/fp/sample';
import take from 'lodash/fp/take';
import uniqueId from 'lodash/fp/uniqueId';
import without from 'lodash/fp/without';
import React from 'react';
import { NotificationServiceNotification } from '../../../../services/NotificationService';
import Button from '../../../Button';
import SnackbarStack from '../index';

export default function SnackbarStackDynamic() {
  const [activeNotifications, setActiveNotifications] = React.useState<any[]>(
    [],
  );
  const [queuedNotifications, setQueuedNotifications] = React.useState<any[]>(
    [],
  );

  const updateActiveNotifications = React.useCallback(
    function updateActiveNotifications(): void {
      if (isEmpty(queuedNotifications)) return;

      const maxActive: number = 5;
      const activeLength: number = activeNotifications.length;
      const openActiveSlots: number = maxActive - activeLength;

      if (openActiveSlots < 1) return;

      const notificationsToActivate: [] = take(
        openActiveSlots,
        queuedNotifications,
      );

      setActiveNotifications([activeNotifications, ...notificationsToActivate]);
      setQueuedNotifications(
        without(notificationsToActivate, queuedNotifications),
      );

      notificationsToActivate.forEach(
        (notification: NotificationServiceNotification) => {
          if (!notification.duration || notification.duration === Infinity)
            return;

          setTimeout(() => {
            closeNotification(notification.id);
          }, notification.duration);
        },
      );
    },
    [activeNotifications, closeNotification, queuedNotifications],
  );

  const closeNotification = React.useCallback(
    function closeNotification(id: number): void {
      const isNotTargetNotification = (n: { id: number }) => n.id !== id;

      setActiveNotifications(
        activeNotifications.filter(isNotTargetNotification),
      );
      setQueuedNotifications(
        queuedNotifications.filter(isNotTargetNotification),
      );
      updateActiveNotifications();
    },
    [activeNotifications, queuedNotifications, updateActiveNotifications],
  );

  const addNotification = React.useCallback(
    function addNotification(): void {
      const duration: [] = sample([1000, 3000, 5000, 7000, 10000, Infinity]);
      const id: string = uniqueId();

      setActiveNotifications([
        ...queuedNotifications,
        {
          actionText: 'dismiss',
          message: `Notification ${id} (duration: ${duration})`,
          onActionClick: () => closeNotification(id),
          duration,
          id,
        },
      ]);

      updateActiveNotifications();
    },
    [closeNotification, queuedNotifications, updateActiveNotifications],
  );

  const closeAllNotifications = React.useCallback(
    function closeAllNotifications(): void {
      setActiveNotifications([]);
      setQueuedNotifications([]);
    },
    [],
  );

  return (
    <div
      style={{
        bottom: 0,
        display: 'flex',
        flex: '1 1 auto',
        flexDirection: 'column-reverse',
        left: 0,
        padding: 16,
        position: 'absolute',
        right: 0,
      }}
    >
      <Button onClick={closeAllNotifications} text="Clear Notifications" />
      <Button onClick={addNotification} text="Add Notification" />
      <SnackbarStack
        notifications={activeNotifications}
        style={{
          marginBottom: 64,
        }}
      />
    </div>
  );
}
