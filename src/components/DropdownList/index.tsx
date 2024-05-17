import findIndex from 'lodash/fp/findIndex';
import find from 'lodash/fp/find';
import isEmpty from 'lodash/fp/isEmpty';
import isNil from 'lodash/fp/isNil';
import noop from 'lodash/fp/noop';
import classnames from 'classnames';
import Popover from '@material-ui/core/Popover';
import React from 'react';
import chevronDown from 'uxt-graphics/icons/chevron-down';
import chevronUp from 'uxt-graphics/icons/chevron-up';
import startsWith from 'lodash/fp/startsWith';
import includes from 'lodash/fp/includes';
import isFunction from 'lodash/fp/isFunction';
import isEqual from 'lodash/fp/isEqual';
import throttle from 'lodash/fp/throttle';
import { FixedSizeList as List, Align } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import type { PopperPlacementType } from '@material-ui/core';
import { AutoSizer } from 'react-virtualized';
import showIf from '../_helpers/showIf';
import safeGet from '../_helpers/safeGet';
import DropdownChoice, { DropdownChoiceProps } from '../DropdownChoice';
import Input from '../Input';
import ListItem from '../ListItem';
import Position from '../constants/position';
import getTextWidth from '../_helpers/getTextWidth';
import Icon from '../Icon';
import getPath from '../_helpers/getPath';
import hideIf from '../_helpers/hideIf';
import KeyBinder from '../_internal/KeyBinder';
import toLowerCase from '../_helpers/toLowerCase';
import { styles } from './styles';

export type TextAccessor<T> =
  | string
  | ((props: T) => React.ReactNode)
  | ((item: T) => string);
export type ValueAccessor = string | ((item: any) => string);
export type ItemDisableAccessor = string | ((item: any) => string);
export type Items = Array<any>;
export type Comparator<T> = (value1: T, value2: T) => number;
export type SortDirection = 'asc' | 'desc';

type HtmlDivElementProps = Omit<
  React.HTMLProps<HTMLDivElement>,
  | 'children'
  | 'style'
  | 'onClick'
  | 'size'
  | 'action'
  | 'ref'
  | 'data'
  | 'target'
>;

export interface DropdownListProps<T = any>
  extends React.HTMLAttributes<HTMLDivElement>,
    HtmlDivElementProps {
  allowCustomValue?: boolean;
  children?: React.ReactNode;
  className?: string;
  classes?: object;
  disableAction?: boolean;
  enableInfiniteLoading?: boolean;
  actionText?: string;
  actionPosition?: Position.Bottom | Position.Top;
  enableFirstLetterSelection?: boolean;
  filter?: (item: any, inputValue: string) => boolean;
  helperText?: string;
  hasMoreItems?: boolean | (() => boolean);
  loadMoreItems?: (...args: Array<unknown>) => void;
  areItemsLoading?: boolean | (() => boolean);
  inputComponent?: string | React.FC<any> | React.ComponentClass<any, any>;
  invalidText?: string;
  isDisabled?: boolean;
  isInvalid?: boolean;
  isItemDisabled?: boolean;
  itemDisabledAccessor?: ItemDisableAccessor;
  noMatchesFoundText?: string;
  isMinWidthEnabled?: boolean;
  isOpen?: boolean;
  isPopupFittedToInput?: boolean;
  isSearchable?: boolean;
  isSortable?: boolean;
  items?: Items;
  keepLabelRaised?: boolean;
  label?: string;
  loadingIndicatorComponent?: React.ReactNode;
  onActionClick?: () => void;
  onInputValueChange?: (
    value?: string,
    e?: React.ChangeEvent<HTMLInputElement>,
  ) => void;
  onIsOpenChange?: (isOpen: boolean) => void;
  onValueChange?: (value: any) => void;
  placeholder?: string;
  popupHorizontal?: 'center' | 'left' | 'right';
  popupMaxWidth?: React.CSSProperties['width'];
  popupMaxHeight?: React.CSSProperties['height'];
  popupVertical?: 'bottom' | 'center' | 'top';
  sortComparator?: Comparator<T>;
  sortDirection?: SortDirection;
  targetHorizontal?: 'center' | 'left' | 'right';
  targetVertical?: 'bottom' | 'center' | 'top';
  text?: string;
  textAccessor?: TextAccessor<T>;
  value?: any;
  valueAccessor?: ValueAccessor;
  minimumBatchSize?: number;
  loadingIndicatorTooltipText?: string | undefined;
  tooltipComponent?:
    | string
    | React.ReactElement<any>
    | React.FC<any>
    | React.ComponentClass<any, any>;
  tooltipPlacement?: PopperPlacementType;
  showTooltipComponentOnDisabledElements?: boolean;
}

