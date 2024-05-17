import classnames from 'classnames';
import find from 'lodash/fp/find';
import includes from 'lodash/fp/includes';
import initial from 'lodash/fp/initial';
import isEmpty from 'lodash/fp/isEmpty';
import sum from 'lodash/fp/sum';
import takeWhile from 'lodash/takeWhile';
import truncate from 'lodash/fp/truncate';
import without from 'lodash/fp/without';
import createStyles from '@material-ui/core/styles/createStyles';
import React from 'react';
import chevronDown from 'uxt-graphics/icons/chevron-down';
import showIf from '../../_helpers/showIf';
import { UxtTheme } from '../../../themes/UxtTheme';
import getTextWidth from '../../_helpers/getTextWidth';
import makeStyles from '../../_helpers/makeStyles';
import OverflowButton from '../../OverflowButton';
import TabBarTab from '../TabBarTab';
import type { IconButtonProps } from '../../IconButton';
import toUpperCase from '../../_helpers/toUpperCase';

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {
        display: 'flex',
        flex: '1 1 auto',
      },
      visibleTabs: {
        display: 'flex',
        flex: '1 1 auto',
      },
      tab: {},
      tabOverflow: {
        alignItems: 'center',
        display: 'flex',
        flex: '0 0 auto',
        justifyContent: 'center',
        width: theme.height.toolbar,
      },
      overflowButton: {
        marginLeft: 0,
      },
    }),
  { name: 'UxtTabBar' },
);

interface TabBarTabTab {
  id?: string;
  isDisabled?: boolean;
  iconSvg?: string;
  text?: string;
}

export interface TabBarProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  classes?: object;
  maxChars?: number;
  onSelectedIdChange?: (selectedId: string, e: MouseEvent) => void;
  overflowIconButtonProps?: Partial<IconButtonProps>;
  selectedId?: string;
  tabs?: Array<TabBarTabTab>;
  width?: number;
}

function TabBar(props: TabBarProps) {
  const {
    className,
    classes: classesProp,
    maxChars = 16,
    onSelectedIdChange,
    overflowIconButtonProps,
    selectedId,
    tabs = [],
    width = 0,
    ...rest
  } = props;
  const classes = useStyles(props);

  const visibleTabs = React.useMemo(() => {
    const selectedTab = find({ id: selectedId }, tabs);
    const tabsThatFit = takeMax(width - 50, getTabWidth(maxChars), tabs);

    return !selectedTab || includes(selectedTab, tabsThatFit)
      ? tabsThatFit
      : [...initial(tabsThatFit), selectedTab];
  }, [maxChars, selectedId, tabs, width]);

  const getIsTabSelected = React.useCallback(
    function getIsTabSelected(tab) {
      const firstTabId = tabs[0].id;

      if (!selectedId) {
        return firstTabId === tab.id;
      }

      if (
        !includes(
          selectedId,
          tabs.map(t => t.id),
        )
      ) {
        return tab.id === firstTabId;
      }

      return tab.id === selectedId;
    },
    [selectedId, tabs],
  );

  const handleTabSelect = React.useCallback(
    function handleTabSelect(tab, e?) {
      if (tab.id === '' || selectedId === tab.id) return;

      onSelectedIdChange(tab.id, e);
    },
    [onSelectedIdChange, selectedId],
  );

  const getOverflowItems = React.useCallback(
    function getOverflowItems() {
      const overflowTabs = without(visibleTabs, tabs);
      return overflowTabs.map((tab: TabBarTabTab) => ({
        action: () => handleTabSelect(tab),
        text: toUpperCase(tab.text),
        disabled: tab.isDisabled,
        iconSvg: tab.iconSvg,
      }));
    },
    [handleTabSelect, tabs, visibleTabs],
  );

  return (
    <div className={classnames(classes.root, className)} {...rest}>
      <div className={classes.visibleTabs}>
        {visibleTabs
          .map(tab => ({ ...tab, text: toUpperCase(tab.text) }))
          .map((tab, index) => (
            <TabBarTab
              className={classes.tab}
              isDisabled={tab.isDisabled}
              isSelected={getIsTabSelected(tab)}
              key={index}
              maxChars={maxChars}
              onSelect={handleTabSelect}
              tab={tab}
            />
          ))}
      </div>
      {showIf(!isEmpty(getOverflowItems()))(
        <div className={classes.tabOverflow}>
          <OverflowButton
            className={classes.overflowButton}
            iconSvg={chevronDown}
            items={getOverflowItems()}
            overflowIconButtonProps={overflowIconButtonProps}
          />
        </div>,
      )}
    </div>
  );
}

export default React.memo(TabBar);

function formatText(maxChars, text) {
  return truncate({ length: maxChars, omission: '…' }, toUpperCase(text));
}

function getTabWidth(maxChars) {
  const padding = 16;
  const iconTabSize = 40 + padding * 2;

  return (tab: TabBarTabTab) => {
    const text = formatText(maxChars, tab.text);

    return tab.iconSvg
      ? iconTabSize
      : getTextWidth('16px Roboto', text) + padding * 2;
  };
}

function takeMax(maxValue: number, getValue, items: TabBarTabTab[]) {
  return takeWhile(
    items,
    (_: TabBarTabTab, i: number, xs: Array<string | number>) =>
      sum(xs.slice(0, i + 1).map(getValue)) <= maxValue,
  );
}
