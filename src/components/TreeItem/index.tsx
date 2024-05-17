import createStyles from '@material-ui/core/styles/createStyles';
import classnames from 'classnames';
import isEmpty from 'lodash/fp/isEmpty';
import React from 'react';
import chevronDown from 'uxt-graphics/icons/chevron-down';
import chevronRight from 'uxt-graphics/icons/chevron-right';
import { UxtTheme } from '../../themes/UxtTheme';
import Checkbox from '../Checkbox';
import type { IconProps } from '../Icon';
import Icon from '../Icon';
import ListItemAction, { ListItemActionAction } from '../ListItemAction';
import makeStyles from '../_helpers/makeStyles';
import safeGet from '../_helpers/safeGet';
import showIf from '../_helpers/showIf';

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        cursor: 'pointer',
        position: 'relative',
        height: (props: TreeItemProps) => props.height || theme.height.item,
        '&::after': {
          ...theme.mixins.absoluteFill,
          backgroundColor: 'transparent',
          content: '""',
          display: 'block',
          pointerEvents: 'none',
          transition: 'background-color 0.1s ease',
          height: (props: TreeItemProps) => props.height || theme.height.item,
        },
        '&:hover::after': {
          backgroundColor: theme.palette.action.hover,
          height: (props: TreeItemProps) => props.height || theme.height.item,
        },
        '&:active::after': {
          backgroundColor: theme.palette.action.disabled,
          height: (props: TreeItemProps) => props.height || theme.height.item,
        },
      },
      minWidth: { minWidth: (props: TreeItemProps) => props.minItemWidth },
      checkbox: {},
      checkboxBox: { transition: 'none' },
      checkboxCheck: { transition: 'none' },
      chevron: {
        height: 48,
        opacity: 0,
        width: 48,
      },
      collapsible: {
        opacity: 1,
      },
      icon: {
        marginLeft: -theme.spacing(1),
        marginRight: theme.spacing(1),
      },
      text: {
        display: 'flex',
        flex: '1 1 auto',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      },
      action: {
        marginRight: -theme.spacing(1),
      },
      actionOpen: {
        '&::after': {
          backgroundColor: theme.palette.action.hover,
          height: '100%',
        },
      },
      selected: {
        backgroundColor:
          theme.palette.type === 'light'
            ? '#C4D8F0 !important'
            : '#154986 !important', // this is needed as the transparencies on one another lead to darkening of colors
      },
      overflow: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'sticky',
        right: 0,
        backgroundColor: theme.palette.background.paper,
        width: 'auto', //theme.height.item,
        height: '100%',
        paddingRight: ({ action }: TreeItemProps) =>
          theme.spacing(action ? 0 : 1),
      },
      treeItem: {
        alignItems: 'center',
        display: 'flex',
        height: (props: TreeItemProps) => props.height || theme.height.item,
        overflow: 'hidden',
        paddingRight: theme.spacing(2),
        position: 'relative',
        width: '100%',
      },
      dropValid: {
        cursor: 'pointer',
        borderTop: `2px solid ${theme.palette.primary.main}`,
      },
      dropInvalid: {
        cursor: 'not-allowed',
        borderTop: 'initial',
      },
      indent: {
        paddingLeft: (props: TreeItemProps) =>
          props.depth * theme.spacing(3) || 0,
      },
    }),
  { name: 'UxtTreeItem' },
);

interface Item {
  [key: string]: any;
}