function DropdownList(props: DropdownListProps) {
  const {
    allowCustomValue = false,
    children = [],
    className,
    classes: classesProp,
    disableAction = false,
    actionText,
    actionPosition = Position.Bottom,
    filter,
    helperText,
    enableInfiniteLoading = false,
    hasMoreItems = false,
    areItemsLoading = false,
    loadMoreItems,
    loadingIndicatorComponent,
    loadingIndicatorTooltipText = 'Loading',
    inputComponent = Input,
    invalidText,
    isItemDisabled,
    itemDisabledAccessor = x => x,
    noMatchesFoundText = "We didn't find any matches.",
    isDisabled,
    isInvalid,
    isMinWidthEnabled = true,
    isOpen: isOpenProp = false,
    isPopupFittedToInput = true,
    isSearchable = false,
    items = [],
    isSortable = false,
    keepLabelRaised = false,
    label = '',
    minimumBatchSize,
    onActionClick,
    onInputValueChange,
    onIsOpenChange,
    onValueChange,
    placeholder,
    popupHorizontal = 'left' as const,
    popupMaxHeight = 200,
    popupMaxWidth,
    popupVertical = 'top' as const,
    sortComparator,
    sortDirection = 'asc' as const,
    targetHorizontal = 'left' as const,
    targetVertical = 'bottom' as const,
    text,
    textAccessor = x => x,
    value,
    valueAccessor = x => x,
    enableFirstLetterSelection = true,
    tooltipComponent: TooltipComponent,
    tooltipPlacement = 'right' as const,
    ...rest
  } = props;
  const classes = styles(props);
  const [inputEl, setInputEl] = React.useState(undefined);
  const [isOpen, setIsOpen] = React.useState<boolean>(isOpenProp);
  const [editableInputValue, setEditableInputValue] =
    React.useState<string>(undefined);
  const [newItems, setNewItems] = React.useState<Items>(items);
  const [noMatchesFound, setNoMatchesFound] = React.useState<boolean>(false);
  const listRef: React.MutableRefObject<List> = React.useRef();
  const [isFocused, setIsFocused] = React.useState<boolean>(false);
  const [outlineEl, setOutlineEl] =
    React.useState<React.MutableRefObject<HtmlDivElementProps>>();

  const handleCustomValue = React.useCallback(
    function handleCustomValue(): void {
      if (value) return;

      if (newItems && newItems.length === 0) {
        if (allowCustomValue) {
          onValueChange(editableInputValue);
          setEditableInputValue(editableInputValue);
        } else setEditableInputValue(undefined);
      }
    },
    [allowCustomValue, editableInputValue, newItems, onValueChange, value],
  );

  const allowInputEdit = React.useMemo(
    (): boolean =>
      isSearchable ||
      allowCustomValue ||
      filter ||
      !isEqual(inputComponent, Input)
        ? true
        : false,
    [allowCustomValue, filter, inputComponent, isSearchable],
  );

  const handleClose = React.useCallback(
    function handleClose(): void {
      if (allowInputEdit) handleCustomValue();

      if (!onIsOpenChange) {
        setIsOpen(false);
        return;
      }

      onIsOpenChange(false);
    },
    [allowInputEdit, handleCustomValue, onIsOpenChange],
  );

  const getInputComponent = React.useMemo(
    (): boolean => isEqual(inputComponent, Input) && allowInputEdit,
    [allowInputEdit, inputComponent],
  );

  const handleChoiceSelect = React.useCallback(
    function handleChoiceSelect(value: any, text?: string): void {
      onValueChange(value);

      if (getInputComponent) setEditableInputValue(text);
      handleClose();
    },
    [getInputComponent, handleClose, onValueChange],
  );

  const getAccessor = React.useCallback(function getAccessor(
    accessor: any,
    item: DropdownChoiceProps,
  ): any {
    return safeGet(undefined, accessor, item);
  },
  []);

  const defaultSortComparator: Comparator<any> = React.useCallback(
    (item1: any, item2: any): number => {
      const textProp: any = children ? 'props.text' : textAccessor;
      const item1Text: string = safeGet('', textProp, item1);
      const item2Text: string = safeGet('', textProp, item2);

      return item1Text.localeCompare(item2Text);
    },
    [children, textAccessor],
  );

  const getSortedItems = React.useCallback(
    (
      items: Items | Array<React.ReactChild>,
    ): Items | Array<React.ReactChild> => {
      return sortComparator
        ? items.sort(sortComparator)
        : sortDirection === 'desc'
        ? items.sort(defaultSortComparator).reverse()
        : items.sort(defaultSortComparator);
    },
    [defaultSortComparator, sortComparator, sortDirection],
  );

  const sortAndSetNewItems = React.useCallback(
    (items: Items): void => {
      isSortable ? setNewItems(getSortedItems(items)) : setNewItems(items);
    },
    [getSortedItems, isSortable],
  );

  const getChoices = React.useMemo((): Items => {
    return React.Children.toArray(children).map(
      (child: React.ReactElement<any>) => ({
        isItemDisabled: child.props.isItemDisabled,
        text: child.props.text,
        value: child.props.value,
      }),
    );
  }, [children]);

  const getDropdownChoiceProps = React.useCallback(
    function getDropdownChoiceProps({
      accessor = valueAccessor,
      value = 'value',
      item,
    }: {
      accessor?: TextAccessor<[string]> | ValueAccessor;
      value?: string;
      item: DropdownChoiceProps;
    }): any {
      return isFunction(accessor) && !(items.length > 0)
        ? getAccessor(value, item)
        : getAccessor(accessor, item);
    },
    [getAccessor, items.length, valueAccessor],
  );

  const safeChildren = React.useCallback(
    (style?: React.CSSProperties): JSX.Element[] => {
      if (!noMatchesFound && isEmpty(newItems)) {
        const safeChildren = React.Children.toArray(children).map(
          (child: React.ReactElement<any>) =>
            React.cloneElement(child, {
              key: value,
              onSelect: handleChoiceSelect,
              selectedValue: value,
              style: style,
            }),
        );

        return isSortable ? getSortedItems(safeChildren) : safeChildren;
      }

      const mappedItems: Items = newItems.map((item: DropdownChoiceProps) => (
        <DropdownChoice
          isItemDisabled={getDropdownChoiceProps({
            accessor: itemDisabledAccessor,
            value: 'isItemDisabled',
            item,
          })}
          key={value}
          onSelect={handleChoiceSelect}
          selectedValue={value}
          text={getDropdownChoiceProps({
            accessor: textAccessor,
            value: 'text',
            item,
          })}
          value={getDropdownChoiceProps({ item })}
          style={style}
          tooltipComponent={TooltipComponent}
          tooltipPlacement={tooltipPlacement}
          item={item}
        />
      ));

      return isSortable ? getSortedItems(mappedItems) : mappedItems;
    },
    [
      children,
      getDropdownChoiceProps,
      getSortedItems,
      handleChoiceSelect,
      isSortable,
      itemDisabledAccessor,
      newItems,
      noMatchesFound,
      textAccessor,
      value,
      TooltipComponent,
      tooltipPlacement,
    ],
  );

  const choices = React.useMemo(
    () => React.Children.map(safeChildren(), (c: JSX.Element) => c.props),
    [safeChildren],
  );

  const selectedChoice = React.useMemo(
    () => find({ value }, choices) || {},
    [choices, value],
  );

  const inputValue = React.useMemo((): string => {
    if (!isNil(selectedChoice.text)) return selectedChoice.text;

    if (!isNil(editableInputValue)) return editableInputValue;

    if (!isNil(text)) return text;

    return '';
  }, [editableInputValue, selectedChoice.text, text]);

  const handleOpen = React.useCallback(
    function handleOpen(): void {
      if (isDisabled) return;

      if (!onIsOpenChange) {
        setIsOpen(true);
        return;
      }

      onIsOpenChange(true);
    },
    [isDisabled, onIsOpenChange],
  );

  const handleInputClick = React.useCallback(
    function handleInputClick(e: React.MouseEvent): void {
      e.preventDefault();
      e.stopPropagation();

      isEmpty(items) && getInputComponent
        ? sortAndSetNewItems(getChoices)
        : sortAndSetNewItems(items);

      setNoMatchesFound(false);

      return handleOpen();
    },
    [getChoices, getInputComponent, handleOpen, sortAndSetNewItems, items],
  );

  const handleInputRefChange = React.useCallback(function handleInputRefChange(
    ref,
  ): void {
    setInputEl(ref);
  },
  []);

  const handleWrapperEnterKeyDown = React.useCallback(
    function handleWrapperEnterKeyDown(): void {
      isOpen ? handleClose() : handleOpen();
    },
    [handleClose, handleOpen, isOpen],
  );

  const selectedIndex = React.useMemo(
    (): number => findIndex({ value }, choices),
    [choices, value],
  );

  const scrollToItem = (index: number, align: Align = 'smart'): void =>
    listRef.current && listRef.current.scrollToItem(index, align);

  const selectNextChoice = React.useCallback(
    function selectNextChoice(e: React.KeyboardEvent<HTMLElement>) {
      e.preventDefault();

      let nextChoice = undefined;

      for (let i = selectedIndex + 1; i < choices.length; i++) {
        if (choices[i] && !(choices[i].isItemDisabled === true)) {
          nextChoice = choices[i];
          break;
        }
      }
      if (!nextChoice) return;

      if (getInputComponent) setEditableInputValue(nextChoice.text);
      onValueChange(nextChoice.value);
      scrollToItem(selectedIndex + 1);
    },
    [choices, getInputComponent, onValueChange, selectedIndex],
  );

  const selectPreviousChoice = React.useCallback(
    function selectPreviousChoice(e: React.KeyboardEvent<HTMLElement>) {
      e.preventDefault();

      let previousChoice = undefined;

      for (let i = selectedIndex - 1; i >= 0; i--) {
        if (choices[i] && !(choices[i].isItemDisabled === true)) {
          previousChoice = choices[i];
          break;
        }
      }
      if (!previousChoice) return;
      if (getInputComponent) setEditableInputValue(previousChoice.text);
      onValueChange(previousChoice.value);
      scrollToItem(selectedIndex - 1);
    },
    [choices, getInputComponent, onValueChange, selectedIndex],
  );

  React.useEffect((): void => {
    setIsOpen(isOpenProp);
  }, [isOpenProp]);

  React.useEffect((): void => {
    if (isOpen) {
      window?.requestAnimationFrame((): void => {
        scrollToItem(selectedIndex, 'center');
      });
    }
  }, [isOpen, selectedIndex, scrollToItem]);

  const getFilteredItems = React.useCallback(
    function getFilteredItems(
      isDisabled: boolean,
      text: string,
      key: any,
      value: string,
    ): boolean {
      if (!(isDisabled === true) || !isDisabled) {
        if (toLowerCase(value) === toLowerCase(text)) {
          handleChoiceSelect(key, text);
          // `setIsOpen()` is called because in `handleChoiceSelect()` event handleClose() is called and it'll close the popUp.
          setIsOpen(true);
        }
        return includes(toLowerCase(value), toLowerCase(text));
      }
      return null;
    },
    [handleChoiceSelect],
  );

  const handleOnValueChange = React.useCallback(
    throttle(300, function handleOnValueChange(value: string) {
      if (onInputValueChange) onInputValueChange(value);

      setEditableInputValue(value);

      if (!isOpen) handleOpen();
      let filteredItems: Items = [];
      const choices: Items = isEmpty(items) ? getChoices : items;

      if (!value) {
        sortAndSetNewItems(choices);
        setNoMatchesFound(false);
        return onValueChange(undefined);
      }

      if (filter) {
        filteredItems = choices.filter((item: DropdownChoiceProps) =>
          filter(item, value),
        );

        setNoMatchesFound(filteredItems.length < 1);
        sortAndSetNewItems(filteredItems);

        return;
      }

      if (allowCustomValue) {
        scrollToItem(
          choices.findIndex(
            (item: DropdownChoiceProps) => item.text === value,
          ) + 1,
        );
      }

      filteredItems = choices.filter((item: DropdownChoiceProps) =>
        getFilteredItems(
          getAccessor(
            isEmpty(items) ? 'isItemDisabled' : itemDisabledAccessor,
            item,
          ),
          getAccessor(isEmpty(items) ? 'text' : textAccessor, item),
          getAccessor(isEmpty(items) ? 'value' : valueAccessor, item),
          value,
        ),
      );

      if (isSearchable) {
        setNoMatchesFound(filteredItems.length < 1);
        sortAndSetNewItems(filteredItems);
      }

      if (filteredItems.length < 1) {
        allowCustomValue ? onValueChange(value) : onValueChange(undefined);
      }
    }),
    [
      filter,
      getAccessor,
      getChoices,
      getFilteredItems,
      handleOpen,
      isOpen,
      isSearchable,
      itemDisabledAccessor,
      items,
      onInputValueChange,
      onValueChange,
      sortAndSetNewItems,
      textAccessor,
      valueAccessor,
    ],
  );

  const handleKeyUp = React.useCallback(
    function handleKeyUp(e: React.KeyboardEvent): void {
      const keyString: string = String.fromCharCode(e.keyCode);
      let matchedItems: Items = [];

      if (isEmpty(items)) {
        matchedItems = getChoices.filter(
          (item: DropdownChoiceProps) =>
            !item.isItemDisabled &&
            startsWith(toLowerCase(keyString), toLowerCase(item.text)),
        );
      } else {
        matchedItems = items.filter(
          (item: DropdownChoiceProps) =>
            (!item[itemDisabledAccessor.toString()] ||
              item[itemDisabledAccessor.toString()] === undefined) &&
            startsWith(toLowerCase(keyString), toLowerCase(item.text)),
        );
      }

      const index: number = findIndex({ value }, matchedItems);
      const matchingItem: DropdownChoiceProps = matchedItems[index + 1]
        ? matchedItems[index + 1]
        : matchedItems[0];

      if (matchingItem) {
        const selectedIndex: number = choices.findIndex(
          (item: DropdownChoiceProps) => item.value === matchingItem.value,
        );

        onValueChange(matchingItem.value);
        scrollToItem(selectedIndex + 1, 'center');
      }
    },
    [choices, getChoices, itemDisabledAccessor, items, onValueChange, value],
  );

  const handleOnFocus = React.useCallback(
    function handleOnFocus(
      e: React.FocusEvent<HTMLInputElement>,
    ): boolean | void {
      if (allowInputEdit) return getInputComponent ? e.target.select() : false;
      setIsFocused(true);
    },
    [allowInputEdit, getInputComponent],
  );

  const handleDetailsButtonClick = React.useCallback(
    function handleDetailsButtonClick(): void {
      if (onActionClick) onActionClick();
      handleClose();
    },
    [handleClose, onActionClick],
  );

  const getAction = React.useCallback(
    function getAction(): React.ReactNode {
      return (
        <ListItem
          className={classes.actionPosition}
          primaryTextAccessor={() => actionText}
          isDisabled={disableAction}
          onSelect={handleDetailsButtonClick}
        />
      );
    },
    [
      classes.actionPosition,
      disableAction,
      handleDetailsButtonClick,
      actionText,
    ],
  );

  const handleOnBlur = React.useCallback(
    function handleOnBlur(): void {
      if (isSearchable || allowCustomValue) handleCustomValue();
      setIsFocused(false);
    },
    [allowCustomValue, handleCustomValue, isSearchable],
  );

  React.useEffect(() => {
    if (items && items.length > 0) {
      setNewItems(items);
    }
  }, [items]);

  const handleSelectedChoice = React.useCallback(
    function handleSelectedChoice(): void {
      if (getInputComponent) onValueChange(undefined);
    },
    [getInputComponent, onValueChange],
  );

  const listHeight = React.useMemo((): React.CSSProperties['height'] => {
    const length: number = safeChildren().length;

    return length > 4
      ? typeof popupMaxHeight === 'string'
        ? parseInt(popupMaxHeight)
        : popupMaxHeight
      : length * 48;
  }, [popupMaxHeight, safeChildren]);

  const isLabelRaised = React.useMemo(
    (): boolean =>
      keepLabelRaised
        ? true
        : label && (value === 0 || value === '' || value || text)
        ? true
        : false,

    [keepLabelRaised, label, text, value],
  );

  const handleOutlineRefChange = React.useCallback(
    function handleOutlineRefChange(ref): void {
      setOutlineEl(ref);
    },
    [],
  );

  const getOutlinePathData = React.useCallback(
    function getOutlinePathData({ height, width }): string {
      const notchWidth: number = isLabelRaised
        ? getTextWidth('12px Roboto', label)
        : 0;

      return getPath(notchWidth, outlineEl, height, width);
    },
    [isLabelRaised, label, outlineEl],
  );

  const popupWidth = React.useMemo((): React.CSSProperties['width'] => {
    if (isPopupFittedToInput && inputEl) return inputEl.offsetWidth;

    if (popupMaxWidth) return popupMaxWidth;

    const items: JSX.Element[] = safeChildren();

    if (items && items.length > 0 && inputEl) {
      const width: React.CSSProperties['width'] =
        getTextWidth(
          '16px Roboto',
          safeChildren().reduce((a: JSX.Element, b: JSX.Element) =>
            getTextWidth('16px Roboto', a.props.text) >
            getTextWidth('16px Roboto', b.props.text)
              ? a
              : b,
          ).props.text,
        ) + 48;
      return width > inputEl.offsetWidth ? width : inputEl.offsetWidth;
    }
  }, [popupMaxWidth, isPopupFittedToInput, inputEl, safeChildren]);

  const itemCount = React.useMemo(() => {
    if (newItems?.length)
      return (
        (enableInfiniteLoading && hasMoreItems
          ? newItems.length + 1
          : newItems.length) || newItems.length
      );
    const safeChildrenLength = safeChildren().length;
    return hasMoreItems ? safeChildrenLength + 1 : safeChildrenLength;
  }, [enableInfiniteLoading, hasMoreItems, newItems]);

  const isItemLoaded = React.useCallback(
    index => {
      return !hasMoreItems || index < safeChildren().length;
    },
    [hasMoreItems, safeChildren],
  );

  const handleLoadMoreItems = React.useCallback(
    (startIndex: number, stopIndex: number): void | Promise<void> => {
      return safeGet(false, () => areItemsLoading, this)
        ? new Promise<void>(noop)
        : loadMoreItems(startIndex, stopIndex);
    },
    [hasMoreItems, loadMoreItems, areItemsLoading],
  );

  const safeLoadingIndicator = React.useMemo(
    () =>
      loadingIndicatorComponent || <div className={classes.loadingIndicator} />,
    [loadingIndicatorComponent, classes],
  );

  const Row = React.useCallback(
    ({ index, style }) => {
      if (!isItemLoaded(index) && enableInfiniteLoading) {
        return (
          <DropdownChoice
            text={safeLoadingIndicator}
            value="Loading"
            item={null}
            style={style}
            title={loadingIndicatorTooltipText}
            tooltipComponent={null}
          />
        );
      }
      return safeChildren(style)[index];
    },
    [
      enableInfiniteLoading,
      isItemLoaded,
      safeChildren,
      safeLoadingIndicator,
      loadingIndicatorTooltipText,
    ],
  );

  const listWithInfiniteLoader = (
    <InfiniteLoader
      isItemLoaded={isItemLoaded}
      itemCount={itemCount}
      loadMoreItems={handleLoadMoreItems}
      minimumBatchSize={minimumBatchSize}
    >
      {({ onItemsRendered, ref }) => (
        <List
          itemCount={itemCount}
          onItemsRendered={onItemsRendered}
          height={listHeight}
          itemSize={48}
          itemData={safeChildren()}
          width={popupWidth}
          ref={ref}
        >
          {Row}
        </List>
      )}
    </InfiniteLoader>
  );

  const listWithoutInfiniteLoader = (
    <List
      itemCount={safeChildren().length}
      height={listHeight}
      itemSize={48}
      itemData={safeChildren()}
      width={popupWidth}
      ref={listRef}
    >
      {Row}
    </List>
  );

  const ListComponent = enableInfiniteLoading
    ? listWithInfiniteLoader
    : listWithoutInfiniteLoader;

  return (
    <div
      className={classnames(
        classes.root,
        { [classes.minWidthEnabled]: isMinWidthEnabled },
        className,
      )}
      {...rest}
    >
      <KeyBinder
        onDownArrowKeyDown={selectNextChoice}
        onEnterKeyDown={handleWrapperEnterKeyDown}
        onEscapeKeyDown={handleClose}
        onUpArrowKeyDown={selectPreviousChoice}
        onBackspaceKeyDown={handleSelectedChoice}
        onDeleteKeyDown={handleSelectedChoice}
        onTabKeyDown={handleClose}
      >
        <div className={classes.wrapper} tabIndex={isDisabled ? -1 : 0}>
          <div
            className={classes.inputWrapper}
            onClick={handleInputClick}
            onKeyUp={
              !enableFirstLetterSelection || isSearchable || allowCustomValue
                ? undefined
                : handleKeyUp
            }
          >
            {showIf(allowInputEdit)(
              React.createElement(inputComponent, {
                autoComplete: 'off',
                className: classes.input,
                classes: {
                  input: classes.input,
                  disabled: classes.inputDisabled,
                  readOnly: classes.inputReadOnly,
                  icon: classes.icon,
                },
                helperText: helperText,
                iconSvg: isOpen ? chevronUp : chevronDown,
                inputRef: handleInputRefChange,
                invalidText: invalidText,
                isDisabled: isDisabled,
                isInvalid: isInvalid,
                label: label,
                onFocus: handleOnFocus,
                onBlur: handleOnBlur,
                onValueChange: handleOnValueChange,
                placeholder: placeholder || text || '',
                type: 'text',
                value: inputValue,
              }),
            )}

            {showIf(!allowInputEdit)(() => (
              <div
                className={classnames(
                  {
                    [classes.inputDisabled]: isDisabled,
                    [classes.focused]: isFocused,
                    [classes.hasIcon]: true,
                    [classes.labelRaised]: isLabelRaised,
                    [classes.invalid]: isInvalid,
                  },
                  className,
                )}
              >
                <div className={classes.input}>
                  <div
                    className={classes.unEditableInput}
                    tabIndex={0}
                    ref={handleInputRefChange}
                    onFocus={handleOnFocus}
                    onBlur={handleOnBlur}
                  >
                    {inputValue}
                    {showIf(label)(() => (
                      <div className={classes.label}>{label}</div>
                    ))}
                    {showIf(!inputValue)(() => (
                      <div className={classes.placeholder}>
                        {isLabelRaised ? undefined : placeholder}
                      </div>
                    ))}
                  </div>
                  <Icon
                    className={classes.icon}
                    size="small"
                    svg={isOpen ? chevronUp : chevronDown}
                  />
                  <AutoSizer>
                    {({ height, width }) => (
                      <div
                        className={classes.outline}
                        ref={handleOutlineRefChange}
                      >
                        <svg height={height} width={width}>
                          <path
                            className={classes.outlinePath}
                            d={getOutlinePathData({ height, width })}
                          />
                        </svg>
                      </div>
                    )}
                  </AutoSizer>
                </div>
                <div className={classes.helperText}>
                  {hideIf(isInvalid && invalidText)(helperText)}
                  {showIf(isInvalid && invalidText)(invalidText)}
                </div>
              </div>
            ))}
          </div>
          {showIf(inputEl)(() => (
            <Popover
              anchorEl={inputEl}
              anchorOrigin={{
                horizontal: targetHorizontal,
                vertical: targetVertical,
              }}
              disableAutoFocus={true}
              disableEnforceFocus={true}
              marginThreshold={0}
              onClose={handleClose}
              open={isOpen}
              PaperProps={{
                style: {
                  width: popupWidth,
                },
              }}
              transformOrigin={{
                horizontal: popupHorizontal,
                vertical: popupVertical,
              }}
            >
              {showIf(
                actionText && onActionClick && actionPosition === Position.Top,
              )(getAction())}
              <div
                className={classes.choices}
                onMouseDown={e => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
              >
                {ListComponent}
                {(isSearchable || filter) && noMatchesFound && (
                  <p
                    className={classes.noMatchesFoundText}
                    title={noMatchesFoundText}
                  >
                    {noMatchesFoundText}
                  </p>
                )}
              </div>
              {showIf(
                actionText &&
                  onActionClick &&
                  actionPosition === Position.Bottom,
              )(getAction())}
            </Popover>
          ))}
        </div>
      </KeyBinder>
    </div>
  );
}

export default React.memo(DropdownList);
