import classnames from 'classnames';
import getOr from 'lodash/fp/getOr';
import isNil from 'lodash/fp/isNil';
import throttle from 'lodash/fp/throttle';
import createStyles from '@material-ui/core/styles/createStyles';
import React from 'react';
import ResizeDetector from 'react-resize-detector';
import leftArrow from 'uxt-graphics/icons/arrow-left';
import { ThemeProvider } from '@material-ui/core';
import startCase from 'lodash/fp/startCase';
import includes from 'lodash/fp/includes';
import find from 'lodash/fp/find';
import initial from 'lodash/fp/initial';
import isEmpty from 'lodash/fp/isEmpty';
import sum from 'lodash/fp/sum';
import takeWhile from 'lodash/takeWhile';
import truncate from 'lodash/fp/truncate';
import without from 'lodash/fp/without';
import chevronDown from 'uxt-graphics/icons/chevron-down';
import check from 'uxt-graphics/icons/check';
import { ClickAwayListener } from '@material-ui/core';
import { motion } from 'framer-motion';
import { UxtTheme } from '../../themes/UxtTheme';
import makeStyles from '../_helpers/makeStyles';
import type { IconButtonProps } from '../IconButton';
import showIf from '../_helpers/showIf';
import ListItem from '../ListItem';
import CoverPanel from '../CoverPanel';
import sidebarTheme from '../Sidebar/sidebarTheme';
import useTheme from '../_helpers/useTheme';
import getTextWidth from '../_helpers/getTextWidth';
import OverflowButton from '../OverflowButton';
import { RibbonBarTabProps } from '../RibbonBarTab';
import ContentSwitcher from '../_internal/ContentSwitcher';
import type { MenuItem as MenuItemType } from '../MenuItem';

const CLASSIC_RIBBON_HEIGHT = 84;
const SIMPLIFIED_RIBBON_HEIGHT = 126;

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {
        display: 'flex',
        flex: '1 1 auto',
        flexDirection: 'column',
        overflow: 'hidden',
      },
      toolbar: {
        display: 'flex',
        flex: '0 0 auto',
        zIndex: 'inherit',
      },
      container: {
        position: 'relative',
        boxShadow: theme.shadows[3],
      },
      tabBarWrapper: {
        display: 'flex',
        width: '100%',
      },
      view: {
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        paddingLeft: theme.spacing(1),
      },
      panel: {
        display: 'flex',
        flex: '1 1 auto',
      },
      sidebar: {
        display: 'flex',
        flexDirection: 'column',
        background: theme.palette.background.sidebar,
        color: theme.palette.getContrastText(theme.palette.background.sidebar),
        fill: theme.palette.getContrastText(theme.palette.background.sidebar),
        width: 160,
        fontSize: theme.typography.subtitle2.fontSize,
      },
      panelContent: {
        display: 'flex',
        flex: '1 1 auto',
        flexDirection: 'column',
        padding: theme.spacing(1),
      },
      close: {
        width: 160,
        background: theme.palette.background.sidebar,
        color: theme.palette.getContrastText(theme.palette.background.sidebar),
        fill: theme.palette.getContrastText(theme.palette.background.sidebar),
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
      },
      visibleTabs: {
        display: 'flex',
        flex: '1 1 auto',
      },
      tab: {
        alignItems: 'center',
        borderBottom: '2px solid transparent',
        cursor: 'pointer',
        display: 'flex',
        flex: '0 0 auto',
        height: 36,
        justifyContent: 'center',
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        paddingTop: 2,
        position: 'relative',
        transition: 'border-color 100ms ease, color 250ms ease',
        userSelect: 'none',
        fontSize: theme.typography.button.fontSize,
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
        color: theme.palette.text.link,
        '&::after': {
          ...theme.mixins.absoluteFill,
          backgroundColor: 'transparent',
          content: '""',
          display: 'block',
          pointerEvents: 'none',
          margin: 'auto',
          borderBottom: `2px solid ${theme.palette.primary.main}`,
        },
      },
      disabled: {
        pointerEvents: 'none',
        opacity: 0.5,
      },
      contextual: {
        color: theme.palette.text.link,
        background: theme.palette.background.paper,
      },
      overflow: {
        position: 'absolute',
        right: 0,
        bottom: 0,
      },
      coverPanel: {
        zIndex: theme.zIndex.topbar + 1,
        background: theme.palette.background.default,
      },
      closeIcon: {
        border: `2px solid ${theme.palette.common.white}`,
        borderRadius: '50%',
      },
    }),
  { name: 'UxtRibbonBarTabs' },
);

