import classnames from 'classnames';
import isEmpty from 'lodash/fp/isEmpty';
import createStyles from '@material-ui/core/styles/createStyles';
import React from 'react';
import chevronRight from 'uxt-graphics/icons/chevron-right';
import showIf from '../_helpers/showIf';
import { UxtTheme } from '../../themes/UxtTheme';
import makeStyles from '../_helpers/makeStyles';
import Icon from '../Icon';

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {
        alignItems: 'center',
        cursor: 'pointer',
        display: 'flex',
        flex: '0 0 auto',
        flexDirection: 'row',
        height: theme.height.item,
        paddingLeft: theme.spacing(2),
        position: 'relative',
        width: '100%',
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
      icon: {
        marginLeft: theme.spacing(-1),
        marginRight: theme.spacing(0.5),
      },
      text: {
        flex: '1 1 auto',
        overflow: 'hidden',
        paddingRight: theme.spacing(2),
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      },
      chevron: {},
      disabled: {
        pointerEvents: 'none',
        opacity: 0.5,
      },
      separator: {
        ...theme.typography.caption,
        color: theme.palette.text.secondary,
        fontWeight: theme.typography.fontWeightMedium,
        borderTop: `1px solid ${theme.palette.divider}`,
        pointerEvents: 'none',
      },
    }),
  { name: 'UxtMenuItem' },
);

type DivAttributesWithoutOnSelect = {
  [K in Exclude<
    keyof React.HTMLAttributes<HTMLDivElement>,
    'onSelect'
  >]?: React.HTMLAttributes<HTMLDivElement>[K];
};

export interface MenuItemProps extends DivAttributesWithoutOnSelect {
  className?: string;
  classes?: object;
  isSeparator?: boolean;
  item?: MenuItem;
  onSelect?: (item: MenuItem, e: MouseEvent) => void;
  iconSvg?: string;
  text?: string;
}

export interface MenuItem {
  action?: (...actionArguments: Array<any>) => void;
  children?: MenuItem[];
  iconSvg?: string;
  isSeparator?: boolean;
  disabled?: boolean;
  text?: string;
  [key: string]: any;
  siblingHasIcon?: boolean;
}

const MenuItemComponent = React.forwardRef(function MenuItem(
  props: MenuItemProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const {
    className,
    classes: classesProp,
    isSeparator = false,
    text,
    iconSvg,
    item,
    onSelect,
    ...rest
  } = props;
  const classes = useStyles(props);
  const safeIconSvg: string | undefined = item?.iconSvg || iconSvg;
  const safeText: string | undefined = item?.text || text;

  const handleClick = React.useCallback(
    function handleClick(e) {
      if (!onSelect) return;
      onSelect(item, e);
    },
    [item, onSelect],
  );

  return (
    <div
      className={classnames(
        classes.root,
        { [classes.separator]: isSeparator, [classes.disabled]: item.disabled },
        className,
      )}
      onClick={handleClick}
      title={item.text}
      ref={ref}
      {...rest}
    >
      {showIf(iconSvg || item.siblingHasIcon)(() => (
        <Icon className={classes.icon} svg={safeIconSvg} />
      ))}
      <div className={classes.text}>{safeText}</div>
      {showIf(!isSeparator && !isEmpty(item.children))(() => (
        <Icon className={classes.chevron} size="small" svg={chevronRight} />
      ))}
    </div>
  );
});

export default React.memo(MenuItemComponent);
