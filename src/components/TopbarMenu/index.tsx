import classnames from 'classnames';
import createStyles from '@material-ui/core/styles/createStyles';
import React from 'react';
import user from 'uxt-graphics/icons/user';
import { UxtTheme } from '../../themes/UxtTheme';
import makeStyles from '../_helpers/makeStyles';
import OverflowButton from '../OverflowButton';
import type { MenuItem as MenuItemType } from '../MenuItem';

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {},
      overflowButton: {},
      overflowButtonButtonWrapper: {
        alignItems: 'center',
        height: theme.height.toolbar,
        justifyContent: 'center',
        minWidth: theme.height.toolbar,
      },
      overflowButtonOpen: {
        '& $overflowButtonButtonWrapper': {
          backgroundColor: theme.palette.action.disabled,
        },
      },
    }),
  { name: 'UxtTopbarMenu' },
);

export interface TopbarMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  actionArguments?: Array<any>;
  buttonComponent?: string | React.FC<any> | React.ComponentClass<any, any>;
  className?: string;
  classes?: object;
  iconSvg?: string;
  itemComponent?: string | React.FC<any> | React.ComponentClass<any, any>;
  items?: Array<MenuItemType>;
  separatorAccessor?: string | ((...args: Array<unknown>) => string);
  text?: string;
}

const TopbarMenu = React.forwardRef(function TopbarMenu(
  props: TopbarMenuProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const {
    actionArguments,
    buttonComponent,
    className,
    classes: classesProp,
    iconSvg,
    itemComponent,
    items,
    separatorAccessor = 'isSeparator',
    text,
    ...rest
  } = props;
  const classes = useStyles(props);

  return (
    <div className={classnames(classes.root, className)} ref={ref} {...rest}>
      <OverflowButton
        actionArguments={actionArguments}
        buttonComponent={buttonComponent}
        className={classes.overflowButton}
        classes={{
          buttonWrapper: classes.overflowButtonButtonWrapper,
          open: classes.overflowButtonOpen,
        }}
        iconSvg={iconSvg || user}
        itemComponent={itemComponent}
        items={items}
        targetVertical="bottom"
        text={text}
        separatorAccessor={separatorAccessor}
      />
    </div>
  );
});

export default React.memo(TopbarMenu);
