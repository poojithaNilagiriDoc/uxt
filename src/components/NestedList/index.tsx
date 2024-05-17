import { v4 as uuid } from 'uuid';
import classnames from 'classnames';
import constant from 'lodash/fp/constant';
import identity from 'lodash/fp/identity';
import isNil from 'lodash/fp/isNil';
import map from 'lodash/fp/map';
import negate from 'lodash/fp/negate';
import createStyles from '@material-ui/core/styles/createStyles';
import React from 'react';
import { UxtTheme } from '../../themes/UxtTheme';
import replaceAtIndex from '../_helpers/replaceAtIndex';
import makeStyles from '../_helpers/makeStyles';
import NestedListItem from '../_internal/NestedListItem';
import safeGet from '../_helpers/safeGet';
import type { IconProps } from '../Icon';

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {
        backgroundColor: 'inherit',
        paddingBottom: theme.spacing(1),
        paddingTop: theme.spacing(1),
      },
      item: {},
    }),
  { name: 'UxtNestedList' },
);

interface Item {
  [key: string]: any;
}

export interface NestedListProps extends React.HTMLAttributes<HTMLDivElement> {
  childItemComponent?: string | React.FC<any> | React.ComponentClass<any, any>;
  childrenAccessor?: string | ((item: Item) => Array<{ [key: string]: any }>);
  className?: string;
  classes?: object;
  defaultCollapsed?: boolean;
  expanderIconProps?: Partial<IconProps>;
  expanderIconPropsAccessor?: string | ((item: Item) => string);
  iconSvgAccessor?: string | ((item: Item) => string);
  idAccessor?: string | ((item: Item) => string);
  isCollapsible?: boolean;
  isParentItemSelectable?: boolean;
  items?: Array<{ [key: string]: any }>;
  onItemsChange?: (items: Array<{ [key: string]: any }>) => void;
  onSelectedIdChange?: (selectedId: number | string) => void;
  onSelectedItemChange?: (selectedItem: { [key: string]: any }) => void;
  selectedId?: number | string;
  selectedItem?: { [key: string]: any };
  textAccessor?: string | ((item: Item) => string);
}

function NestedList(props: NestedListProps) {
  const {
    childItemComponent,
    childrenAccessor = 'children',
    className,
    classes: classesProp,
    defaultCollapsed,
    expanderIconProps,
    expanderIconPropsAccessor = 'expanderIconProps',
    iconSvgAccessor = 'iconSvg',
    idAccessor = 'id',
    isCollapsible,
    isParentItemSelectable = false,
    items = [],
    onItemsChange,
    onSelectedIdChange,
    onSelectedItemChange,
    selectedId,
    selectedItem,
    textAccessor = 'text',
    ...rest
  } = props;
  const classes = useStyles(props);
  const [collapsedList, setCollapsedList] = React.useState(() =>
    map(constant(defaultCollapsed), items),
  );

  const getIsCollapsed = React.useCallback(
    function getIsCollapsed(item, index) {
      if (!isNil(item.isCollapsed)) {
        return item.isCollapsed;
      }

      if (isNil(collapsedList[index])) {
        return false;
      }

      return collapsedList[index];
    },
    [collapsedList],
  );

  const handleIsCollapsedChange = React.useCallback(
    function handleIsCollapsedChange(index, item) {
      if (onItemsChange) {
        onItemsChange(
          items.map(i => {
            if (i !== item) {
              return i;
            }

            const isCollapsed = !isNil(i.isCollapsed)
              ? !i.isCollapsed
              : !defaultCollapsed;

            return { ...i, isCollapsed };
          }),
        );

        return;
      }

      setCollapsedList(replaceAtIndex(index, negate(identity), collapsedList));
    },
    [collapsedList, defaultCollapsed, items, onItemsChange],
  );

  React.useEffect(() => {
    setCollapsedList(map(constant(defaultCollapsed), items));
  }, [defaultCollapsed, items]);

  return (
    <div className={classnames(classes.root, className)} {...rest}>
      {items.map((item, index) => (
        <NestedListItem
          childItemComponent={childItemComponent}
          childrenAccessor={childrenAccessor}
          className={classes.item}
          iconSvgAccessor={iconSvgAccessor}
          idAccessor={idAccessor}
          index={index}
          isCollapsed={getIsCollapsed(item, index)}
          isCollapsible={isCollapsible}
          isParentSelectable={isParentItemSelectable}
          item={item}
          key={safeGet(uuid(), idAccessor, item)}
          onIsCollapsedChange={handleIsCollapsedChange}
          onSelectedIdChange={onSelectedIdChange}
          onSelectedItemChange={onSelectedItemChange}
          selectedId={selectedId}
          selectedItem={selectedItem}
          textAccessor={textAccessor}
          expanderIconProps={safeGet(
            expanderIconProps,
            expanderIconPropsAccessor,
            item,
          )}
        />
      ))}
    </div>
  );
}

export default React.memo(NestedList);
