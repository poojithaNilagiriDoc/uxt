import React from 'react';
import { action } from '@storybook/addon-actions';
import createStyles from '@material-ui/core/styles/createStyles';
import Chip from '../index';
import Shell from '../../Shell';
import Badge from '../../Badge';
import makeStyles from '../../_helpers/makeStyles';
import type { UxtTheme } from '../../../themes/UxtTheme';

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: theme.spacing(1),
      },
      count: {
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
      },
    }),
  { name: 'UxtStorybookChipBadge' },
);

export default function ChipBadge() {
  const classes = useStyles({});
  return (
    <Shell className={classes.root}>
      <Chip isActive={true} onIsActiveChange={action('onIsActive')}>
        <div>Figma</div>
        <Badge count={10} classes={{ count: classes.count }} />
      </Chip>
      <Chip isActive={false} onIsActiveChange={action('onIsActive')}>
        <span>Adobe XD</span>
        <Badge classes={{ count: classes.count }} count={260} />
      </Chip>
    </Shell>
  );
}
