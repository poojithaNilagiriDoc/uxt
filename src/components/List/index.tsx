import createStyles from '@material-ui/core/styles/createStyles';
import classnames from 'classnames';
import includes from 'lodash/fp/includes';
import isUndefined from 'lodash/fp/isUndefined';
import noop from 'lodash/fp/noop';
import React from 'react';
import { AutoSizer } from 'react-virtualized';
import { VariableSizeList } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import { v4 as uuid } from 'uuid';
import { transparentize } from 'polished';
import type { Align, ListChildComponentProps } from 'react-window';
import { UxtTheme } from '../../themes/UxtTheme';
import ListItem from '../ListItem';
import { ListItemActionAction } from '../ListItemAction';
import hideIf from '../_helpers/hideIf';
import isFunction from '../_helpers/isFunction';
import makeStyles from '../_helpers/makeStyles';
import safeGet from '../_helpers/safeGet';
import showIf from '../_helpers/showIf';
import toggleInArray from '../_helpers/toggleInArray';

export type Items = Array<any>;

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {
        backgroundColor: 'inherit',
        display: 'flex',
        flex: '1 0 auto',
        flexDirection: 'column',
        overflow: 'hidden',
      },
      items: {
        paddingBottom: theme.spacing(1),
        paddingTop: theme.spacing(1),
      },
      item: {},
      internalScrollEnabled: {
        flex: '1 1 auto',
      },
      '@keyframes loading': {
        '100%': {
          transform: 'translateX(100%)',
        },
      },
      loadingIndicator: {
        width: '90%',
        height: theme.spacing(2),
        borderRadius: theme.spacing(2),
        position: 'relative',
        background: transparentize(0.8, theme.palette.grey[600]),
        overflow: 'hidden',
        '&::after': {
          display: 'block',
          content: '""',
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundClip: 'border-box',
          borderRadius: theme.spacing(2),
          transform: 'translateX(-100%)',
          background: `linear-gradient(90deg, transparent,${transparentize(
            0.9,
            theme.palette.grey[600],
          )}, transparent)`,
          animation: `$loading 1s infinite`,
        },

        tooltip: {},
      },
    }),
  { name: 'UxtList' },
);

interface Item {
  [key: string]: any;
}

type TextAccessor<T> = ((props: T) => React.ReactNode) | ((item: T) => string);

export interface ListProps<T = Item>
  extends React.HTMLAttributes<HTMLDivElement> {
  areItemsLoading?: boolean | (() => boolean);
  action?: ListItemActionAction;
  actionIconSvg?: string;
  className?: string;
  classes?: object;
  enableInfiniteLoading?: boolean;
  hasMoreItems?: boolean | (() => boolean);
  iconSvgAccessor?: string | ((item: Item) => string);
  idAccessor?: string | ((item: Item) => number | string);
  isInternalScrollEnabled?: boolean;
  itemComponent?: string | React.FC<any> | React.ComponentClass<any, any>;
  items?: Array<Item>;
  minimumBatchSize?: number;
  loadMoreItems?: (...args: Array<unknown>) => void;
  loadingIndicatorComponent?: React.ReactNode;
  loadingIndicatorTooltipText?: string | undefined;
  onSelectedIdChange?: (selectedId: number | string) => void;
  onSelectedIdsChange?: (selectedIds: Array<number | string>) => void;
  onSelectedItemChange?: (selectedItem: Item) => void;
  onSelectedItemsChange?: (selectedItems: Array<Item>) => void;
  pictureAccessor?: string | ((item: Item) => string);
  primaryTextAccessor?: string | TextAccessor<T>;
  rowHeight?: number | ((index: number) => number);
  secondaryTextAccessor?: string | TextAccessor<T>;
  selectedId?: number | string;
  selectedIds?: Array<number | string>;
  selectedItem?: Item;
  selectedItems?: Array<Item>;
  selectionMode?: 'mixed' | 'multiple' | 'single';
  tertiaryTextAccessor?: string | TextAccessor<T>;
  threshold?: number | undefined;
}

export interface ListMethods {
  scrollToRow?: (index: number, align?: Align) => void;
}

