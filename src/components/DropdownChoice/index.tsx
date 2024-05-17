import { createStyles } from '@material-ui/core';
import classnames from 'classnames';
import React from 'react';
import { UxtTheme } from '../../themes/UxtTheme';
import ListItem, { ListItemProps } from '../ListItem';
import makeStyles from '../_helpers/makeStyles';

const styles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      separator: {
        ...theme.typography.caption,
        color: theme.palette.text.secondary,
        fontWeight: theme.typography.fontWeightMedium,
        borderTop: `1px solid ${theme.palette.divider}`,
        pointerEvents: 'none',
      },
    }),
  { name: 'UxtDropdownChoice' },
);

export interface DropdownChoiceProps extends ListItemProps {
  classes?: object;
  onSelect?: (value: any) => void;
  isItemDisabled?: boolean;
  isSeparator?: boolean;
  selectedValue?: any;
  style?: object;
  text?: string | React.ReactNode;
  value?: any;
}

const DropdownChoice = React.forwardRef(function DropdownChoice(
  props: DropdownChoiceProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const {
    className,
    classes: classesProp,
    isItemDisabled = false,
    isSeparator = false,
    item,
    onSelect,
    style,
    selectedValue,
    text,
    value,
    ...rest
  } = props;

  const isSelected = React.useMemo(() => {
    if (!selectedValue) return false;

    if (!value) return false;

    return selectedValue === value;
  }, [selectedValue, value]);

  const handlePointerUp = React.useCallback(() => {
    onSelect?.(value);
  }, [onSelect, value]);

  const classes = styles(props);

  return (
    <ListItem
      className={classnames(
        classes.root,
        { [classes.separator]: isSeparator },
        className,
      )}
      isDisabled={isItemDisabled === true}
      isSelected={isSelected}
      onPointerUp={handlePointerUp}
      primaryTextAccessor={() => text}
      ref={ref}
      style={style}
      item={item}
      {...rest}
    />
  );
});

export default React.memo(DropdownChoice);
