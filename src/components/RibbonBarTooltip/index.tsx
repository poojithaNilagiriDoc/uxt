import React from 'react';
import createStyles from '@material-ui/core/styles/createStyles';
import classnames from 'classnames';
import { PopperPlacementType } from '@material-ui/core';
import makeStyles from '../_helpers/makeStyles';
import { UxtTheme } from '../../themes/UxtTheme';
import CallOut from '../CallOut';
import showIf from '../_helpers/showIf';

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {
        minHeight: 'auto',
        fontSize: theme.typography.caption.fontSize,
        paddingTop: theme.spacing(0.5),
        paddingRight: theme.spacing(1),
        paddingBottom: theme.spacing(0.5),
        paddingLeft: theme.spacing(1),
      },
      popperArrow: {
        '&[x-placement*="bottom"] $arrow': {
          marginTop: -theme.spacing(1),
          '&::before': {
            borderWidth: `0 6px ${theme.spacing(1)}px 6px`,
          },
        },
      },
      arrow: {},
      calloutPlacementBottom: {
        marginTop: theme.spacing(1),
        margin: 0,
      },
      disabled: {
        pointerEvents: 'none',
      },
    }),
  { name: 'UxtRibbonBarTooltip' },
);

export interface RibbonBarTooltipProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  children?: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
  className?: string;
  classes?: Record<string, string>;
  isDisabled?: boolean;
  isInteractive?: boolean;
  title?:
    | string
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>;
  placement?: PopperPlacementType;
}

const RibbonBarTooltip = React.forwardRef(function RibbonBarTooltip(
  props: RibbonBarTooltipProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const [toggleText, setToggleText] = React.useState<boolean>(false);

  const {
    className,
    classes: classesProp,
    children,
    isDisabled = false,
    isInteractive = false,
    placement = 'bottom' as const,
    title,
    ...rest
  } = props;
  const classes = useStyles(props);

  React.useEffect(() => {
    isDisabled && toggleText && setToggleText(false);
  }, [isDisabled, toggleText]);

  const element: JSX.Element = (
    <div
      onMouseEnter={() => !isDisabled && setToggleText(true)}
      onMouseLeave={() => !isDisabled && setToggleText(false)}
    >
      {children}
    </div>
  );

  return (
    <div
      className={classnames(
        classes.root,
        {
          [classes.disabled]: isDisabled,
        },
        className,
      )}
      ref={ref}
      {...rest}
    >
      {showIf(title)(
        <CallOut
          anchorElement={element}
          placement={placement}
          isInteractive={isInteractive}
        >
          {title}
        </CallOut>,
      )}
      {showIf(!title)(children)}
    </div>
  );
});

export default React.memo(RibbonBarTooltip);
