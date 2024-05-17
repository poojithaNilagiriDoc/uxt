import React from 'react';
import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '../../_helpers/makeStyles';
import { UxtTheme } from '../../../themes/UxtTheme';
import PushPanel from '../../PushPanel';
import Toolbar from '../../Toolbar';
import SimpleProperty from '../index';
import Avatar from '../../Avatar';
import AvatarGroup from '../../AvatarGroup';
import useIsMounted from '../../../hooks/useIsMounted';

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      panel: {
        height: '100vh',
        borderRight: theme.palette.divider,
      },
      panelContent: {
        padding: theme.spacing(2),
      },
      alignStart: {
        justifyContent: 'flex-start',
        paddingLeft: theme.spacing(1),
      },
    }),
  { name: 'UxtSimplePropertyCustomStory' },
);

interface User {
  name?: string;
  age?: number;
}

export default function SimplePropertyCustom() {
  const classes: Record<string, string> = useStyles({});

  const isMounted: () => boolean = useIsMounted();
  const [users, setUsers] = React.useState<Array<User>>();

  function getNameContent() {
    return <div>Assigned to</div>;
  }

  const getValueContent = React.useCallback((): React.ReactNode => {
    return users ? (
      <AvatarGroup classes={{ root: classes.alignStart }} max={3} size="small">
        {users.map((user: User) => (
          <Avatar title={user.name}>{user.name.charAt(0)}</Avatar>
        ))}
      </AvatarGroup>
    ) : undefined;
  }, [users, classes.alignStart]);

  const fetchUsers = React.useCallback((): Array<User> => {
    return [
      { name: 'Alex', age: 18 },
      { name: 'Jane', age: 16 },
      { name: 'Rayleigh', age: 23 },
      { name: 'John', age: 25 },
      { name: 'Jessica', age: 26 },
      { name: 'Shane', age: 40 },
    ];
  }, []);

  React.useEffect((): void => {
    if (isMounted()) {
      setUsers(fetchUsers());
    }
  }, [isMounted, fetchUsers]);

  return (
    <PushPanel className={classes.panel} isOpen={true} width={320}>
      <Toolbar position="top" style={{ backgroundColor: 'white' }}>
        <h1>Panel Title</h1>
      </Toolbar>
      <div className={classes.panelContent}>
        <SimpleProperty name="Title" value="Lorem ipsum dolor sit amet" />
        <SimpleProperty name={getNameContent()} value={getValueContent()} />
      </div>
    </PushPanel>
  );
}
