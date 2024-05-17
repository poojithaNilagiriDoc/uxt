import { v4 as uuid } from 'uuid';
import classnames from 'classnames';
import hoistNonReactStatics from 'hoist-non-react-statics';
import endsWith from 'lodash/fp/endsWith';
import includes from 'lodash/fp/includes';
import isEmpty from 'lodash/fp/isEmpty';
import startsWith from 'lodash/fp/startsWith';
import toLower from 'lodash/fp/toLower';
import createStyles from '@material-ui/core/styles/createStyles';
import React from 'react';
import makeStyles from '../_helpers/makeStyles';
import useTheme from '../_helpers/useTheme';
import AutocompleteItem from '../_internal/AutocompleteItem';
import KeyBinder from '../_internal/KeyBinder';
import PopupInput from '../_internal/PopupInput';

function beginsWithFilter(item: string, value: string): boolean {
  if (isEmpty(value)) return false;

  return startsWith(toLower(value), toLower(item));
}

function containsFilter(item: string, value: string): boolean {
  if (isEmpty(value)) return false;

  return includes(toLower(value), toLower(item));
}

function endsWithFilter(item: string, value: string): boolean {
  if (isEmpty(value)) return false;

  return endsWith(toLower(value), toLower(item));
}

function fuzzyFilter(item: string, value: string): boolean {
  const lowerCaseItem: string = toLower(item);
  const lowerCaseValue: string = toLower(value);
  const iLen: number = lowerCaseItem.length;
  const vLen: number = lowerCaseValue.length;

  if (vLen === 0) return false;

  if (vLen > iLen) return false;

  if (vLen === iLen) {
    return lowerCaseValue === lowerCaseItem;
  }
  outer: for (let i = 0, j = 0; i < vLen; i++) {
    const nch = lowerCaseValue.charCodeAt(i);
    while (j < iLen) {
      if (lowerCaseItem.charCodeAt(j++) === nch) {
        continue outer;
      }
    }
    return false;
  }
  return true;
}

const useStyles = makeStyles(
  createStyles({
    root: {
      display: 'flex',
      flex: '0 0 auto',
      flexDirection: 'column',
    },
    input: {},
    items: {
      overflowY: 'auto',
    },
  }),
  { name: 'UxtAutocomplete' },
);

export interface AutocompleteProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  classes?: object;
  filter?: (item: string, value: string) => boolean;
  getItemComponent?: (
    suggestion: string,
    isFocused: boolean,
  ) => React.ReactNode;
  isLoading?: boolean;
  items?: Array<string>;
  maxItemsVisible?: number;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  suggestions?: Array<string>;
  value?: string;
}

