import classnames from 'classnames';
import createStyles from '@material-ui/core/styles/createStyles';
import React from 'react';
import chevronDown from 'uxt-graphics/icons/chevron-down';
import chevronUp from 'uxt-graphics/icons/chevron-up';
import hideIf from '../_helpers/hideIf';
import { UxtTheme } from '../../themes/UxtTheme';
import makeStyles from '../_helpers/makeStyles';
import Icon from '../Icon';

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {
        alignItems: 'center',
        borderTop: `1px solid ${theme.palette.divider}`,
        cursor: 'pointer',
        display: 'flex',
        flex: '0 0 auto',
        height: theme.height.item,
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        position: 'relative',
        '&::after': {
          ...theme.mixins.absoluteFill,
          backgroundColor: 'transparent',
          content: '""',
          display: 'block',
          pointerEvents: 'none',
          transition: 'background-color 0.1s ease',
        },
        '&:hover::after': {
          backgroundColor: theme.palette.action.hover,
        },
        '&:active::after': {
          backgroundColor: theme.palette.action.disabled,
        },
      },
      text: {
        flex: '1 1 auto',
        fontWeight: 500,
      },
      chevron: {
        flex: '0 0 auto',
        marginRight: theme.spacing(-1),
      },
      disabled: {
        cursor: 'auto',
        '&:hover::after': {
          backgroundColor: 'transparent',
        },
        '&:active::after': {
          backgroundColor: 'transparent',
        },
      },
    }),
  { name: 'UxtExpanderHeader' },
);

export interface ExpanderHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  classes?: object;
  isDisabled?: boolean;
  isOpen?: boolean;
  onIsOpenChange?: (isOpen: boolean, e: MouseEvent) => void;
  text?: string;
}

const ExpanderHeader = React.forwardRef(function ExpanderHeader(
  props: ExpanderHeaderProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const {
    className,
    classes: classesProp,
    isDisabled,
    isOpen,
    onIsOpenChange,
    text,
    ...rest
  } = props;
  const classes = useStyles(props);

  const handleClick = React.useCallback(
    function handleClick(e) {
      if (isDisabled) return;

      onIsOpenChange(!isOpen, e);
    },
    [isDisabled, isOpen, onIsOpenChange],
  );

  return (
    <div
      className={classnames(
        classes.root,
        { [classes.disabled]: isDisabled },
        className,
      )}
      onClick={handleClick}
      ref={ref}
      {...rest}
    >
      <div className={classes.text}>{text}</div>
      {hideIf(isDisabled)(
        <Icon
          className={classes.chevron}
          size="small"
          svg={isOpen ? chevronUp : chevronDown}
        />,
      )}
    </div>
  );
});

export default React.memo(ExpanderHeader);
