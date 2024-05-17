import classnames from 'classnames';
import compact from 'lodash/fp/compact';
import isEmpty from 'lodash/fp/isEmpty';
import last from 'lodash/fp/last';
import max from 'lodash/fp/max';
import omit from 'lodash/fp/omit';
import createStyles from '@material-ui/core/styles/createStyles';
import React from 'react';
import { UxtTheme } from '../../../themes/UxtTheme';
import getTextWidth from '../../_helpers/getTextWidth';
import makeStyles from '../../_helpers/makeStyles';
import MenuItem from '../../MenuItem';
import MenuPage from '../MenuPage';
import type { MenuItem as MenuItemType } from '../../MenuItem';
import { softMap } from '../../TreeList';

const duration = 250;

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {
        backgroundColor: theme.palette.background.paper,
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[1],
        color: theme.palette.text.primary,
        display: 'flex',
        fill: theme.palette.action.active,
        flex: '0 0 auto',
        overflow: 'hidden',
      },
      transition: {
        display: 'flex',
        flex: '1 1 auto',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative',
      },
    }),
  { name: 'UxtMenu' },
);

export interface MenuProps extends React.HTMLAttributes<HTMLDivElement> {
  actionArguments?: Array<any>;
  className?: string;
  classes?: object;
  itemComponent?: string | React.FC<any> | React.ComponentClass<any, any>;
  items?: Array<MenuItemType>;
  onActionInvoke?: (e: MouseEvent) => void;
  separatorAccessor?: string | ((...args: Array<unknown>) => string);
}

interface MenuMethods {
  reset: () => void;
}

const Menu = React.forwardRef(function Menu(
  props: MenuProps,
  ref: React.Ref<MenuMethods>,
) {
  const {
    actionArguments = [],
    className,
    classes: classesProp,
    itemComponent = MenuItem,
    items: itemsProp = [],
    onActionInvoke,
    separatorAccessor = 'isSeparator',
    ...rest
  } = props;
  const classes = useStyles(props);
  const [ancestorStack, setAncestorStack] = React.useState([]);
  const [items, setItems] = React.useState<Array<MenuItemType>>(
    softMap(
      (item: MenuItemType, { parent }) => ({
        ...item,
        siblingHasIcon:
          parent !== undefined
            ? parent?.children?.some((child: MenuItemType) => {
                return child.iconSvg !== undefined;
              })
            : itemsProp.some((item: MenuItemType) => {
                return item.iconSvg !== undefined;
              }),
      }),
      itemsProp,
    ),
  );

  const transitionStyle = React.useMemo(() => {
    const itemChevronSize = 40;
    const addGoBackHeight = n => (isEmpty(ancestorStack) ? n : n + 48);
    const itemPadding = 40;

    return {
      height: addGoBackHeight(items.length * 48),
      transition: `height ${duration}ms ease, width ${duration}ms ease`,
      width: max(
        compact([last(ancestorStack), ...items]).map((item: MenuItemType) => {
          const iconWidth = item.iconSvg || item.siblingHasIcon ? 48 : 0;

          if (!isEmpty(item.children) || !isEmpty(item.items)) {
            return (
              getTextWidth('16px Roboto', item.text) +
              itemPadding +
              iconWidth +
              itemChevronSize
            );
          }

          return (
            getTextWidth('16px Roboto', item.text) + itemPadding + iconWidth
          );
        }),
      ),
    };
  }, [ancestorStack, items]);

  const handlePageChange = React.useCallback(function handlePageChange({
    ancestorStack,
    items,
  }) {
    setAncestorStack(ancestorStack);
    setItems(items);

    setTimeout(() => {
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('resize'));
      }
    }, 100);
  },
  []);

  const handleReset = React.useCallback(function handleReset() {
    setAncestorStack([]);
  }, []);

  React.useImperativeHandle(
    ref,
    () => ({
      reset: () => {
        setAncestorStack([]);
      },
    }),
    [],
  );

  return (
    <div className={classnames(classes.root, className)} {...omit('ref', rest)}>
      <div className={classes.transition} style={transitionStyle}>
        <MenuPage
          actionArguments={actionArguments}
          ancestorStack={ancestorStack}
          itemComponent={itemComponent}
          items={items}
          onActionInvoke={onActionInvoke}
          onParentMenuOpen={handlePageChange}
          onReset={handleReset}
          onSubMenuOpen={handlePageChange}
          separatorAccessor={separatorAccessor}
        />
      </div>
    </div>
  );
});

export default React.memo(Menu);
