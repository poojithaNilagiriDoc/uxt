import classnames from 'classnames';
import truncate from 'lodash/fp/truncate';
import createStyles from '@material-ui/core/styles/createStyles';
import React from 'react';
import { UxtTheme } from '../../../themes/UxtTheme';
import makeStyles from '../../_helpers/makeStyles';
import showIf from '../../_helpers/showIf';
import Icon from '../../Icon';
import hideIf from '../../_helpers/hideIf';

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {
        alignItems: 'center',
        borderBottom: '2px solid transparent',
        cursor: 'pointer',
        display: 'flex',
        flex: '0 0 auto',
        height: theme.height.toolbar,
        justifyContent: 'center',
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        paddingTop: 2,
        position: 'relative',
        transition: 'border-color 100ms ease, color 250ms ease',
        userSelect: 'none',
        '&::after': {
          ...theme.mixins.absoluteFill,
          bottom: -1,
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
      selected: {
        borderColor: theme.palette.primary.main,
        color: theme.palette.text.link,
      },
      disabled: {
        pointerEvents: 'none',
        opacity: 0.5,
      },
      iconSelected: {
        fill: theme.palette.primary.main,
      },
    }),
  { name: 'UxtTabBarTab' },
);

type DivAttributesWithoutOnSelect = {
  [K in Exclude<
    keyof React.HTMLAttributes<HTMLDivElement>,
    'onSelect'
  >]?: React.HTMLAttributes<HTMLDivElement>[K];
};

interface TabBarTabTab {
  id?: string;
  iconSvg?: string;
  isDisabled?: boolean;
  text?: string;
}

export interface TabBarTabProps extends DivAttributesWithoutOnSelect {
  className?: string;
  classes?: object;
  isDisabled?: boolean;
  isSelected?: boolean;
  maxChars?: number;
  onSelect?: (tab: TabBarTabTab, e: MouseEvent) => void;
  tab: TabBarTabTab;
  title?: string;
}

const TabBarTab = React.forwardRef(function TabBarTab(
  props: TabBarTabProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const {
    className,
    classes: classesProp,
    isDisabled,
    isSelected,
    maxChars = 16,
    onSelect,
    tab,
    title = tab.text,
    ...rest
  } = props;
  const classes = useStyles(props);

  const handleClick = React.useCallback(
    function handleClick(e) {
      onSelect(tab, e);
    },
    [onSelect, tab],
  );

  return (
    <div
      className={classnames(
        classes.root,
        { [classes.selected]: isSelected, [classes.disabled]: isDisabled },
        className,
      )}
      onClick={handleClick}
      ref={ref}
      {...rest}
      title={title}
    >
      {showIf(tab.iconSvg)(
        <Icon
          className={classnames({
            [classes.iconSelected]: isSelected,
            [classes.disabled]: isDisabled,
          })}
          svg={tab.iconSvg}
        />,
      )}
      {hideIf(tab.iconSvg)(
        truncate({ length: maxChars, omission: '…' }, tab.text),
      )}
    </div>
  );
});

export default React.memo(TabBarTab);
