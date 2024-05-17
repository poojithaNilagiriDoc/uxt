import React from 'react';
import alarm from 'uxt-graphics/icons/alarm';
import { v4 as uuid } from 'uuid';
import { formatDistance } from 'date-fns';
import makeStyles from '../../_helpers/makeStyles';
import Badge from '../../Badge';
import Shell from '../../Shell';
import ShellContent from '../../ShellContent';
import ShellMain from '../../ShellMain';
import ToggleIconButton, {
  ToggleIconButtonProps,
} from '../../ToggleIconButton';
import Topbar from '../../Topbar';
import NotificationPanel from '../index';
import { NotificationNotification } from '../../Notification';

const useStyles = makeStyles(
  theme => ({
    background: { backgroundColor: theme.palette.action.disabled },
    active: { fill: 'inherit' },
  }),
  { name: 'NotificationPanelDynamic' },
);

const getDate = (i: number) => {
  const date = new Date();

  if (i % 5 === 0) {
    return date;
  }

  if (i % 2 === 0 && i % 3 === 0) {
    date.setSeconds(date.getSeconds() - 10);
  }

  if (i % 3 === 0) {
    date.setMonth(1);
  }

  if (i % 2 === 0) {
    date.setFullYear(2000);
  }

  if (i % 7 === 0) {
    date.setDate(date.getDate() - 9);
  }
  return date;
};

const generateRandomInt = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min) + min);

const getItems = (count: number): Array<NotificationNotification> => {
  let items: Array<NotificationNotification> = [];

  for (let i = 0; i < count; i++) {
    const messageCount: number = generateRandomInt(1, 6);
    let message: string = '';

    for (let j = 0; j < messageCount; j++) {
      message += 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
    }

    items.push({
      id: uuid(),
      message: message,
      headerText: 'Just now' + i,
      type:
        i % 2 === 0
          ? ('info' as const)
          : i % 3 === 0
          ? ('success' as const)
          : ('error' as const),
      isDismissable: true,
      timestamp: getDate(i),
      actionText: 'Details',
      action: () => {
        console.log('check', i);
      },
    });
  }

  return items;
};

const items: Array<NotificationNotification> = getItems(1000);

function TopbarToggleIconButton(props: ToggleIconButtonProps) {
  const { classes: classesProp, ...rest } = props;

  return <ToggleIconButton classes={useStyles(props)} {...rest} />;
}

type TypeFilter = 'all' | 'error' | 'info' | 'success' | 'warning';

export default function NotificationPanelDynamic() {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [typeFilter, setTypeFilter] = React.useState<TypeFilter>(
    'all' as const,
  );
  const [notifications, setNotifications] =
    React.useState<Array<NotificationNotification>>(items);

  console.log(formatDistance(new Date(), Date.now(), { addSuffix: true }));
  return (
    <Shell>
      <Topbar>
        <Badge count={notifications.length}>
          <TopbarToggleIconButton
            iconSvg={alarm}
            isActive={isOpen}
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          />
        </Badge>
      </Topbar>
      <ShellMain style={{ position: 'relative' }}>
        <ShellContent />
        <NotificationPanel
          autoSort={true}
          isOpen={isOpen}
          notifications={notifications}
          onNotificationsChange={(value: Array<NotificationNotification>) =>
            setNotifications(value)
          }
          onTypeFilterChange={(value: TypeFilter) => setTypeFilter(value)}
          typeFilter={typeFilter}
          onIsOpenChange={setIsOpen}
        />
      </ShellMain>
    </Shell>
  );
}
