import classnames from 'classnames';
import isFunction from 'lodash/fp/isFunction';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Popper from '@material-ui/core/Popper';
import createStyles from '@material-ui/core/styles/createStyles';
import React from 'react';
import showIf from '../_helpers/showIf';
import { UxtTheme } from '../../themes/UxtTheme';
import makeStyles from '../_helpers/makeStyles';
import SpeedDialItem from '../_internal/SpeedDialItem';
import type { IconProps } from '../Icon';

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {},
      items: {
        alignItems: 'flex-end',
        display: 'flex',
        flexDirection: 'column',
        paddingRight: theme.spacing(1),
      },
    }),
  { name: 'UxtSpeedDial' },
);

export interface SpeedDialProps extends React.HTMLAttributes<HTMLDivElement> {
  actions?: Array<{
    action?: (e: MouseEvent) => void;
    iconSvg?: string;
    text?: string;
  }>;
  children?: (props: { fabRef: React.Ref<HTMLDivElement> }) => React.ReactNode;
  className?: string;
  classes?: object;
  iconProps?: Partial<IconProps>;
  isOpen?: boolean;
  onIsOpenChange?: (isOpen: boolean) => void;
}

function SpeedDial(props: SpeedDialProps) {
  const {
    actions = [],
    children,
    className,
    iconProps,
    isOpen = false,
    onIsOpenChange,
  } = props;
  const classes = useStyles(props);
  const [fabEl, setFabEl] = React.useState<any>();

  const childContent = React.useMemo(
    () => (isFunction(children) ? children({ fabRef: setFabEl }) : null),
    [children],
  );

  const handleClose = React.useCallback(
    function handleClose() {
      onIsOpenChange(false);
    },
    [onIsOpenChange],
  );

  const handleItemActionInvoke = React.useCallback(
    function handleItemActionInvoke() {
      onIsOpenChange(false);
    },
    [onIsOpenChange],
  );

  React.useEffect(() => {
    setTimeout(() => {
      // Temporary hack to get Material UI Popper to recalculate size after FAB grows.
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('resize'));
      }
    }, 100);
  }, [actions, children, isOpen]);

  return (
    <>
      {childContent}
      {showIf(fabEl)(() => (
        <Popper
          anchorEl={fabEl}
          className={classnames(classes.root, className)}
          open={isOpen}
          placement="top-end"
        >
          <ClickAwayListener onClickAway={handleClose}>
            <div className={classes.items}>
              {actions.map(action => (
                <SpeedDialItem
                  key={action.text}
                  onActionInvoke={handleItemActionInvoke}
                  {...action}
                  iconProps={iconProps}
                />
              ))}
            </div>
          </ClickAwayListener>
        </Popper>
      ))}
    </>
  );
}

export default React.memo(SpeedDial);
