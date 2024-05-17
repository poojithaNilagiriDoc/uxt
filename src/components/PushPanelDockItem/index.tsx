import React from 'react';
import classnames from 'classnames';
import createStyles from '@material-ui/core/styles/createStyles';
import showIf from '../_helpers/showIf';
import makeStyles from '../_helpers/makeStyles';
import safeGet from '../_helpers/safeGet';
import { UxtTheme } from '../../themes/UxtTheme';
import Icon from '../Icon';

interface Item {
  [key: string]: any;
}

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {
        borderRadius: theme.shape.borderRadius,
        margin: theme.spacing(0.25),
        padding: theme.spacing(0.25),
        cursor: (props: PushPanelDockItemProps) =>
          props.onIsActiveChange ? 'pointer' : 'auto',
        width: 'max-content',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'start',
        alignItems: 'center',
      },
      active: {
        fill: theme.palette.text.link,
        background: theme.palette.action.selected,
      },
      icon: {},
    }),
  {
    name: 'UxtPushPanelDockItem',
  },
);

export interface PushPanelDockItemProps<T = Item>
  extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  classes?: Record<string, string>;
  iconComponent?: React.ElementType;
  isActive?: boolean;
  onIsActiveChange?: (item: Item) => void;
  item?: T;
  iconSize?: 'large' | 'regular' | 'small' | number;
  iconSvg?: string;
  iconSvgAccessor?: string | ((item: T) => string);
  panelContent?: React.ReactNode;
}

const PushPanelDockItem = React.forwardRef(function PushPanelDockItem(
  props: PushPanelDockItemProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const {
    className,
    classes: classesProp,
    item,
    isActive = false,
    onIsActiveChange,
    iconSvgAccessor = 'iconSvg',
    iconSize = 20,
    children,
    iconSvg = safeGet('', iconSvgAccessor, item),
    iconComponent: IconComponent = Icon,
    panelContent,
    ...rest
  } = props;
  const classes = useStyles(props);

  const handleClick = React.useCallback(
    function (e: React.MouseEvent) {
      if (onIsActiveChange) onIsActiveChange(item);
    },
    [item, onIsActiveChange],
  );

  return (
    <div
      ref={ref}
      className={classnames(
        classes.root,
        { [classes.active]: isActive },
        className,
      )}
      onClick={handleClick}
      {...rest}
    >
      {showIf(iconSvg)(
        <IconComponent
          className={classes.icon}
          size={iconSize}
          svg={iconSvg}
        />,
      )}
      {children}
    </div>
  );
});

export default React.memo(PushPanelDockItem);
