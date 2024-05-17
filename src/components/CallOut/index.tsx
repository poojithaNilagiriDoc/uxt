import classnames from 'classnames';
import createStyles from '@material-ui/core/styles/createStyles';
import React from 'react';
import Tooltip, { TooltipProps } from '@material-ui/core/Tooltip';
import { PopperPlacementType } from '@material-ui/core';
import { UxtTheme } from '../../themes/UxtTheme';
import makeStyles from '../_helpers/makeStyles';

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      /* Styles applied to the arrow element. */
      popper: {},
      /* Styles applied to the Popper component if `interactive={true}`. */
      popperInteractive: {},
      tooltip: {
        fontSize: `${theme.typography.body2.fontSize} !important`,
        fontStyle: `${theme.typography.body2.fontStyle} !important`,
        fontWeight: theme.typography.body2.fontWeight,
        lineHeight: `${theme.typography.body2.lineHeight} !important`,
        backgroundColor: `${theme.palette.background.paper} !important`,
        borderRadius: theme.spacing(0.5),
        color: `${theme.palette.text.primary} !important`,
        padding: '4px 8px',
        wordWrap: 'break-word',
        filter: `drop-shadow(1px 1px 2px rgba(0,0,0,0.2))`,
      },
      touch: {},
      tooltipArrow: {},
      /* Styles applied to the tooltip (label wrapper) element if `placement` contains "left". */
      tooltipPlacementLeft: {},
      /* Styles applied to the tooltip (label wrapper) element if `placement` contains "right". */
      tooltipPlacementRight: {},
      /* Styles applied to the tooltip (label wrapper) element if `placement` contains "top". */
      tooltipPlacementTop: {},
      /* Styles applied to the tooltip (label wrapper) element if `placement` contains "bottom". */
      tooltipPlacementBottom: {},
      /* Styles applied to the Popper component if `arrow={true}`. */
      popperArrow: {
        '& &[x-placement*="bottom"] $arrow': {
          top: 0,
          left: 0,
          marginTop: '-0.71em',
          marginLeft: 4,
          marginRight: 4,
          '&::before': {
            transformOrigin: '0 100%',
          },
        },
        '& &[x-placement*="top"] $arrow': {
          bottom: 0,
          left: 0,
          marginBottom: '-0.71em',
          marginLeft: 4,
          marginRight: 4,
          '&::before': {
            transformOrigin: '100% 0',
          },
        },
        '& &[x-placement*="right"] $arrow': {
          left: 0,
          marginLeft: '-0.71em',
          height: '1em',
          width: '0.71em',
          marginTop: 4,
          marginBottom: 4,
          '&::before': {
            transformOrigin: '100% 100%',
            color: theme.palette.background.paper,
          },
        },
        '& &[x-placement*="left"] $arrow': {
          right: 0,
          marginRight: '-0.71em',
          height: '1em',
          width: '0.71em',
          marginTop: 4,
          marginBottom: 4,
          '&::before': {
            transformOrigin: '0 0',
          },
        },
      },
      /* Styles applied to the arrow element. */
      arrow: {
        overflow: 'hidden',
        position: 'absolute',
        width: '1em',
        height: '0.71em' /* = width / sqrt(2) = (length of the hypotenuse) */,
        boxSizing: 'border-box',
        color: theme.palette.background.paper,
        '&::before': {
          color: theme.palette.background.paper,
        },
      },
      children: {},
      root: {},
    }),
  { name: 'UxtCallOut' },
);

export interface CallOutProps
  extends Omit<TooltipProps, 'title' | 'open' | 'children'> {
  anchorElement: React.ReactElement;
  children?: React.ReactNode;
  className?: string;
  classes?: object;
  isInteractive?: boolean;
  isOpen?: boolean;
  placement?: PopperPlacementType;
  showTooltipOnDisabledElements?: boolean;
}

const CallOut = React.forwardRef(function CallOut(
  props: CallOutProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const {
    anchorElement,
    children,
    className,
    classes: classesProp,
    isInteractive = false,
    isOpen = undefined,
    onClose,
    placement = 'bottom',
    showTooltipOnDisabledElements = false,
    ...rest
  } = props;
  const classes = useStyles(props);

  const isAnchorElementDisabled = React.useMemo(() => {
    if (
      'props' in anchorElement &&
      'isDisabled' in anchorElement['props'] &&
      anchorElement['props'].isDisabled === true
    ) {
      return true;
    }

    if (
      'props' in anchorElement &&
      'disabled' in anchorElement['props'] &&
      anchorElement['props'].disabled === true
    )
      return true;

    return false;
  }, [anchorElement]);

  const safeTitle = React.useMemo(() => {
    return <div className={classes.children}>{children}</div>;
  }, [children, classes.children]);

  // Hack for MUI Tooltip Uncontrolled to Controlled conversion problem
  const getOpenProp = React.useCallback(() => {
    let result = {};
    if (isOpen !== undefined) {
      result = {
        open: showTooltipOnDisabledElements
          ? isOpen
          : isAnchorElementDisabled
          ? false
          : isOpen,
      };
    }
    return result;
  }, [showTooltipOnDisabledElements, isOpen, isAnchorElementDisabled]);

  return (
    <Tooltip
      ref={ref}
      {...getOpenProp()}
      interactive={isInteractive}
      {...rest}
      classes={{
        popper: classes.popper,
        arrow: classes.arrow,
        popperArrow: classes.popperArrow,
        popperInteractive: classes.popperInteractive,
        tooltipArrow: classes.tooltipArrow,
        tooltipPlacementBottom: classes.tooltipPlacementBottom,
        tooltipPlacementTop: classes.tooltipPlacementTop,
        tooltipPlacementLeft: classes.tooltipPlacementLeft,
        tooltipPlacementRight: classes.tooltipPlacementRight,
        tooltip: classes.tooltip,
      }}
      className={classnames(classes.root, className)}
      onClose={onClose}
      title={safeTitle}
      placement={placement}
      arrow={true}
    >
      <div
        style={
          isAnchorElementDisabled && !showTooltipOnDisabledElements
            ? { pointerEvents: 'none' }
            : {}
        }
      >
        {anchorElement}
      </div>
    </Tooltip>
  );
});

export default React.memo(CallOut);
