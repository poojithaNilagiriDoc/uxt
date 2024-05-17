import React from 'react';
import classnames from 'classnames';
import includes from 'lodash/fp/includes';
import createStyles from '@material-ui/core/styles/createStyles';
import type { PopperPlacementType } from '@material-ui/core';
import showIf from '../_helpers/showIf';
import safeGet from '../_helpers/safeGet';
import makeStyles from '../_helpers/makeStyles';
import ListItemAction, { ListItemActionAction } from '../ListItemAction';
import ListItemText from '../ListItemText';
import Checkbox from '../Checkbox';
import Icon from '../Icon';
import CallOut from '../CallOut';
import type { UxtTheme } from '../../themes/UxtTheme';
import isDOMTypeElement from '../_helpers/isDOMTypeElement';

export const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {
        alignItems: 'center',
        cursor: 'pointer',
        display: 'flex',
        flex: '0 0 auto',
        overflow: 'hidden',
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
      checkbox: {
        flex: '0 0 auto',
        marginRight: theme.spacing(1),
        overflow: 'hidden',
        transition: 'width 250s ease',
      },
      icon: {
        marginLeft: -theme.spacing(1),
        marginRight: theme.spacing(2) + theme.spacing(1),
      },
      picture: {
        alignSelf: 'center',
        borderRadius: 20,
        display: 'flex',
        flex: '0 0 auto',
        height: 40,
        marginLeft: 0,
        marginRight: theme.spacing(2) + theme.spacing(1),
        width: 40,
      },
      action: {
        marginRight: -theme.spacing(1),
      },
      singleLine: {
        height: theme?.height?.item || 48,
      },
      doubleLine: {
        height: 72,
      },
      tripleLine: {
        alignItems: 'flex-start',
        height: 88,
        paddingTop: theme.spacing(2),
      },
      actionOpen: {
        '&::after': {
          backgroundColor: theme.palette.action.hover,
        },
      },
      disabled: {
        opacity: 0.5,
        pointerEvents: 'none',
      },
      selected: {
        backgroundColor: theme.palette.action.selected,
      },
      textComponent: {},
      tooltip: {
        ...theme.mixins.absoluteFill,
        width: '100%',
        height: '100%',
      },
    }),
  { name: 'UxtListItem' },
);

interface Item {
  [key: string]: any;
}

type DivAttributesWithoutOnSelect = {
  [K in Exclude<
    keyof React.HTMLAttributes<HTMLDivElement>,
    'onSelect'
  >]?: React.HTMLAttributes<HTMLDivElement>[K];
};

type DivElementProps = {
  [K in Exclude<
    keyof React.HTMLProps<HTMLDivElement>,
    | 'children'
    | 'style'
    | 'onClick'
    | 'size'
    | 'action'
    | 'ref'
    | 'data'
    | 'target'
    | 'onSelect'
  >]?: React.HTMLProps<HTMLDivElement>[K];
};

type TextAccessor<T> = ((props: T) => React.ReactNode) | ((item: T) => string);

export interface ListItemProps<T = Item>
  extends DivAttributesWithoutOnSelect,
    DivElementProps {
  action?: ListItemActionAction;
  actionComponent?: string | React.FC<any> | React.ComponentClass<any, any>;
  actionIconSvg?: string;
  className?: string;
  classes?: object;
  iconComponent?: string | React.FC<any> | React.ComponentClass<any, any>;
  iconSvgAccessor?: string | ((item: Item) => string);
  isDisabled?: boolean;
  isSelected?: boolean;
  item?: T;
  onSelect?: (item: Item, e: React.PointerEvent<HTMLDivElement>) => void;
  onToggle?: (item: Item, e: React.PointerEvent<HTMLDivElement>) => void;
  pictureAccessor?: string | ((item: T) => string);
  primaryTextAccessor?: string | TextAccessor<T>;
  secondaryTextAccessor?: string | TextAccessor<T>;
  selectionMode?: 'mixed' | 'multiple' | 'single';
  tertiaryTextAccessor?: string | TextAccessor<T>;
  textComponent?: string | React.FC<any> | React.ComponentClass<any, any>;
  textComponentClasses?: Record<string, unknown>;
  type?: 'double' | 'single' | 'triple';
  tooltipComponent?:
    | string
    | React.ReactElement<any>
    | React.FC<any>
    | React.ComponentClass<any, any>;
  tooltipPlacement?: PopperPlacementType;
  showTooltipComponentOnDisabledElements?: boolean;
}

