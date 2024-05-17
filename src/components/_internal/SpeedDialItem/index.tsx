import classnames from 'classnames';
import createStyles from '@material-ui/core/styles/createStyles';
import React from 'react';
import { UxtTheme } from '../../../themes/UxtTheme';
import makeStyles from '../../_helpers/makeStyles';
import Fab from '../../Fab';
import Tooltip from '../Tooltip';
import type { IconProps } from '../../Icon';

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {
        alignItems: 'center',
        display: 'flex',
        flex: '0 0 auto',
        marginBottom: theme.spacing(2),
      },
      tooltip: {
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        marginRight: theme.spacing(2),
      },
      fab: {
        backgroundColor: theme.palette.background.paper,
        fill: theme.palette.action.active,
      },
    }),
  { name: 'UxtSpeedDialItem' },
);

export interface SpeedDialItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  action?: (e: MouseEvent) => void;
  className?: string;
  classes?: object;
  iconProps?: Partial<IconProps>;
  iconSvg?: string;
  onActionInvoke?: (e: MouseEvent) => void;
  text?: string;
}

function SpeedDialItem(props: SpeedDialItemProps) {
  const {
    action,
    className,
    classes: classesProp,
    iconProps,
    iconSvg,
    onActionInvoke,
    text,
    ...rest
  } = props;
  const classes = useStyles(props);

  const handleClick = React.useCallback(
    function handleClick(e) {
      if (action) {
        action(e);
      }

      if (onActionInvoke) {
        onActionInvoke(e);
      }
    },
    [action, onActionInvoke],
  );

  return (
    <div
      className={classnames(classes.root, className)}
      onClick={handleClick}
      {...rest}
    >
      <Tooltip className={classes.tooltip} text={text} />
      <Fab
        className={classes.fab}
        iconSvg={iconSvg}
        isMini={true}
        iconProps={iconProps}
      />
    </div>
  );
}

export default React.memo(SpeedDialItem);
