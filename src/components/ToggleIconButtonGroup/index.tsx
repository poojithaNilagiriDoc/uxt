import React from 'react';
import classnames from 'classnames';
import some from 'lodash/fp/some';
import isEqual from 'lodash/fp/isEqual';
import createStyles from '@material-ui/core/styles/createStyles';
import { UxtTheme } from '../../themes/UxtTheme';
import ToggleIconButton from '../ToggleIconButton';
import makeStyles from '../_helpers/makeStyles';
import safeGet from '../_helpers/safeGet';
import SelectionMode from '../constants/selectionMode';
import Orientation from '../constants/orientation';

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {
        borderRadius: theme.spacing(0.5),
        overflow: 'hidden',
        border: `1px solid ${theme.palette.divider}`,
        display: (props: ToggleIconButtonGroupProps) =>
          props.orientation
            ? Orientation.Horizontal
              ? 'inline-flex'
              : 'inline'
            : 'inline-flex',
      },
      iconButtonRoot: {
        '&::after': {
          borderRadius: 0,
          margin: 0,
        },
      },
      buttonBackground: {
        borderRadius: 0,
        height: '100%',
        width: '100%',
      },
      horizontal: {
        '& + &': {
          borderLeft: `1px solid ${theme.palette.divider}`,
        },
      },
      vertical: {
        '& + &': {
          borderTop: `1px solid ${theme.palette.divider}`,
        },
      },
    }),
  { name: 'UxtToggleIconButtonGroup' },
);

export interface Item {
  [key: string]: any;
}

export type Items = Array<Item>;

export interface ToggleIconButtonGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  activeItem?: Item;
  activeItems?: Array<Item>;
  classes?: object;
  className?: string;
  iconSvgAccessor?: string | ((item: Item) => string);
  itemDisabledAccessor?: string | ((item: Item) => string);
  items?: Items;
  onActiveItemChange?: (activeItem: Item) => void;
  onActiveItemsChange?: (activeItems: Items) => void;
  orientation?: Orientation;
  selectionMode?: SelectionMode;
}

const ToggleIconButtonGroup = React.forwardRef(function ToggleIconButtonGroup(
  props: ToggleIconButtonGroupProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const {
    activeItem,
    activeItems = [],
    classes: classesProp,
    className,
    iconSvgAccessor = 'iconSvg',
    items,
    itemDisabledAccessor = 'disabled',
    onActiveItemChange,
    onActiveItemsChange,
    orientation = Orientation.Horizontal,
    selectionMode = SelectionMode.Single,
    ...rest
  } = props;
  const classes = useStyles(props);

  const handleButtonClick = React.useCallback(
    function handleButtonClick(item: Item): void {
      if (selectionMode === SelectionMode.Single && onActiveItemChange) {
        onActiveItemChange(item);
      }
      if (selectionMode === SelectionMode.Multiple && onActiveItemsChange) {
        onActiveItemsChange(
          some(item, activeItems)
            ? activeItems.filter(activeItem => !isEqual(activeItem, item))
            : [...activeItems, item],
        );
      }
    },
    [activeItems, selectionMode, onActiveItemChange, onActiveItemsChange],
  );

  const getIsItemActive = React.useCallback(
    function getIsItemActive(item: Item): boolean {
      return selectionMode === SelectionMode.Multiple
        ? some(item, activeItems)
        : isEqual(item, activeItem);
    },
    [activeItems, activeItem, selectionMode],
  );

  return (
    <div className={classnames(classes.root, className)} ref={ref} {...rest}>
      {items &&
        items.map((item: Item, index: number) => (
          <div
            className={classnames(
              {
                [classes.horizontal]: orientation === Orientation.Horizontal,
                [classes.vertical]: orientation === Orientation.Vertical,
              },
              className,
            )}
            key={index}
          >
            <ToggleIconButton
              classes={{
                background: classes.buttonBackground,
                root: classes.iconButtonRoot,
              }}
              iconSvg={safeGet('', iconSvgAccessor, item)}
              isActive={getIsItemActive(item)}
              onClick={() => handleButtonClick(item)}
              isDisabled={safeGet(false, itemDisabledAccessor, item)}
            />
          </div>
        ))}
    </div>
  );
});

export default React.memo(ToggleIconButtonGroup);