const ListItem = React.forwardRef(function ListItem(
  props: ListItemProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const {
    action,
    actionComponent: ActionComponent = ListItemAction,
    actionIconSvg,
    className,
    classes: classesProp,
    iconComponent: IconComponent = Icon,
    iconSvgAccessor,
    isDisabled,
    isSelected,
    item,
    onSelect,
    onToggle,
    pictureAccessor,
    primaryTextAccessor,
    secondaryTextAccessor,
    selectionMode,
    tertiaryTextAccessor,
    textComponent: TextComponent = ListItemText,
    textComponentClasses,
    tooltipPlacement = 'bottom' as const,
    tooltipComponent: TooltipComponent,
    showTooltipComponentOnDisabledElements = false,
    type,
    ...rest
  } = props;
  const classes = useStyles(props);
  const iconSvg = safeGet('', iconSvgAccessor, item);
  const picture = safeGet('', pictureAccessor, item);
  const primaryText = safeGet('', primaryTextAccessor, item);
  const [isActionOpen, setIsActionOpen] = React.useState(false);

  const handleActionIsOpenChange = React.useCallback(
    function handleActionIsOpenChange(isOpen) {
      setIsActionOpen(isOpen);
    },
    [],
  );

  const handleCheckboxPointerUp = React.useCallback(
    function handleCheckboxPointerUp(e) {
      e.preventDefault();
      e.stopPropagation();

      if (!onToggle) return;

      onToggle(item, e);
    },
    [item, onToggle],
  );

  const handlePointerUp = React.useCallback(
    function handlePointerUp(e: React.PointerEvent<HTMLDivElement>) {
      e.preventDefault();
      e.stopPropagation();

      if (selectionMode === 'multiple' && onToggle) {
        onToggle(item, e);
        return;
      }

      if (!onSelect) return;

      onSelect(item, e);
    },
    [item, onSelect, onToggle, selectionMode],
  );

  const handleActionComponentPointerUp = React.useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
    },
    [],
  );

  return (
    <div
      className={classnames(
        classes.root,
        {
          [classes.actionOpen]: isActionOpen && !isSelected,
          [classes.disabled]: isDisabled,
          [classes.doubleLine]: type === 'double',
          [classes.selected]: isSelected,
          [classes.singleLine]: type !== 'double' && type !== 'triple',
          [classes.tripleLine]: type === 'triple',
        },
        className,
      )}
      onPointerUp={handlePointerUp}
      ref={ref}
      title={TooltipComponent ? undefined : primaryText}
      {...rest}
    >
      {showIf(TooltipComponent)(
        <CallOut
          className={classes.tooltip}
          anchorElement={<div className={classes.tooltipAnchor} />}
          placement={tooltipPlacement}
          showTooltipOnDisabledElements={showTooltipComponentOnDisabledElements}
        >
          {TooltipComponent === null || TooltipComponent === undefined
            ? ''
            : typeof TooltipComponent === 'string'
            ? TooltipComponent
            : !isDOMTypeElement(TooltipComponent)
            ? React.createElement(
                TooltipComponent as React.ComponentType<any>,
                { ...props },
              )
            : TooltipComponent}
        </CallOut>,
      )}

      {showIf(includes(selectionMode, ['multiple', 'mixed']))(
        <Checkbox
          className={classes.checkbox}
          isActive={isSelected}
          onPointerUp={handleCheckboxPointerUp}
        />,
      )}
      {showIf(iconSvgAccessor)(
        <IconComponent className={classes.icon} svg={iconSvg} />,
      )}
      {showIf(pictureAccessor)(
        <img alt="" className={classes.picture} src={picture} />,
      )}
      <TextComponent
        className={classes.textComponent}
        classes={textComponentClasses}
        item={item}
        primaryTextAccessor={primaryTextAccessor}
        secondaryTextAccessor={secondaryTextAccessor}
        tertiaryTextAccessor={tertiaryTextAccessor}
      />
      <ActionComponent
        action={action}
        className={classes.action}
        iconSvg={actionIconSvg}
        item={item}
        onPointerUp={handleActionComponentPointerUp}
        overflowButtonProps={{
          isOpen: isActionOpen,
          onIsOpenChange: handleActionIsOpenChange,
        }}
      />
    </div>
  );
});

export default React.memo(ListItem);