const List = React.forwardRef(function List(
  props: ListProps,
  ref: React.Ref<ListMethods>,
) {
  const listRef: React.MutableRefObject<VariableSizeList> = React.useRef();
  const {
    action,
    actionIconSvg,
    areItemsLoading = false,
    className,
    classes: classesProp,
    iconSvgAccessor,
    idAccessor = 'id',
    isInternalScrollEnabled = true,
    itemComponent: ItemComponent = ListItem,
    items = [],
    onSelectedIdChange = () => {},
    onSelectedIdsChange = () => {},
    onSelectedItemChange = () => {},
    onSelectedItemsChange = () => {},
    pictureAccessor,
    primaryTextAccessor,
    rowHeight: rowHeightProp,
    secondaryTextAccessor,
    selectedId = '',
    selectedIds = [],
    selectedItem = {},
    selectedItems = [],
    selectionMode = 'single' as const,
    threshold = 0,
    tertiaryTextAccessor,
    hasMoreItems = true,
    minimumBatchSize,
    loadMoreItems,
    enableInfiniteLoading = false,
    loadingIndicatorComponent,
    loadingIndicatorTooltipText = 'Loading...',
    ...rest
  } = props;
  const classes = useStyles(props);

  const getIsItemSelected = React.useCallback(
    function getIsItemSelected(item) {
      const id = safeGet('', idAccessor, item);

      if ((selectedId === 0 || !!selectedId) && selectedId === id) return true;

      if (selectedItem === item) return true;

      if ((id === 0 || !!id) && includes(id, selectedIds)) return true;

      if (includes(item, selectedItems)) return true;

      return false;
    },
    [idAccessor, selectedId, selectedIds, selectedItem, selectedItems],
  );

  const getItemKey = React.useCallback(
    function getItemKey(item) {
      return safeGet(uuid(), idAccessor, item);
    },
    [idAccessor],
  );

  const type = React.useMemo(() => {
    if (tertiaryTextAccessor) return 'triple';

    if (secondaryTextAccessor) return 'double';

    return 'single';
  }, [secondaryTextAccessor, tertiaryTextAccessor]);

  const rowHeight = React.useMemo(() => {
    if (!isUndefined(rowHeightProp)) {
      return isFunction(rowHeightProp) ? rowHeightProp : () => rowHeightProp;
    }

    if (type === 'triple') {
      return () => 88;
    }

    if (type === 'double') {
      return () => 72;
    }

    return () => 48;
  }, [rowHeightProp, type]);

  const handleSelect = React.useCallback(
    function handleSelect(item) {
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

  const handleToggle = React.useCallback(
    function handleToggle(item) {
      const id = safeGet('', idAccessor, item);

      onSelectedIdsChange(toggleInArray(id, selectedIds));

      onSelectedItemsChange(toggleInArray(item, selectedItems));
    },
    [
      idAccessor,
      onSelectedIdsChange,
      onSelectedItemsChange,
      selectedIds,
      selectedItems,
    ],
  );

  const isItemLoaded = React.useCallback(
    (index: number) => {
      return !hasMoreItems || index < items?.length;
    },
    [hasMoreItems, items],
  );

  const itemCount = React.useMemo(() => {
    if (items?.length)
      return (
        (enableInfiniteLoading && hasMoreItems
          ? items.length + 1
          : items.length) || items.length
      );
  }, [enableInfiniteLoading, hasMoreItems, items]);

  const safeLoadingIndicator = React.useMemo(
    () =>
      loadingIndicatorComponent || <div className={classes.loadingIndicator} />,
    [loadingIndicatorComponent, classes],
  );

  const Item = React.useCallback(
    ({ index, style = {} }: Partial<ListChildComponentProps>) => {
      const item = items[index];

      if (!isItemLoaded(index)) {
        return (
          <ItemComponent
            className={classes.item}
            primaryTextAccessor={() => safeLoadingIndicator}
            style={style}
            type={type}
            title={loadingIndicatorTooltipText}
          />
        );
      }

      return (
        <ItemComponent
          action={action}
          actionIconSvg={actionIconSvg}
          className={classes.item}
          iconSvgAccessor={iconSvgAccessor}
          isSelected={getIsItemSelected(item)}
          key={getItemKey(item)}
          pictureAccessor={pictureAccessor}
          primaryTextAccessor={primaryTextAccessor}
          secondaryTextAccessor={secondaryTextAccessor}
          selectionMode={selectionMode}
          onSelect={handleSelect}
          onToggle={handleToggle}
          tertiaryTextAccessor={tertiaryTextAccessor}
          item={item}
          style={style}
          type={type}
        />
      );
    },
    [
      action,
      actionIconSvg,
      classes.item,
      getIsItemSelected,
      getItemKey,
      handleSelect,
      handleToggle,
      iconSvgAccessor,
      items,
      pictureAccessor,
      primaryTextAccessor,
      secondaryTextAccessor,
      selectionMode,
      tertiaryTextAccessor,
      type,
      isItemLoaded,
      safeLoadingIndicator,
      loadingIndicatorTooltipText,
    ],
  );

  React.useImperativeHandle(
    ref,
    () => ({
      scrollToRow: (index, align = 'auto') => {
        if (!listRef.current || !listRef.current.scrollToItem) return;

        listRef.current.scrollToItem(index, align);
      },
    }),
    [],
  );

  const handleLoadMoreItems = React.useCallback(
    (startIndex: number, stopIndex: number): void | Promise<void> => {
      return safeGet(false, () => areItemsLoading, this)
        ? new Promise<void>(noop)
        : loadMoreItems(startIndex, stopIndex);
    },
    [loadMoreItems, areItemsLoading],
  );

  return (
    <div
      className={classnames(
        classes.root,
        { [classes.internalScrollEnabled]: isInternalScrollEnabled },
        className,
      )}
      {...rest}
    >
      {showIf(isInternalScrollEnabled)(() =>
        !enableInfiniteLoading ? (
          <AutoSizer>
            {({ height, width }) => (
              <VariableSizeList
                className={classes.items}
                itemSize={rowHeight}
                itemCount={itemCount}
                height={height}
                width={width}
                itemData={items}
                ref={listRef}
              >
                {Item}
              </VariableSizeList>
            )}
          </AutoSizer>
        ) : (
          <AutoSizer>
            {({ height, width }) => (
              <InfiniteLoader
                isItemLoaded={isItemLoaded}
                itemCount={itemCount}
                loadMoreItems={handleLoadMoreItems}
                minimumBatchSize={minimumBatchSize}
                threshold={threshold}
              >
                {({ onItemsRendered, ref }) => (
                  <VariableSizeList
                    className={classes.items}
                    itemSize={rowHeight}
                    itemCount={itemCount}
                    height={height}
                    width={width}
                    onItemsRendered={onItemsRendered}
                    itemData={items}
                    ref={ref}
                  >
                    {Item}
                  </VariableSizeList>
                )}
              </InfiniteLoader>
            )}
          </AutoSizer>
        ),
      )}
      {hideIf(isInternalScrollEnabled)(() => (
        <div className={classes.items}>
          {items.map((_, index) => Item({ index }))}
        </div>
      ))}
    </div>
  );
});

export default React.memo(List);
