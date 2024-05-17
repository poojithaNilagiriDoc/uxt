import React from 'react';
import star from 'uxt-graphics/icons/star';
import RibbonBarButton from '../../RibbonBarButton';
import RibbonBarTooltip from '../index';
import RibbonBarIconButton from '../../RibbonBarIconButton';

function RibbonBarTooltipBasics() {
  return (
    <>
      <RibbonBarTooltip style={{ margin: 16 }} title="Star" placement="bottom">
        <RibbonBarIconButton iconSvg={star} />
      </RibbonBarTooltip>
      <RibbonBarButton text="Hover me!" />
    </>
  );
}

export default RibbonBarTooltipBasics;
