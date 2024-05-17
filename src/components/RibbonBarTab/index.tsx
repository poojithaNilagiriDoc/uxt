import React from 'react';

export interface RibbonBarTabProps {
  id?: React.ReactText;
  activeTabName?: string;
  children?: React.ReactNode;
  isContextual?: boolean;
  isDisabled?: boolean;
  name?: string;
  isBackArrowVisible?: boolean;
  panelContent?: (tab: RibbonBarTabProps) => React.ReactNode;
  sidebarContent?: (tab: RibbonBarTabProps) => React.ReactNode;
  text?: string;
}

function RibbonBarTab(props: RibbonBarTabProps) {
  return null;
}

export default React.memo(RibbonBarTab);
