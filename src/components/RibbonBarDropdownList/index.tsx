import Popover from '@material-ui/core/Popover';
import createStyles from '@material-ui/core/styles/createStyles';
import classnames from 'classnames';
import find from 'lodash/fp/find';
import findIndex from 'lodash/fp/findIndex';
import includes from 'lodash/fp/includes';
import isEmpty from 'lodash/fp/isEmpty';
import isFunction from 'lodash/fp/isFunction';
import isNil from 'lodash/fp/isNil';
import startsWith from 'lodash/fp/startsWith';
import throttle from 'lodash/fp/throttle';
import React from 'react';
import { Align, FixedSizeList as List } from 'react-window';
import chevronDown from 'uxt-graphics/icons/chevron-down';
import { UxtTheme } from '../../themes/UxtTheme';
import RibbonBarType from '../constants/ribbonBarType';
import DropdownChoice, { DropdownChoiceProps } from '../DropdownChoice';
import RibbonBarIconButton from '../RibbonBarIconButton';
import getTextWidth from '../_helpers/getTextWidth';
import makeStyles from '../_helpers/makeStyles';
import safeGet from '../_helpers/safeGet';
import showIf from '../_helpers/showIf';
import toLowerCase from '../_helpers/toLowerCase';
import KeyBinder from '../_internal/KeyBinder';

const ITEM_HEIGHT = 32;

const styles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {
        width: 128,
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: theme.shape.borderRadius,
        height: ({ appearance }: RibbonBarDropdownListProps) =>
          appearance === 'classic' ? 24 : 28,
      },
      input: {
        cursor: 'pointer',
        width: 110,
        height: 28,
        backgroundColor: 'transparent',
        color: theme.palette.text.primary,
        border: 'none',
        paddingLeft: theme.spacing(0.5),
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        '&::selection': {
          background: theme.palette.action.disabled,
        },
      },
      placeholder: {
        color: theme.palette.text.secondary,
        pointerEvents: 'none',
        position: 'inherit',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
      choices: {
        overflowY: 'auto',
        maxHeight: '90vh',
      },
      minWidthEnabled: {
        minWidth: 160,
      },
      item: {
        height: ITEM_HEIGHT,
      },
      icon: {
        width: 16,
        height: 28,
        borderRadius: 0,
        '&::after': {
          width: 16,
          height: 28,
          borderRadius: 0,
        },
      },
      wrapper: {
        display: 'flex',
      },
      selected: {
        backgroundColor: theme.palette.divider,
      },
    }),
  { name: 'UxtRibbonBarDropdownList' },
);

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

const ribbonBarTypeArray = Object.values(RibbonBarType);

type AllRibbonBarTypes = typeof ribbonBarTypeArray[number];
export type RibbonBarTypes = AllRibbonBarTypes;

export interface RibbonBarDropdownListProps<T = any>
  extends React.HTMLAttributes<HTMLDivElement>,
    HtmlDivElementProps {
  appearance?: RibbonBarTypes;
  children?: React.ReactNode;
  className?: string;
  classes?: Record<string, string>;
  filter?: (item: any, inputValue: string) => boolean;
  items?: Items;
  itemDisabledAccessor?: ItemDisableAccessor;
  isDisabled?: boolean;
  isItemDisabled?: boolean;
  isOpen?: boolean;
  isSeparator?: boolean;
  isSortable?: boolean;
  onIsOpenChange?: (isOpen: boolean) => void;
  onValueChange?: (value: any) => void;
  placeholder?: string;
  separateAccessor?: string | ((item: any) => string);
  sortComparator?: Comparator<T>;
  sortDirection?: SortDirection;
  showFilterItems?: boolean;
  text?: string;
  textAccessor?: TextAccessor<T>;
  value?: any;
  valueAccessor?: ValueAccessor;
}

