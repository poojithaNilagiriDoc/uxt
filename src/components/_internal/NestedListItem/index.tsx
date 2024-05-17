import { v4 as uuid } from 'uuid';
import classnames from 'classnames';
import isEmpty from 'lodash/fp/isEmpty';
import isNil from 'lodash/fp/isNil';
import createStyles from '@material-ui/core/styles/createStyles';
import React from 'react';
import chevronDown from 'uxt-graphics/icons/chevron-down';
import chevronUp from 'uxt-graphics/icons/chevron-up';
import showIf from '../../_helpers/showIf';
import { UxtTheme } from '../../../themes/UxtTheme';
import safeGet from '../../_helpers/safeGet';
import makeStyles from '../../_helpers/makeStyles';
import Icon from '../../Icon';
import NestedListChildItem from '../../NestedListChildItem';
import type { IconProps } from '../../Icon';

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {
        flex: '0 0 auto',
        overflow: 'hidden',
      },
      content: {
        alignItems: 'center',
        backgroundColor: 'inherit',
        cursor: 'pointer',
        display: 'flex',
        height: theme?.height?.item || 48,
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
      icon: {
        marginLeft: theme.spacing(-1),
        marginRight: theme.spacing(1),
      },
      text: {
        fontSize: '1rem',
        fontWeight: 500,
      },
      chevron: {
        marginLeft: 'auto',
        marginRight: theme.spacing(-2),
      },
      childItems: {
        display: 'flex',
        flex: '0 0 auto',
        flexDirection: 'column',
        overflow: 'hidden',
      },
      childItem: {},
      selected: {
        '& $content': {
          backgroundColor: theme.palette.action.selected,
        },
      },
    }),
  { name: 'UxtNestedListItem' },
);

export interface NestedListItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  childItemComponent?: string | React.FC<any> | React.ComponentClass<any, any>;
  childrenAccessor?:
    | string
    | ((item: { [key: string]: any }) => Array<{ [key: string]: any }>);
  className?: string;
  classes?: object;
  expanderIconProps?: Partial<IconProps>;
  iconSvgAccessor?: string | ((item: { [key: string]: any }) => string);
  idAccessor?: string | ((item: { [key: string]: any }) => number | string);
  index?: number;
  isCollapsed?: boolean;
  isCollapsible?: boolean;
  isParentSelectable?: boolean;
  item?: { [key: string]: any };
  onIsCollapsedChange?: (index: number, item: { [key: string]: any }) => void;
  onSelectedIdChange?: (selectedId: number | string) => void;
  onSelectedItemChange?: (item: { [key: string]: any }) => void;
  selectedId?: number | string;
  selectedItem?: { [key: string]: any };
  textAccessor?: string | ((item: { [key: string]: any }) => string);
}

function NestedListItem(props: NestedListItemProps) {
  const {
    childItemComponent: ChildItemComponent = NestedListChildItem,
    childrenAccessor = 'children',
    className,
    classes: classesProp,
    expanderIconProps,
    iconSvgAccessor,
    idAccessor = 'id',
    index,
    isCollapsed,
    isCollapsible,
    isParentSelectable = false,
    item,
    onIsCollapsedChange,
    onSelectedIdChange,
    onSelectedItemChange,
    selectedId,
    selectedItem,
    textAccessor = 'text',
    ...rest
  } = props;
  const classes = useStyles(props);

  const children = React.useMemo(
    () => safeGet([], childrenAccessor, item),
    [childrenAccessor, item],
  );

  const isSelected = React.useMemo(() => {
    const id = safeGet('', idAccessor, item);
    return (
      item === selectedItem || (!(isNil(id) || id === '') && id === selectedId)
    );
  }, [idAccessor, item, selectedId, selectedItem]);

  const handleContentClick = React.useCallback(
    function handleContentClick() {
      const id = safeGet('', idAccessor, item);

      const canSelect: boolean = isParentSelectable ? true : isEmpty(children);

      if (canSelect) {
        if (onSelectedIdChange) {
          onSelectedIdChange(id);
        }

        if (onSelectedItemChange) {
          onSelectedItemChange(item);
        }
      }

      if (!isCollapsible) return;

      onIsCollapsedChange(index, item);
    },
    [
      children,
      idAccessor,
      index,
      isCollapsible,
      isParentSelectable,
      item,
      onIsCollapsedChange,
      onSelectedIdChange,
      onSelectedItemChange,
    ],
  );

  const handleCollapseChange = React.useCallback(
    (e: React.MouseEvent): void => {
      e.stopPropagation();
      if (!isCollapsible) return;

      onIsCollapsedChange(index, item);
    },
    [isCollapsible, index, item, onIsCollapsedChange],
  );

  return (
    <div
      className={classnames(
        classes.root,
        { [classes.selected]: isSelected },
        className,
      )}
      {...rest}
    >
      <div className={classes.content} onClick={handleContentClick}>
        {showIf(iconSvgAccessor)(() => (
          <Icon
            className={classes.icon}
            svg={safeGet('', iconSvgAccessor, item)}
          />
        ))}
        <div className={classes.text}>{safeGet('', textAccessor, item)}</div>
        {showIf(isCollapsible && !isEmpty(children))(
          <Icon
            className={classes.chevron}
            size="small"
            svg={isCollapsed ? chevronDown : chevronUp}
            onClick={handleCollapseChange}
            {...expanderIconProps}
          />,
        )}
      </div>
      <div
        className={classes.childItems}
        style={{
          height: isCollapsed && isCollapsible ? '0' : 'auto',
        }}
      >
        {children.map(child => (
          <ChildItemComponent
            className={classes.childItem}
            idAccessor={idAccessor}
            item={child}
            key={safeGet(uuid(), idAccessor, child)}
            onSelectedIdChange={onSelectedIdChange}
            onSelectedItemChange={onSelectedItemChange}
            parentHasIcon={!!safeGet('', iconSvgAccessor, item)}
            selectedId={selectedId}
            selectedItem={selectedItem}
            textAccessor={textAccessor}
          />
        ))}
      </div>
    </div>
  );
}

export default React.memo(NestedListItem);
