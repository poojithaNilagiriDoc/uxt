import classnames from 'classnames';
import createStyles from '@material-ui/core/styles/createStyles';
import React from 'react';
import makeStyles from '../../_helpers/makeStyles';

const useStyles = makeStyles(
  createStyles({
    root: {},
    input: {},
  }),
  { name: 'UxtSearchCore' },
);

export interface SearchCoreProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  classes?: object;
  inputRef?: React.Ref<HTMLInputElement>;
  onSearch?: (query: string) => void;
  onValueChange?: (query: string) => void;
  placeholder: string;
  value: string;
}

function SearchCore(props: SearchCoreProps) {
  const {
    className,
    classes: classesProp,
    inputRef,
    onSearch,
    onValueChange,
    placeholder,
    value,
    ...rest
  } = props;
  const classes = useStyles(props);

  const handleInputChange = React.useCallback(
    function handleInputChange(e) {
      if (!onValueChange) return;

      onValueChange(e.target.value);
    },
    [onValueChange],
  );

  const handleInputKeyUp = React.useCallback(
    function handleInputKeyUp(e) {
      if (e.keyCode !== 13 || !onSearch) return;

      onSearch(value);
    },
    [onSearch, value],
  );

  return (
    <div className={classnames(classes.root, className)}>
      <input
        className={classes.input}
        onChange={handleInputChange}
        onKeyUp={handleInputKeyUp}
        placeholder={placeholder}
        ref={inputRef}
        type="text"
        value={value}
        {...rest}
      />
    </div>
  );
}

export default React.memo(SearchCore);