function Autocomplete(props: AutocompleteProps) {
  const itemsRef: React.MutableRefObject<HTMLDivElement> = React.useRef();
  const {
    className,
    classes: classesProp,
    filter = fuzzyFilter,
    getItemComponent,
    isLoading,
    items = [],
    maxItemsVisible = 5,
    onValueChange,
    placeholder,
    suggestions: suggestionsProp,
    value,
    ...rest
  } = props;
  const classes = useStyles(props);
  const [focusedIndex, setFocusedIndex] = React.useState(-1);
  const [isOpen, setIsOpen] = React.useState(false);
  const theme = useTheme();

  const getIsMatch = React.useCallback(
    function getIsMatch(item) {
      return filter(item, value);
    },
    [filter, value],
  );

  const suggestions = React.useMemo(
    () =>
      !isEmpty(suggestionsProp) ? suggestionsProp : items.filter(getIsMatch),
    [getIsMatch, items, suggestionsProp],
  );

  const handleClose = React.useCallback(function handleClose() {
    setFocusedIndex(-1);
    setIsOpen(false);
  }, []);

  const handleInputKeyDownDownArrow = React.useCallback(
    function handleInputKeyDownDownArrow(e) {
      e.preventDefault();
      e.stopPropagation();

      const shouldUpdateIndex = !(
        focusedIndex === -1 || focusedIndex === suggestions.length - 1
      );

      if (!shouldUpdateIndex) return;

      setFocusedIndex(focusedIndex + 1);

      itemsRef.current.scrollTop =
        focusedIndex === -1 ? 0 : (focusedIndex + 1) * theme.height.item;
    },
    [focusedIndex, suggestions.length, theme.height.item],
  );

  const handleInputKeyDownEscape = React.useCallback(
    function handleInputKeyDownEscape() {
      onValueChange('');

      handleClose();
    },
    [handleClose, onValueChange],
  );

  const handleInputKeyDownUpArrow = React.useCallback(
    function handleInputKeyDownUpArrow(e) {
      e.preventDefault();
      e.stopPropagation();

      const shouldUpdateIndex = focusedIndex >= 1;

      if (!shouldUpdateIndex) return;

      setFocusedIndex(focusedIndex - 1);

      itemsRef.current.scrollTop =
        focusedIndex === -1 ? 0 : (focusedIndex - 1) * theme.height.item;
    },
    [focusedIndex, theme.height.item],
  );

  const handleInputValueChange = React.useCallback(
    function handleInputValueChange(newValue) {
      if (newValue === value) return;

      onValueChange(newValue);

      if (isEmpty(newValue)) {
        handleClose();
      }

      setFocusedIndex(0);

      setIsOpen(true);
    },
    [handleClose, onValueChange, value],
  );

  const handleItemMouseMove = React.useCallback(function handleItemMouseMove(
    index,
  ) {
    setFocusedIndex(index);
  },
  []);

  const selectFocusedItem = React.useCallback(
    function selectFocusedItem() {
      if (focusedIndex !== -1 && suggestions[focusedIndex] !== value) {
        onValueChange(suggestions[focusedIndex]);
      }

      handleClose();
    },
    [focusedIndex, handleClose, onValueChange, suggestions, value],
  );

  return (
    <div className={classnames(classes.root, className)} {...rest}>
      <KeyBinder
        onDownArrowKeyDown={handleInputKeyDownDownArrow}
        onEnterKeyDown={selectFocusedItem}
        onEscapeKeyDown={handleInputKeyDownEscape}
        onUpArrowKeyDown={handleInputKeyDownUpArrow}
      >
        <PopupInput
          className={classes.input}
          isPopupOpen={isOpen}
          isProgressBarVisible={isLoading}
          onBlur={selectFocusedItem}
          onValueChange={handleInputValueChange}
          placeholder={placeholder}
          value={value}
        >
          <div
            className={classes.items}
            ref={itemsRef}
            style={{
              maxHeight: maxItemsVisible * theme.height.item,
            }}
          >
            {suggestions.map((suggestion, index) => (
              <AutocompleteItem
                focusedIndex={focusedIndex}
                getItemComponent={getItemComponent}
                index={index}
                key={uuid()}
                onMouseDown={selectFocusedItem}
                onMouseMove={handleItemMouseMove}
                suggestion={suggestion}
                value={value}
              />
            ))}
          </div>
        </PopupInput>
      </KeyBinder>
    </div>
  );
}

Autocomplete.beginsWithFilter = beginsWithFilter;
Autocomplete.containsFilter = containsFilter;
Autocomplete.endsWithFilter = endsWithFilter;
Autocomplete.fuzzyFilter = fuzzyFilter;

const AutocompleteWithHOCs = React.memo(Autocomplete);

hoistNonReactStatics(AutocompleteWithHOCs, Autocomplete);

export default AutocompleteWithHOCs as typeof AutocompleteWithHOCs & {
  beginsWithFilter: typeof beginsWithFilter;
  containsFilter: typeof containsFilter;
  endsWithFilter: typeof endsWithFilter;
  fuzzyFilter: typeof fuzzyFilter;
};