export interface TreeItemProps extends React.HTMLAttributes<HTMLDivElement> {
  action?: ListItemActionAction;
  actionsContainer?: React.ReactNode | ((item: Item) => React.ReactNode);
  actionIconSvg?: string;
  areActionsPersistentOnScroll?: boolean;
  childrenProperty?: string;
  className?: string;
  classes?: object;
  depth?: number;
  expanderIconProps?: Partial<IconProps>;
  height?: number;
  iconSvgAccessor?: string | ((item: Item) => string);
  index?: number;
  isCollapsed?: boolean;
  isDroppable?: boolean | undefined;
  isIndeterminate?: boolean;
  isSelected?: boolean;
  item?: Item;
  minItemWidth?: number;
  onCheckboxClick?: (
    item: Item,
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => void;
  onContentClick?: (
    item: Item,
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => void;
  onIsCollapsedToggle?: (item: Item) => void;
  selectionMode?: 'single' | 'multiple';
  style?: React.CSSProperties;
  textAccessor?: string | ((item: Item) => string);
}

const TreeItem = React.forwardRef(function TreeItem(
  props: TreeItemProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const {
    action,
    actionsContainer,
    actionIconSvg,
    areActionsPersistentOnScroll = true,
    childrenProperty = 'children',
    className,
    classes: classesProp,
    depth,
    expanderIconProps,
    height,
    iconSvgAccessor,
    index,
    isCollapsed,
    isDroppable,
    isIndeterminate,
    isSelected = false,
    item,
    minItemWidth,
    onCheckboxClick,
    onContentClick,
    onIsCollapsedToggle,
    selectionMode = 'single' as const,
    textAccessor = 'text',
    ...rest
  } = props;
  const classes = useStyles(props);
  const [isActionOpen, setIsActionOpen] = React.useState<boolean>(false);

  const isDropdownVisible = React.useMemo(
    (): boolean => !isEmpty(safeGet([], childrenProperty, item)),
    [childrenProperty, item],
  );

  const handleCheckboxClick = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (onCheckboxClick) onCheckboxClick(item, e);
    },
    [item, onCheckboxClick],
  );

  const handleContentClick = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>): void => {
      if (onContentClick) onContentClick(item, e);
    },
    [item, onContentClick],
  );

  const handleDropdownClick = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>): void => {
      if (!isDropdownVisible) return;

      e.preventDefault();
      e.stopPropagation();

      if (onIsCollapsedToggle) onIsCollapsedToggle(item);
    },
    [isDropdownVisible, item, onIsCollapsedToggle],
  );

  const handleActionIsOpenChange = React.useCallback(
    (isOpen: boolean): void => {
      setIsActionOpen(isOpen);
    },
    [],
  );

  const getListItemAction = React.useCallback(
    (classes: string): JSX.Element => {
      return (
        <div className={classes}>
          {showIf(actionsContainer)(safeGet(null, actionsContainer, item))}
          {showIf(action)(
            <ListItemAction
              action={action}
              iconSvg={actionIconSvg}
              item={item}
              overflowButtonProps={{
                isOpen: isActionOpen,
                onIsOpenChange: handleActionIsOpenChange,
              }}
            />,
          )}
        </div>
      );
    },
    [
      handleActionIsOpenChange,
      isActionOpen,
      actionIconSvg,
      action,
      item,
      actionsContainer,
    ],
  );

  return (
    <div
      className={classnames(
        classes.root,
        {
          [classes.actionOpen]: isActionOpen && !isSelected,
          [classes.minWidth]: minItemWidth,
          [classes.selected]: isSelected,
          [classes.dropValid]: isDroppable,
          [classes.dropInvalid]: isDroppable === false,
        },
        classes.indent,
        className,
      )}
      onClick={handleContentClick}
      {...rest}
    >
      <div className={classes.treeItem}>
        <Icon
          className={classnames(classes.chevron, {
            [classes.collapsible]: isDropdownVisible,
          })}
          onClick={handleDropdownClick}
          size="small"
          svg={isCollapsed ? chevronRight : chevronDown}
          {...expanderIconProps}
        />
        {showIf(selectionMode === 'multiple')(
          <Checkbox
            className={classes.checkbox}
            classes={{
              box: classes.checkboxBox,
              check: classes.checkboxCheck,
            }}
            isActive={isSelected}
            isIndeterminate={isIndeterminate}
            onClick={handleCheckboxClick}
          />,
        )}
        {showIf(iconSvgAccessor)(
          <Icon
            className={classes.icon}
            svg={safeGet('', iconSvgAccessor, item)}
          />,
        )}
        <div className={classes.text}>{safeGet('', textAccessor, item)}</div>
        {showIf(
          !areActionsPersistentOnScroll &&
            (action || actionIconSvg || actionsContainer),
        )(() => getListItemAction(classes.action))}
      </div>
      {showIf(
        areActionsPersistentOnScroll &&
          (action || actionIconSvg || actionsContainer),
      )(() =>
        getListItemAction(
          classnames(classes.overflow, {
            [classes.selected]: isSelected,
          }),
        ),
      )}
    </div>
  );
});

export default React.memo(TreeItem);
