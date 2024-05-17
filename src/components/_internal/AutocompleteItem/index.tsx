import classnames from 'classnames';
import isEqual from 'lodash/fp/isEqual';
import toLower from 'lodash/fp/toLower';
import React from 'react';
import hideIf from '../../_helpers/hideIf';
import showIf from '../../_helpers/showIf';
import { UxtTheme } from '../../../themes/UxtTheme';
import makeStyles from '../../_helpers/makeStyles';

const useStyles = makeStyles(
  (theme: UxtTheme) => ({
    root: {
      display: 'flex',
      flex: '0 0 auto',
      position: 'relative',
    },
    text: {
      alignItems: 'center',
      cursor: 'pointer',
      display: 'flex',
      flex: '1 0 auto',
      fontWeight: 200,
      height: theme.height.item,
      padding: theme.spacing(2),
      '& strong': {
        fontWeight: 500,
      },
    },
    focused: {
      '& $text': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }),
  { name: 'UxtAutocompleteItem' },
);

type DivAttributesWithoutOnMouseMove = {
  [K in Exclude<
    keyof React.HTMLAttributes<HTMLDivElement>,
    'onMouseMove'
  >]?: React.HTMLAttributes<HTMLDivElement>[K];
};

export interface AutocompleteItemProps extends DivAttributesWithoutOnMouseMove {
  className?: string;
  classes?: object;
  focusedIndex?: number;
  getItemComponent?: (
    suggestion: string,
    isFocused: boolean,
  ) => React.ReactNode;
  index?: number;
  onMouseMove?: (index: number) => void;
  suggestion?: string;
  value?: string;
}

const AutocompleteItem = React.forwardRef(function AutocompleteItem(
  props: AutocompleteItemProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const {
    className,
    focusedIndex,
    getItemComponent,
    index,
    onMouseMove,
    suggestion,
    value,
    ...rest
  } = props;
  const classes = useStyles(props);

  const isFocused = React.useMemo(() => {
    if (focusedIndex === -1) return false;

    return isEqual(index, focusedIndex);
  }, [focusedIndex, index]);

  const textHTML = React.useMemo(() => {
    const highlightedSuggestion = wrapSubstring(
      '<strong>',
      '</strong>',
      value,
      suggestion,
    );
    const __html = `<span>${highlightedSuggestion}</span>`;

    return { __html };
  }, [suggestion, value]);

  const getCustomComponent = React.useCallback(
    function getCustomComponent() {
      return getItemComponent(suggestion, isFocused);
    },
    [getItemComponent, isFocused, suggestion],
  );

  const handleMouseMove = React.useCallback(
    function handleMouseMove() {
      if (isFocused) return;

      onMouseMove(index);
    },
    [index, isFocused, onMouseMove],
  );

  return (
    <div
      className={classnames(
        classes.root,
        { [classes.focused]: isFocused },
        className,
      )}
      onMouseMove={handleMouseMove}
      {...rest}
    >
      {showIf(getItemComponent)(() => getCustomComponent())}
      {hideIf(getItemComponent)(() => (
        <div className={classes.text} dangerouslySetInnerHTML={textHTML} />
      ))}
    </div>
  );
});

export default React.memo(AutocompleteItem);

function wrapSubstring(before, after, substr, str) {
  const startIndex = toLower(str).indexOf(toLower(substr));
  const endIndex = startIndex + substr.length;

  if (startIndex === -1) return str;

  return [
    str.split('').slice(0, startIndex).join(''),
    before,
    str.split('').slice(startIndex, endIndex).join(''),
    after,
    str.split('').slice(endIndex, str.length).join(''),
  ].join('');
}