export interface RibbonBarTabsProps
  extends React.HTMLAttributes<HTMLDivElement> {
  activeTabName?: React.ReactText;
  children?: React.ReactNode;
  className?: string;
  classes?: Record<string, string>;
  closeText?: string;
  isCoverPanelOpen?: boolean;
  maxChars?: number;
  onActiveTabNameChange?: (activeTabName: React.ReactText) => void;
  onCoverPanelIsOpenChange?: (isCoverPanelOpen: boolean) => void;
  overflowIconButtonProps?: Partial<IconButtonProps>;
  alwaysShowRibbonText?: string;
  automaticallyHideRibbonText?: string;
  isOpen?: boolean;
  onAlwaysShow?: () => void;
  onAutomaticallyHide?: () => void;
  onClassicRibbon?: () => void;
  onIsOpenChange?: (isOpen: boolean) => void;
  onSimplifiedRibbon?: () => void;
  overflowTooltipText?: string;
  ribbonLayoutText?: string;
  classicRibbonText?: string;
  simplifiedRibbonText?: string;
  showRibbonText?: string;
}

function RibbonBarTabs(props: RibbonBarTabsProps) {
  const {
    activeTabName,
    children = [],
    className,
    classes: classesProp,
    closeText = 'Close',
    isCoverPanelOpen: isCoverPanelOpenProp = false,
    maxChars = 16,
    onActiveTabNameChange,
    onCoverPanelIsOpenChange,
    overflowIconButtonProps,
    isOpen: isOpenProp = true,
    onAutomaticallyHide,
    onAlwaysShow,
    onClassicRibbon,
    onIsOpenChange,
    onSimplifiedRibbon,
    overflowTooltipText = 'Ribbon display options',
    ribbonLayoutText = 'Ribbon Layout',
    classicRibbonText = 'Classic Ribbon',
    simplifiedRibbonText = 'Simplified Ribbon',
    showRibbonText = 'Show Ribbon',
    alwaysShowRibbonText = 'Always Show',
    automaticallyHideRibbonText = 'Automatically Hide',
    ...rest
  } = props;

  const classes = useStyles(props);
  const [tabBarWidth, setTabBarWidth] = React.useState(0);
  const [selectedTab, setSelectedTab] = React.useState<RibbonBarTabProps>();
  const [isCoverPanelOpen, setIsCoverPanelOpen] =
    React.useState<boolean>(isCoverPanelOpenProp);
  const theme: UxtTheme = useTheme();
  const [toggleSimplifiedRibbon, setEnableSimplifiedRibbon] =
    React.useState<boolean>(true);
  const [toggleContentSwitcher, setAlwaysShowContentSwitcher] =
    React.useState<boolean>(true);
  const [isOpen, setIsOpen] = React.useState<boolean>(isOpenProp);

  const handleClassicRibbon = React.useCallback((): void => {
    setEnableSimplifiedRibbon(false);

    if (onClassicRibbon) onClassicRibbon();
  }, [onClassicRibbon]);

  const handleSimplifiedRibbon = React.useCallback((): void => {
    setEnableSimplifiedRibbon(true);

    if (onSimplifiedRibbon) onSimplifiedRibbon();
  }, [onSimplifiedRibbon]);

  const handleAlwaysShowRibbon = React.useCallback((): void => {
    setAlwaysShowContentSwitcher(true);

    if (onAlwaysShow) onAlwaysShow();

    if (!onIsOpenChange) {
      setIsOpen(true);

      return;
    }

    onIsOpenChange(true);
  }, [onAlwaysShow, onIsOpenChange]);

  const handleAutomaticallyHideRibbon = React.useCallback((): void => {
    setAlwaysShowContentSwitcher(false);

    if (onAutomaticallyHide) onAutomaticallyHide();

    if (!onIsOpenChange) {
      setIsOpen(false);

      return;
    }

    onIsOpenChange(false);
  }, [onAutomaticallyHide, onIsOpenChange]);

  React.useEffect(() => {
    setIsOpen(isOpenProp);
  }, [isOpenProp]);

  const getItems = React.useMemo((): Array<MenuItemType> => {
    return [
      {
        text: ribbonLayoutText,
        isSeparator: true,
      },
      {
        text: classicRibbonText,
        action: handleClassicRibbon,
        iconSvg: !toggleSimplifiedRibbon && check,
      },
      {
        text: simplifiedRibbonText,
        action: handleSimplifiedRibbon,
        iconSvg: toggleSimplifiedRibbon && check,
      },
      {
        text: showRibbonText,
        isSeparator: true,
      },
      {
        text: alwaysShowRibbonText,
        action: handleAlwaysShowRibbon,
        iconSvg: toggleContentSwitcher && check,
      },
      {
        text: automaticallyHideRibbonText,
        action: handleAutomaticallyHideRibbon,
        iconSvg: !toggleContentSwitcher && check,
      },
    ];
  }, [
    handleClassicRibbon,
    handleSimplifiedRibbon,
    handleAlwaysShowRibbon,
    handleAutomaticallyHideRibbon,
    toggleSimplifiedRibbon,
    toggleContentSwitcher,
    showRibbonText,
    simplifiedRibbonText,
    classicRibbonText,
    showRibbonText,
    alwaysShowRibbonText,
    automaticallyHideRibbonText,
  ]);

  const handleOnMouseEnter = React.useCallback((): void => {
    if (isOpenProp) {
      onIsOpenChange && onIsOpenChange(true);
      setIsOpen(true);
    }
  }, [isOpenProp, onIsOpenChange]);

  const handleOnMouseLeave = React.useCallback((): void => {
    if (!toggleContentSwitcher && isOpenProp) {
      onIsOpenChange && onIsOpenChange(false);
      setIsOpen(false);
    }
  }, [isOpenProp, toggleContentSwitcher]);

  React.useEffect(() => {
    setIsCoverPanelOpen(isCoverPanelOpenProp);
  }, [isCoverPanelOpenProp]);

  const contentMap = React.useMemo((): {} => {
    const childArray = React.Children.toArray(children);

    if (!(childArray instanceof Array)) return {};

    return (childArray as Array<React.ReactElement<any>>).reduce(
      (
        acc: { [key: string]: React.ReactNode },
        cur: React.ReactElement<any>,
      ) => ({
        ...acc,
        [cur.props.name]: cur.props.children,
      }),
      {},
    );
  }, [children]);

  const fallbackContent = React.useMemo(
    (): React.ReactNode => getOr(null, '[0].props.children', children),
    [children],
  );

  const tabs = React.useMemo(
    (): RibbonBarTabProps[] =>
      React.Children.map(children, (child: React.ReactElement<any>) => ({
        id: child.props.name,
        text: !isNil(child.props.text) ? child.props.text : child.props.name,
        iconSvg: child.props.iconSvg,
        isDisabled: child.props.isDisabled === true,
        isContextual: child.props.isContextual,
        isBackArrowVisible: child.props.isBackArrowVisible,
        panelContent: child.props.panelContent,
        sidebarContent: child.props.sidebarContent,
      })),
    [children],
  );

  const handleResize = React.useCallback(
    throttle(16, (width: number): void => {
      if (width === undefined) return;

      setTabBarWidth(width);
    }),
    [],
  );

  const handleTabsThatFit = React.useCallback(
    (
      tabsThatFit: RibbonBarTabProps[],
      contextualTabs: Set<RibbonBarTabProps>,
    ) => {
      const newTabs = new Set();

      tabsThatFit.forEach((tab: RibbonBarTabProps) => {
        if (tab.id === activeTabName || tab.isBackArrowVisible) {
          newTabs.add(tab);
        }
      });
      for (let i = 0; i < contextualTabs.size; i++) {
        tabsThatFit.length = tabsThatFit.length - 1;
      }

      return [...new Set([...newTabs, ...tabsThatFit, ...contextualTabs])];
    },
    [],
  );

  const visibleTabs = React.useMemo((): RibbonBarTabProps[] => {
    const contextualTabs = new Set<RibbonBarTabProps>();
    const selectedTab: RibbonBarTabProps = find({ id: activeTabName }, tabs);
    const tabsThatFit: RibbonBarTabProps[] = takeMax(
      tabBarWidth + 25,
      getTabWidth(maxChars),
      tabs,
    );

    find((tab: RibbonBarTabProps) => {
      if (tab.isContextual) contextualTabs.add(tab);
    }, tabs);

    return !selectedTab || includes(selectedTab, tabsThatFit)
      ? handleTabsThatFit(tabsThatFit, contextualTabs)
      : [...initial(tabsThatFit), selectedTab];
  }, [maxChars, tabs, tabBarWidth, activeTabName, handleTabsThatFit]);

  const handleActiveTabNameChange = React.useCallback(
    (tab: RibbonBarTabProps): void => {
      !tab.isBackArrowVisible &&
        onActiveTabNameChange &&
        onActiveTabNameChange(tab.id);

      onCoverPanelIsOpenChange?.(tab.isBackArrowVisible);

      if (!onCoverPanelIsOpenChange) {
        setIsCoverPanelOpen(tab.isBackArrowVisible);
        return;
      }

      onCoverPanelIsOpenChange(tab.isBackArrowVisible);
      setSelectedTab(tab);
    },
    [onActiveTabNameChange, onCoverPanelIsOpenChange],
  );

  const handleClose = React.useCallback((): void => {
    if (!onCoverPanelIsOpenChange) {
      setIsCoverPanelOpen(false);
      return;
    }

    if (onCoverPanelIsOpenChange) onCoverPanelIsOpenChange(false);
  }, [onCoverPanelIsOpenChange]);

  const getIsTabSelected = React.useCallback(
    (tab): boolean => {
      const firstTabId: React.ReactText = tabs[0].id;

      if (!activeTabName) {
        return firstTabId === tab.id;
      }

      if (
        !includes(
          activeTabName,
          tabs.map(t => t.id),
        )
      ) {
        return tab.id === firstTabId;
      }

      return tab.id === activeTabName;
    },
    [activeTabName, tabs],
  );

  const handleTabSelect = React.useCallback(
    (tab: RibbonBarTabProps, e?): void => {
      if (tab.id === '' || activeTabName === tab.id) return;

      handleActiveTabNameChange(tab);
    },
    [handleActiveTabNameChange, activeTabName],
  );

  const getOverflowItems = React.useCallback((): Array<{
    action: (...actionArguments: Array<any>) => void;
    text: string;
    disabled?: boolean;
  }> => {
    const overflowTabs: RibbonBarTabProps[] = without(visibleTabs, tabs);

    return overflowTabs.map((tab: RibbonBarTabProps) => ({
      action: () => handleTabSelect(tab),
      text: startCase(tab.text),
      disabled: tab.isDisabled,
    }));
  }, [handleTabSelect, tabs, visibleTabs]);

  const onClickOutside = React.useCallback((): void => {
    onCoverPanelIsOpenChange?.(false);

    if (!onCoverPanelIsOpenChange) {
      setIsCoverPanelOpen(false);
    }
  }, [onCoverPanelIsOpenChange]);

  return (
    <div className={classnames(classes.root, className)} {...rest}>
      <motion.div
        animate={{
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'all' : 'none',
        }}
        initial={false}
        transition={{ duration: 0.25 }}
      >
        <div
          onMouseEnter={handleOnMouseEnter}
          onMouseLeave={handleOnMouseLeave}
          className={classes.container}
          style={{
            height: toggleSimplifiedRibbon
              ? CLASSIC_RIBBON_HEIGHT
              : SIMPLIFIED_RIBBON_HEIGHT,
          }}
        >
          <div className={classes.toolbar}>
            <div className={classes.tabBarWrapper}>
              <ResizeDetector
                handleWidth
                onResize={handleResize}
                refreshMode="throttle"
                refreshRate={50}
              />
              <div className={classes.visibleTabs}>
                {visibleTabs
                  .map((tab: RibbonBarTabProps) => ({
                    ...tab,
                    text: startCase(tab.text),
                  }))
                  .map((tab: RibbonBarTabProps, index: number) => (
                    <div
                      key={index}
                      className={classnames(
                        classes.tab,
                        {
                          [classes.selected]:
                            getIsTabSelected(tab) && !tab.isBackArrowVisible,
                          [classes.disabled]: tab.isDisabled,
                          [classes.contextual]:
                            tab.isContextual && !tab.isBackArrowVisible,
                        },
                        className,
                      )}
                      onClick={e => handleTabSelect(tab, e)}
                      title={tab.text}
                    >
                      {tab.text}
                    </div>
                  ))}
              </div>
              <OverflowButton
                className={classes.overflow}
                iconSvg={chevronDown}
                items={getItems}
                title={overflowTooltipText}
              />
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
          </div>
          <ContentSwitcher
            className={classes.view}
            contentKey={activeTabName.toString()}
            contentMap={contentMap}
            fallbackContent={fallbackContent}
          />
        </div>
      </motion.div>
      {showIf(isCoverPanelOpen)(
        <ClickAwayListener
          onClickAway={() => {
            onClickOutside();
          }}
        >
          <CoverPanel
            className={classes.coverPanel}
            isOpen={true}
            width={Number(theme.mixins.readableWidth.maxWidth)}
          >
            <div className={classes.panel}>
              {tabs.map((tab: RibbonBarTabProps, index: number) => {
                if (tab.id === selectedTab?.id) {
                  return (
                    <ThemeProvider theme={sidebarTheme} key={index}>
                      <div className={classes.sidebar}>
                        <ListItem
                          className={classes.close}
                          iconSvgAccessor="iconSvg"
                          item={{ text: closeText, iconSvg: leftArrow }}
                          primaryTextAccessor="text"
                          onClick={handleClose}
                          classes={{ icon: classes.closeIcon }}
                        />
                        {tab.sidebarContent && tab.sidebarContent(tab)}
                      </div>
                    </ThemeProvider>
                  );
                } else return <span key={index} />;
              })}
              {tabs.map((tab: RibbonBarTabProps, index: number) => {
                if (tab.id === selectedTab?.id) {
                  return (
                    <div className={classes.panelContent} key={index}>
                      {tab.panelContent && tab.panelContent(tab)}
                    </div>
                  );
                } else return <span key={index} />;
              })}
            </div>
          </CoverPanel>
        </ClickAwayListener>,
      )}
    </div>
  );
}

export default React.memo(RibbonBarTabs);

function formatText(maxChars: number, text: React.ReactText) {
  return truncate({ length: maxChars, omission: '…' }, startCase(text));
}

function getTabWidth(maxChars: number) {
  const padding = 16;

  return (tab: RibbonBarTabProps) => {
    const text = formatText(maxChars, tab.text);

    return getTextWidth('16px Roboto', text) + padding * 2;
  };
}

function takeMax(maxValue: number, getValue, items: RibbonBarTabProps[]) {
  return takeWhile(
    items,
    (_: RibbonBarTabProps, i: number, xs: Array<string | number>) =>
      sum(xs.slice(0, i + 1).map(getValue)) <= maxValue,
  );
}