function RibbonBarDropdownList(props: RibbonBarDropdownListProps) {
  const {
    children = [],
    className,
    classes: classesProp,
    filter,
    isItemDisabled,
    itemDisabledAccessor = x => x,
    isDisabled,
    isSeparator,
    isOpen: isOpenProp = false,
    items = [],
    isSortable = false,
    onIsOpenChange,
    onValueChange,
    placeholder,
    showFilterItems = true,
    separateAccessor = 'isSeparator',
    sortComparator,
    sortDirection = 'asc' as const,
    text,
    textAccessor = x => x,
    value,
    valueAccessor = x => x,
    ...rest
  } = props;
  const classes = styles(props);
  const [inputEl, setInputEl] = React.useState<HTMLInputElement>(undefined);
  const [isOpen, setIsOpen] = React.useState<boolean>(isOpenProp);
  const [editableInputValue, setEditableInputValue] =
    React.useState<string>(undefined);
  const [newItems, setNewItems] = React.useState<Items>(items);
  const listRef: React.MutableRefObject<List> = React.useRef();

  const handleCustomValue = React.useCallback((): void => {
    if (value) return;

    onValueChange(editableInputValue);
    setEditableInputValue(editableInputValue);
  }, [editableInputValue, onValueChange, value]);

  const handleClose = React.useCallback((): void => {
    if (!onIsOpenChange) {
      setIsOpen(false);
      return;
    }

    onIsOpenChange(false);
  }, [handleCustomValue, onIsOpenChange]);

  const handleChoiceSelect = React.useCallback(
    (value: any, isOpen: boolean = false): void => {
      onValueChange(value);

      if (!isOpen) handleClose();
    },
    [handleClose, onValueChange],
  );

  const getAccessor = React.useCallback(
    (accessor: any, item: DropdownChoiceProps): any => {
      return safeGet(undefined, accessor, item);
    },
    [],
  );

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
        style: child.props.style,
        isSeparator: child.props.isSeparator,
      }),
    );
  }, [children]);

  const getDropdownChoiceProps = React.useCallback(
    ({
      accessor = valueAccessor,
      value = 'value',
      item,
    }: {
      accessor?: TextAccessor<[string]> | ValueAccessor;
      value?: string;
      item: DropdownChoiceProps;
    }): any => {
      return isFunction(accessor) && !(items.length > 0)
        ? getAccessor(value, item)
        : getAccessor(accessor, item);
    },
    [getAccessor, items.length, valueAccessor],
  );

  const safeChildren = React.useCallback(
    (style?: React.CSSProperties): JSX.Element[] => {
      if (isEmpty(newItems)) {
        const safeChildren = React.Children.toArray(children).map(
          (child: React.ReactElement<any>) =>
            React.cloneElement(child, {
              key: value,
              onSelect: handleChoiceSelect,
              selectedValue: value,
              style: { ...style, ...child.props.style },
            }),
        );

        return isSortable ? getSortedItems(safeChildren) : safeChildren;
      }

      const mappedItems: Items = newItems.map((item: DropdownChoiceProps) => {
        return (
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
            style={{ ...style, ...item.style }}
            className={classnames(classes.item, {
              [classes.selected]: getDropdownChoiceProps({ item }) === value,
            })}
            isSeparator={safeGet('', separateAccessor, item)}
          />
        );
      });

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
      textAccessor,
      value,
      separateAccessor,
    ],
  );

  const Row = ({ index, style }) => safeChildren(style)[index];

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

  const handleOpen = React.useCallback((): void => {
    if (isDisabled) return;

    if (!onIsOpenChange) {
      setIsOpen(true);
      return;
    }

    onIsOpenChange(true);
  }, [isDisabled, onIsOpenChange]);

  const handleInputClick = React.useCallback(
    (e: React.MouseEvent): void => {
      e.preventDefault();
      e.stopPropagation();

      isEmpty(items)
        ? sortAndSetNewItems(getChoices)
        : sortAndSetNewItems(items);

      return handleOpen();
    },
    [getChoices, handleOpen, sortAndSetNewItems, items],
  );

  const handleInputRefChange = React.useCallback(
    (ref: HTMLInputElement): void => {
      setInputEl(ref);
    },
    [],
  );

  const handleWrapperEnterKeyDown = React.useCallback((): void => {
    isOpen ? handleClose() : handleOpen();
  }, [handleClose, handleOpen, isOpen]);

  const selectedIndex = React.useMemo(
    (): number => findIndex({ value }, choices),
    [choices, value],
  );

  const scrollToItem = (index: number, align: Align = 'smart'): void =>
    listRef.current && listRef.current.scrollToItem(index, align);

  const selectNextChoice = React.useCallback(
    (e: React.KeyboardEvent<HTMLElement>) => {
      e.preventDefault();

      let nextChoice = undefined;

      for (let i = selectedIndex + 1; i < choices.length; i++) {
        const choice: DropdownChoiceProps = choices[i];

        if (
          choice &&
          !(choice.isItemDisabled === true || choice.isSeparator === true)
        ) {
          nextChoice = choices[i];
          break;
        }
      }
      if (!nextChoice) return;

      setEditableInputValue(nextChoice.text);
      onValueChange(nextChoice.value);
      scrollToItem(selectedIndex + 1);
    },
    [choices, onValueChange, selectedIndex],
  );

  const selectPreviousChoice = React.useCallback(
    (e: React.KeyboardEvent<HTMLElement>) => {
      e.preventDefault();

      let previousChoice = undefined;

      for (let i = selectedIndex - 1; i >= 0; i--) {
        const choice: DropdownChoiceProps = choices[i];

        if (
          choice &&
          !(choice.isItemDisabled === true || choice.isSeparator === true)
        ) {
          previousChoice = choices[i];
          break;
        }
      }
      if (!previousChoice) return;
      setEditableInputValue(previousChoice.text);
      onValueChange(previousChoice.value);
      scrollToItem(selectedIndex - 1);
    },
    [choices, onValueChange, selectedIndex],
  );

  React.useEffect(() => {
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
    (isDisabled: boolean, text: string, key: any, value: string): boolean => {
      if (!(isDisabled === true) || !isDisabled) {
        if (toLowerCase(value) === toLowerCase(text)) {
          handleChoiceSelect(key, true);
        }
        return includes(toLowerCase(value), toLowerCase(text));
      }
      return null;
    },
    [handleChoiceSelect],
  );

  const handleOnValueChange = React.useCallback(
    throttle(300, (event: React.ChangeEvent<HTMLInputElement>): void => {
      const inputValue = event.target.value;

      if (!isOpen) handleOpen();

      setEditableInputValue(inputValue);
      let filteredItems: Items = [];
      const choices: Items = isEmpty(items) ? getChoices : items;

      if (!inputValue) {
        sortAndSetNewItems(choices);
        return onValueChange(undefined);
      }

      if (filter) {
        filteredItems = choices.filter((item: DropdownChoiceProps) =>
          filter(item, inputValue),
        );
        sortAndSetNewItems(filteredItems);

        return;
      }

      scrollToItem(
        choices.findIndex(
          (item: DropdownChoiceProps) => item.text === inputValue,
        ) + 1,
      );

      filteredItems = choices.filter((item: DropdownChoiceProps) =>
        getFilteredItems(
          getAccessor(
            isEmpty(items) ? 'isItemDisabled' : itemDisabledAccessor,
            item,
          ),
          getAccessor(isEmpty(items) ? 'text' : textAccessor, item),
          getAccessor(isEmpty(items) ? 'value' : valueAccessor, item),
          inputValue,
        ),
      );
      if (showFilterItems) sortAndSetNewItems(filteredItems);
      if (filteredItems.length < 1) onValueChange(undefined);
    }),
    [
      showFilterItems,
      isOpen,
      handleOpen,
      filter,
      getAccessor,
      getChoices,
      getFilteredItems,
      itemDisabledAccessor,
      items,
      onValueChange,
      sortAndSetNewItems,
      textAccessor,
      valueAccessor,
    ],
  );

  React.useEffect(() => {
    if (items && items.length > 0) {
      setNewItems(items);
    }
  }, [items]);

  const handleSelectedChoice = React.useCallback((): void => {
    onValueChange?.(undefined);
  }, [onValueChange]);

  const popupWidth = React.useMemo((): React.CSSProperties['width'] => {
    const items: JSX.Element[] = safeChildren();

    if (items?.length > 0 && inputEl) {
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
  }, [inputEl, safeChildren]);

  const handleKeyUp = React.useCallback(
    (e: React.KeyboardEvent): void => {
      const keyString: string = String.fromCharCode(e.keyCode);
      let matchedItems: Items = [];

      if (isEmpty(items)) {
        matchedItems = getChoices.filter(
          (item: DropdownChoiceProps) =>
            !item.isItemDisabled &&
            !item.isSeparator &&
            startsWith(toLowerCase(keyString), toLowerCase(item.text)),
        );
      } else {
        matchedItems = items.filter(
          (item: DropdownChoiceProps) =>
            (!item[itemDisabledAccessor.toString()] ||
              item[itemDisabledAccessor.toString()] === undefined) &&
            (!item[separateAccessor.toString()] ||
              item[separateAccessor.toString()] === undefined) &&
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
    [
      choices,
      getChoices,
      itemDisabledAccessor,
      items,
      onValueChange,
      value,
      separateAccessor,
    ],
  );

  return (
    <div
      className={classnames(classes.root, className)}
      onKeyUp={handleKeyUp}
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
          {React.createElement('input', {
            autoComplete: 'off',
            className: classes.input,
            ref: handleInputRefChange,
            onBlur: handleCustomValue,
            onFocus: (e: React.FocusEvent<HTMLInputElement>) =>
              e.target.select(),
            onChange: handleOnValueChange,
            placeholder: placeholder || text || '',
            type: 'text',
            value: inputValue,
          })}
          <RibbonBarIconButton
            iconSvg={chevronDown}
            iconSize={12}
            className={classes.icon}
            onClick={handleInputClick}
          />
          {showIf(inputEl)(() => (
            <Popover
              anchorEl={inputEl}
              anchorOrigin={{
                horizontal: 'left',
                vertical: 'bottom',
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
                horizontal: 'left',
                vertical: 'top',
              }}
            >
              <div
                className={classes.choices}
                onMouseDown={e => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
              >
                <List
                  itemCount={safeChildren().length}
                  height={safeChildren().length * ITEM_HEIGHT}
                  itemSize={ITEM_HEIGHT}
                  itemData={safeChildren()}
                  width={popupWidth}
                  ref={listRef}
                >
                  {Row}
                </List>
              </div>
            </Popover>
          ))}
        </div>
      </KeyBinder>
    </div>
  );
}

export default React.memo(RibbonBarDropdownList);
