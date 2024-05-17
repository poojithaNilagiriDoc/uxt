import { v4 as uuid } from 'uuid';
import classnames from 'classnames';
import dropRight from 'lodash/fp/dropRight';
import isEmpty from 'lodash/fp/isEmpty';
import last from 'lodash/fp/last';
import createStyles from '@material-ui/core/styles/createStyles';
import React from 'react';
import chevronLeft from 'uxt-graphics/icons/chevron-left';
import showIf from '../../_helpers/showIf';
import { UxtTheme } from '../../../themes/UxtTheme';
import makeStyles from '../../_helpers/makeStyles';
import Icon from '../../Icon';
import type { IconProps } from '../../Icon';
import MenuItem from '../../MenuItem';
import safeGet from '../../_helpers/safeGet';
import type { MenuItem as MenuItemType } from '../../MenuItem';

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[1],
        flex: '1 0 auto',
        width: '100%',
      },
      goBack: {
        alignItems: 'center',
        borderBottom: `1px solid ${theme.palette.divider}`,
        cursor: 'pointer',
        display: 'flex',
        height: theme.height.item,
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
      goBackIcon: {},
      goBackText: {
        overflow: 'hidden',
        paddingRight: theme.spacing(2),
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      },
      item: {},
    }),
  { name: 'UxtMenuPage' },
);

export interface MenuPageProps extends React.HTMLAttributes<HTMLDivElement> {
  actionArguments?: Array<any>;
  ancestorStack?: Array<{
    items: Array<MenuItemType>;
    text: string;
  }>;
  className?: string;
  classes?: object;
  goBackIconProps?: Partial<IconProps>;
  itemComponent?: string | React.FC<any> | React.ComponentClass<any, any>;
  items?: Array<MenuItemType>;
  onActionInvoke?: (e: MouseEvent) => void;
  onParentMenuOpen?: (parentMenuArgs: {
    ancestorStack: Array<{
      items: Array<MenuItemType>;
      text: string;
    }>;
    items: Array<MenuItemType>;
  }) => void;
  onReset?: () => void;
  onSubMenuOpen?: (subMenuArgs: {
    ancestorStack: Array<{
      items: Array<MenuItemType>;
      text: string;
    }>;
    items: Array<MenuItemType>;
  }) => void;
  separatorAccessor?: string | ((...args: Array<unknown>) => string);
}

const MenuPage = React.forwardRef(function MenuPage(
  props: MenuPageProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const {
    actionArguments = [],
    ancestorStack = [],
    className,
    classes: classesProp,
    goBackIconProps,
    itemComponent: ItemComponent = MenuItem,
    items = [],
    onActionInvoke,
    onParentMenuOpen,
    onReset,
    onSubMenuOpen,
    separatorAccessor = 'isSeparator',
    ...rest
  } = props;
  const classes = useStyles(props);

  const handleGoBackClick = React.useCallback(
    function handleGoBackClick(e) {
      e.stopPropagation();

      onParentMenuOpen({
        ancestorStack: dropRight(1, ancestorStack),
        items: last(ancestorStack).items,
      });
    },
    [ancestorStack, onParentMenuOpen],
  );

  const handleItemSelect = React.useCallback(
    function handleItemSelect(item, e) {
      if (!isEmpty(item.children)) {
        onSubMenuOpen({
          ancestorStack: [...ancestorStack, { items: items, text: item.text }],
          items: item.children,
        });

        e.stopPropagation();

        return;
      }

      if (item.action) {
        item.action(...actionArguments, e);
      }

      if (onActionInvoke) {
        onActionInvoke(e);
      }

      if (!isEmpty(ancestorStack)) {
        if (onReset) {
          onReset();
        }
      }
    },
    [
      actionArguments,
      ancestorStack,
      items,
      onActionInvoke,
      onReset,
      onSubMenuOpen,
    ],
  );

  return (
    <div className={classnames(classes.root, className)} {...rest}>
      {showIf(!isEmpty(ancestorStack))(() => (
        <div
          className={classes.goBack}
          onClick={handleGoBackClick}
          title={last(ancestorStack).text}
        >
          <Icon
            className={classes.goBackIcon}
            size="small"
            svg={chevronLeft}
            {...goBackIconProps}
          />
          <div className={classes.goBackText}>{last(ancestorStack).text}</div>
        </div>
      ))}
      {items.map(item => (
        <ItemComponent
          className={classes.item}
          key={uuid()}
          onSelect={handleItemSelect}
          item={item}
          isSeparator={safeGet(false, separatorAccessor, item)}
        />
      ))}
    </div>
  );
});

export default React.memo(MenuPage);
