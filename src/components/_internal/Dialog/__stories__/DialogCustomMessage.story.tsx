import React from 'react';
import createStyles from '@material-ui/core/styles/createStyles';
import { v4 as uuid } from 'uuid';
import Dialog from '../index';
import makeStyles from '../../../_helpers/makeStyles';
import type { UxtTheme } from '../../../../themes/UxtTheme';

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
  { name: 'UxtStorybookDialogCustomMessage' },
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

export default function DialogCustomMessage() {
  return (
    <Dialog
      titleText="Error Log"
      type="error"
      message={React.createElement(CustomMessage, {}, null)}
    />
  );
}
