import classnames from 'classnames';
import getOr from 'lodash/fp/getOr';
import includes from 'lodash/fp/includes';
import isEmpty from 'lodash/fp/isEmpty';
import isUndefined from 'lodash/fp/isUndefined';
import map from 'lodash/fp/map';
import reduce from 'lodash/fp/reduce';
import some from 'lodash/fp/some';
import uniq from 'lodash/fp/uniq';
import without from 'lodash/fp/without';
import createStyles from '@material-ui/core/styles/createStyles';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {
  ListOnScrollProps,
  FixedSizeList,
  ListChildComponentProps,
} from 'react-window';
import { AutoSizer } from 'react-virtualized';
import hideIf from '../_helpers/hideIf';
import showIf from '../_helpers/showIf';
import safeGet from '../_helpers/safeGet';
import toggleInArray from '../_helpers/toggleInArray';
import makeStyles from '../_helpers/makeStyles';
import { ListItemActionAction } from '../ListItemAction';
import TreeItem from '../TreeItem';
import type { IconProps } from '../Icon';
import type { UxtTheme } from '../../themes/UxtTheme';
import sanitize from '../_helpers/sanitize';

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {
        backgroundColor: theme.palette.background.paper,
        flex: '1 0 auto',
        flexDirection: 'column',
        display: 'flex',
        overscrollBehavior: 'contain',
      },
      items: {
        overflow: 'auto !important',
      },
      item: {},
      internalScrollEnabled: {
        flex: '1 1 auto',
      },
    }),
  { name: 'UxtTreeList' },
);
interface Item {
  [key: string]: any;
}
type RowType = {
  item: Item;
  depth: number | undefined;
};
type TextAccessor<T> = ((props: T) => React.ReactNode) | ((item: T) => string);

