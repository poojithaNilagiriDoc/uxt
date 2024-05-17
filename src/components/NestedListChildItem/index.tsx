import classnames from 'classnames';
import isNil from 'lodash/fp/isNil';
import createStyles from '@material-ui/core/styles/createStyles';
import React from 'react';
import { UxtTheme } from '../../themes/UxtTheme';
import makeStyles from '../_helpers/makeStyles';
import safeGet from '../_helpers/safeGet';

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {
        alignItems: 'flex-start',
        backgroundColor: 'inherit',
        cursor: 'pointer',
        display: 'flex',
        flex: '0 0 auto',
        overflow: 'hidden',
        paddingBottom: theme.spacing(1),
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(2),
        paddingTop: theme.spacing(1),
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
      text: {
        color: 'inherit',
        fontSize: '0.875rem',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      },
      parentHasIcon: {
        paddingLeft: theme.spacing(7),
      },
      selected: {
        backgroundColor: theme.palette.action.selected,
      },
    }),
  { name: 'UxtNestedListChildItem' },
);

export interface NestedListChildItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  classes?: object;
  idAccessor?: string | ((item: { [key: string]: any }) => string | number);
  item?: { [key: string]: any };
  onSelectedIdChange?: (selectedId: number | string) => void;
  onSelectedItemChange?: (selectedItem: { [key: string]: any }) => void;
  parentHasIcon?: boolean;
  selectedId?: number | string;
  selectedItem?: { [key: string]: any };
  textAccessor?: string | ((item: { [key: string]: any }) => string | number);
}

const NestedListChildItem = React.forwardRef(function NestedListChildItem(
  props: NestedListChildItemProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const {
    className,
    classes: classesProp,
    idAccessor = 'id',
    item,
    onSelectedIdChange,
    onSelectedItemChange,
    parentHasIcon,
    selectedId,
    selectedItem,
    textAccessor = 'text',
    ...rest
  } = props;
  const classes = useStyles(props);
  const id = safeGet('', idAccessor, item);
  const text = safeGet('', textAccessor, item);
  const isSelected = React.useMemo(
    () =>
      item === selectedItem || (!(isNil(id) || id === '') && id === selectedId),
    [id, item, selectedId, selectedItem],
  );

  const handleClick = React.useCallback(
    function handleClick() {
      if (onSelectedIdChange) {
        onSelectedIdChange(id);
      }

      if (onSelectedItemChange) {
        onSelectedItemChange(item);
      }
    },
    [id, item, onSelectedIdChange, onSelectedItemChange],
  );

  return (
    <div
      className={classnames(
        classes.root,
        {
          [classes.parentHasIcon]: parentHasIcon,
          [classes.selected]: isSelected,
        },
        className,
      )}
      onClick={handleClick}
      ref={ref}
      {...rest}
    >
      <div className={classes.text}>{text}</div>
    </div>
  );
});

export default React.memo(NestedListChildItem);
