import React from 'react';
import classnames from 'classnames';
import some from 'lodash/fp/some';
import isEqual from 'lodash/fp/isEqual';
import createStyles from '@material-ui/core/styles/createStyles';
import { UxtTheme } from '../../themes/UxtTheme';
import makeStyles from '../_helpers/makeStyles';
import safeGet from '../_helpers/safeGet';
import SelectionMode from '../constants/selectionMode';
import Orientation from '../constants/orientation';
import RibbonBarToggleIconButton from '../RibbonBarToggleIconButton';
import RibbonBarType from '../constants/ribbonBarType';
import Size from '../constants/size';

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {
        borderRadius: theme.spacing(0.5),
        overflow: 'hidden',
        display: (props: RibbonBarToggleIconButtonGroupProps) =>
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
    }),
  { name: 'UxtRibbonBarToggleIconButtonGroup' },
);

const sizesArray = Object.values(Size);

type AllButtonSizes = typeof sizesArray[number];
export type ButtonSizes = Exclude<
  AllButtonSizes,
  'extra small' | 'extra large'
>;

const ribbonBarTypeArray = Object.values(RibbonBarType);

type AllRibbonBarTypes = typeof ribbonBarTypeArray[number];
export type RibbonBarTypes = AllRibbonBarTypes;

export interface Item {
  [key: string]: any;
}

export type Items = Array<Item>;

export interface RibbonBarToggleIconButtonGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  activeItem?: Item;
  activeItems?: Array<Item>;
  appearance?: RibbonBarTypes;
  classes?: Record<string, string>;
  className?: string;
  iconSvgAccessor?: string | ((item: Item) => string);
  iconSizeAccessor?: ButtonSizes | ((item: Item) => ButtonSizes) | number;
  itemDisabledAccessor?: string | ((item: Item) => string);
  items?: Items;
  onActiveItemChange?: (activeItem: Item) => void;
  onActiveItemsChange?: (activeItems: Items) => void;
  orientation?: Orientation;
  selectionMode?: SelectionMode;
  size?: ButtonSizes;
}

const RibbonBarToggleIconButtonGroup = React.forwardRef(
  function RibbonBarToggleIconButtonGroup(
    props: RibbonBarToggleIconButtonGroupProps,
    ref: React.Ref<HTMLDivElement>,
  ) {
    const {
      activeItem,
      activeItems = [],
      classes: classesProp,
      className,
      iconSvgAccessor = 'iconSvg',
      iconSizeAccessor = 'iconSize',
      items,
      itemDisabledAccessor = 'disabled',
      onActiveItemChange,
      onActiveItemsChange,
      orientation,
      selectionMode = SelectionMode.Single,
      size,
      appearance = 'simplified',
      ...rest
    } = props;
    const classes = useStyles(props);

    const handleButtonClick = React.useCallback(
      (item: Item): void => {
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
      (item: Item): boolean => {
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
            <div key={index}>
              <RibbonBarToggleIconButton
                classes={{
                  background: classes.buttonBackground,
                  root: classes.iconButtonRoot,
                }}
                iconSvg={safeGet('', iconSvgAccessor, item)}
                isActive={getIsItemActive(item)}
                onClick={() => handleButtonClick(item)}
                isDisabled={safeGet(false, itemDisabledAccessor, item)}
                appearance={appearance}
                title={item.title}
                iconSize={safeGet('regular', iconSizeAccessor, item)}
              />
            </div>
          ))}
      </div>
    );
  },
);

export default React.memo(RibbonBarToggleIconButtonGroup);