export interface TreeListProps<T = Item>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onScroll'> {
  action?: ListItemActionAction;
  actionsContainer?: React.ReactNode;
  actionIconSvg?: string;
  childrenProperty?: string;
  className?: string;
  classes?: object;
  defaultCollapsed?: boolean;
  expandOnSelect?: boolean;
  expanderIconProps?: Partial<IconProps>;
  expanderIconPropsAccessor?: string | ((item: Item) => string);
  iconSvgAccessor?: string | ((item: Item) => string);
  idAccessor?: string | ((item: Item) => string | number);
  isCollapsedAccessor?: string | ((item: Item) => string);
  isInternalScrollEnabled?: boolean;
  isSelectDeep?: boolean;
  itemComponent?: string | React.FC<any> | React.ComponentClass<any, any>;
  items?: Array<Item>;
  onItemIsCollapsedChange?: (item: Item, isCollapsed: boolean) => void;
  onItemsChange?: (items: Array<Item>) => void;
  onScroll?: (scrollArgs: ListOnScrollProps) => void;
  onSelectedIdChange?: (selectedId: number | string) => void;
  onSelectedItemChange?: (selectedItem: Item) => void;
  onSelectedIdsChange?: (selectedId: Array<number | string>) => void;
  onSelectedItemsChange?: (selectedItem: Array<Item>) => void;
  rowHeight?: number | ((index: number) => number);
  selectedId?: number | string;
  selectedIds?: Array<number | string>;
  selectedItem?: Item;
  selectedItems?: Array<Item>;
  selectionMode?: 'single' | 'multiple';
  areActionsPersistentOnScroll?: boolean;
  textAccessor?: string | TextAccessor<T>;
}
export interface TreeListMethods {
  scrollToRow?: (index: number) => void;
}
const TreeList = React.forwardRef(function TreeList(
  props: TreeListProps,
  ref: React.Ref<TreeListMethods>,
) {
  const {
    action,
    actionsContainer,
    actionIconSvg,
    childrenProperty = 'children',
    className,
    classes: classesProp,
    defaultCollapsed = true,
    expandOnSelect,
    expanderIconProps,
    expanderIconPropsAccessor = 'expanderIconProps',
    iconSvgAccessor,
    idAccessor = 'id',
    isCollapsedAccessor = 'isCollapsed',
    isInternalScrollEnabled = true,
    isSelectDeep,
    itemComponent = TreeItem,
    items = [],
    onItemIsCollapsedChange,
    onItemsChange,
    onScroll = () => {},
    onSelectedIdChange = () => {},
    onSelectedItemChange = () => {},
    onSelectedIdsChange = () => {},
    onSelectedItemsChange = () => {},
    rowHeight = 48,
    selectedId = '',
    selectedIds = [],
    selectedItem = {},
    selectedItems = [],
    selectionMode = 'single' as const,
    areActionsPersistentOnScroll = true,
    textAccessor,
    ...rest
  } = props;
  const classes = useStyles(props);
  const itemsRef = React.useRef<FixedSizeList>();
  const [toggledItems, setToggledItems] = React.useState<Array<Item>>([]);

  const getIsCollapsed = React.useCallback(
    (item: Item) => {
      const isCollapsed: boolean | undefined = safeGet(
        undefined,
        isCollapsedAccessor,
        item,
      );

      if (!isUndefined(isCollapsed)) return isCollapsed;

      if (includes(item, toggledItems)) return !defaultCollapsed;

      return defaultCollapsed;
    },
    [defaultCollapsed, isCollapsedAccessor, toggledItems],
  );

  const rows = React.useMemo((): Array<RowType> => {
    function flattenToRows(depth, xs = []) {
      return reduce(
        (acc, cur) => {
          const next = { item: cur, depth };
          const children = getIsCollapsed(cur)
            ? []
            : flattenToRows(depth + 1, getOr([], `${childrenProperty}`, cur));
          return [...acc, next, ...children];
        },
        [],
        xs,
      );
    }
    return flattenToRows(0, items);
  }, [childrenProperty, getIsCollapsed, items]);

  const minItemWidth = React.useMemo((): number => {
    if (rows && rows.length > 0) {
      const minWidth: number = rows.reduce((acc: number, cur: RowType) => {
        const depth: number = cur.depth;
        let textAccessorWidth: number = 0;
        let textAccessorElement: React.ReactElement<any>;
        let actionContainerWidth: number = 0;

        if (typeof textAccessor === 'string') {
          const textValue: string = safeGet('', textAccessor, cur.item);

          textAccessorElement = <div>{textValue}</div>;
        } else {
          textAccessorElement = textAccessor(
            cur?.item,
          ) as React.ReactElement<any>;
        }
        const actionsContainerElement = safeGet(
          null,
          actionsContainer,
          cur.item,
        ) as React.ReactElement<any>;

        if (textAccessorElement || actionsContainerElement) {
          const div: HTMLDivElement = document.createElement('div');
          const htmlString: string =
            ReactDOMServer.renderToStaticMarkup(textAccessorElement);
          const actionsContainerString: string =
            ReactDOMServer.renderToStaticMarkup(actionsContainerElement);

          div.setAttribute(
            'style',
            `display:flex; flex: 0 0 auto; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;`,
          );

          div.innerHTML = sanitize(htmlString + actionsContainerString);
          document.body.appendChild(div);

          textAccessorWidth = Number(
            window.getComputedStyle(div.children[0]).width.split('px')[0],
          );

          if (actionsContainer)
            actionContainerWidth =
              Number(
                window.getComputedStyle(div.children[1]).width.split('px')[0],
              ) + (action ? 0 : 8); // Padding-right: 8px;

          div.remove();
        }

        const totalNonTextWidth: number =
          depth * 24 + // Depth padding
          (iconSvgAccessor ? 48 : 0) + // Icon with right margin
          (selectionMode === 'multiple' ? 33 : 0) + // Checkbox with right margin
          +(iconSvgAccessor && selectionMode === 'multiple' ? -8 : 0) + // Reduce 8px if they are both true as the 8px is already accounted for in both
          (action || actionIconSvg ? 64 : 16) + // 16px for the right side text margin and 48px for ListItemAction
          48 +
          actionContainerWidth; // Probable need for this is to accommodate for leaf items as isDropdownVisible will return false and we set opacity to 0 for chevron
        const totalTreeItemWidth: number = Math.ceil(
          textAccessorWidth + totalNonTextWidth,
        );

        return acc > totalTreeItemWidth ? acc : totalTreeItemWidth;
      }, 0);

      return minWidth;
    }
  }, [
    action,
    actionsContainer,
    actionIconSvg,
    childrenProperty,
    iconSvgAccessor,
    rows,
    selectionMode,
    textAccessor,
  ]);

  const getIsItemSelected = React.useCallback(
    (item: Item): boolean => {
      const id = safeGet('', idAccessor, item);

      if ((selectedId === 0 || !!selectedId) && selectedId === id) return true;

      if (selectedItem === item) return true;

      if ((id === 0 || !!id) && includes(id, selectedIds)) return true;

      if (includes(item, selectedItems)) return true;

      return false;
    },
    [idAccessor, selectedId, selectedIds, selectedItem, selectedItems],
  );

  const getFlattenedItem = React.useCallback(
    (item: Item): Array<Item> => flatten(item, [], childrenProperty),
    [childrenProperty],
  );

  const getSelection = React.useCallback(
    (item: Item): Array<Item> => {
      if (!isSelectDeep || isEmpty(item[childrenProperty])) return [item];

      return getFlattenedItem(item);
    },
    [childrenProperty, getFlattenedItem, isSelectDeep],
  );

  const handleItemCheckboxClick = React.useCallback(
    (item: Item): void => {
      const selection = getSelection(item);
      const ids = map(safeGet(undefined, idAccessor), selection);
      const nextSelectedIds = !some(x => !includes(x, selectedIds), ids)
        ? without(ids, selectedIds)
        : uniq([...selectedIds, ...ids]);
      const nextSelectedItems = !some(
        x => !includes(x, selectedItems),
        selection,
      )
        ? without(selection, selectedItems)
        : uniq([...selectedItems, ...selection]);
      onSelectedIdsChange(nextSelectedIds);
      onSelectedItemsChange(nextSelectedItems);
    },
    [
      getSelection,
      idAccessor,
      onSelectedIdsChange,
      onSelectedItemsChange,
      selectedIds,
      selectedItems,
    ],
  );

  const handleItemIsCollapsedToggle = React.useCallback(
    (item: Item): void => {
      if (onItemsChange) {
        const isCollapsed = !safeGet(
          defaultCollapsed,
          isCollapsedAccessor,
          item,
        );
        const nextItem = { ...item, isCollapsed };
        const mapItem = x => (x === item ? nextItem : x);

        onItemsChange(softMap(mapItem, items));

        if (onItemIsCollapsedChange) {
          onItemIsCollapsedChange(item, isCollapsed);
        }

        return;
      }

      const isCollapsed = includes(item, toggledItems)
        ? defaultCollapsed
        : !defaultCollapsed;

      if (onItemIsCollapsedChange) {
        onItemIsCollapsedChange(item, isCollapsed);
      }

      setToggledItems(toggleInArray(item, toggledItems));
    },
    [
      defaultCollapsed,
      isCollapsedAccessor,
      items,
      onItemIsCollapsedChange,
      onItemsChange,
      toggledItems,
    ],
  );

  const handleSelect = React.useCallback(
    (item: Item): void => {
      const id = safeGet('', idAccessor, item);

      if (selectionMode !== 'single' && getIsItemSelected(item)) return;

      onSelectedIdChange(id);
      onSelectedItemChange(item);
    },
    [
      getIsItemSelected,
      idAccessor,
      onSelectedIdChange,
      onSelectedItemChange,
      selectionMode,
    ],
  );
  const handleItemContentClick = React.useCallback(
    (item: Item) => {
      if (selectionMode === 'multiple') {
        handleItemCheckboxClick(item);
      } else {
        handleSelect(item);
      }

      if (expandOnSelect) {
        handleItemIsCollapsedToggle(item);
      }
    },
    [
      expandOnSelect,
      handleItemCheckboxClick,
      handleItemIsCollapsedToggle,
      handleSelect,
      selectionMode,
    ],
  );
  const handleItemsScroll = React.useCallback(
    (scrollArgs: ListOnScrollProps) => {
      if (itemsRef.current) itemsRef.current.scrollTo(scrollArgs.scrollOffset);
      onScroll(scrollArgs);
    },
    [onScroll],
  );

  const renderRow = React.useCallback(
    ({ index, style }, width: number = 0) => {
      const depth = getOr(0, `[${index}].depth`, rows);
      const item = getOr(0, `[${index}].item`, rows);

      return React.createElement(itemComponent, {
        action,
        actionsContainer,
        actionIconSvg,
        areActionsPersistentOnScroll: areActionsPersistentOnScroll,
        childrenProperty,
        className: classes.item,
        depth,
        expanderIconProps: safeGet(
          expanderIconProps,
          expanderIconPropsAccessor,
          item,
        ),
        height: rowHeight,
        iconSvgAccessor,
        index,
        item,
        isCollapsed: getIsCollapsed(item),
        isSelected: getIsItemSelected(item),
        key: safeGet(index, idAccessor, item),
        minItemWidth: minItemWidth > width ? minItemWidth : width,
        onCheckboxClick: handleItemCheckboxClick,
        onContentClick: handleItemContentClick,
        onIsCollapsedToggle: handleItemIsCollapsedToggle,
        selectionMode,
        style: { ...style, width: 'auto' }, // width auto is needed for the horizontal scrollbar
        textAccessor,
      });
    },
    [
      action,
      actionsContainer,
      actionIconSvg,
      childrenProperty,
      expanderIconProps,
      expanderIconPropsAccessor,
      getIsCollapsed,
      getIsItemSelected,
      handleItemCheckboxClick,
      handleItemContentClick,
      handleItemIsCollapsedToggle,
      iconSvgAccessor,
      idAccessor,
      itemComponent,
      rowHeight,
      rows,
      selectionMode,
      areActionsPersistentOnScroll,
      textAccessor,
      minItemWidth,
    ],
  );

  React.useImperativeHandle(
    ref,
    () => ({
      // TODO: Change to scrollToItem in v8 uxt-react
      scrollToRow: index => {
        itemsRef?.current?.scrollToItem(index);
      },
    }),
    [],
  );

  return (
    <div
      className={classnames(
        classes.root,
        { [classes.internalScrollEnabled]: !isInternalScrollEnabled },
        className,
      )}
      {...rest}
    >
      {showIf(isInternalScrollEnabled)(
        <AutoSizer>
          {({ height, width }) => (
            <FixedSizeList
              className={classes.items}
              height={height}
              onScroll={handleItemsScroll}
              ref={itemsRef}
              itemCount={rows.length}
              itemSize={safeGet(48, () => rowHeight, this)}
              width={width}
              itemData={rows}
            >
              {(props: ListChildComponentProps) => {
                return renderRow(props, width);
              }}
            </FixedSizeList>
          )}
        </AutoSizer>,
      )}
      {hideIf(isInternalScrollEnabled)(() => (
        <div className={classes.items}>
          {rows.map((_, index) => renderRow({ style: {}, index }))}
        </div>
      ))}
    </div>
  );
});

export default React.memo(TreeList);

function flatten(item, accumulatedItems = [], childrenProperty) {
  const flatChildren = !isEmpty(item[childrenProperty])
    ? item[childrenProperty].reduce(
        (acc, cur) => flatten(cur, acc, childrenProperty),
        [],
      )
    : [];
  return accumulatedItems.concat([item]).concat(flatChildren);
}

export function softMap(iteratee, xs, metadata = {}) {
  return map(
    x => ({
      ...iteratee(x, metadata),
      children: softMap(iteratee, x.children, {
        parent: x,
      }),
    }),
    xs,
  );
}
