import React from 'react';

export interface TabProps {
  activeTabName?: string;
  children?: React.ReactNode;
  iconSvg?: string;
  isDisabled?: boolean;
  name?: string;
  text?: string;
}

function Tab(props: TabProps) {
  return null;
}

export default React.memo(Tab);
