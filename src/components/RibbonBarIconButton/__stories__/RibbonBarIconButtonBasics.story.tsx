import React from 'react';
import bold from 'uxt-graphics/icons/bold';
import textFormat from 'uxt-graphics/icons/text-format';
import RibbonBarIconButton from '../index';

export default function RibbonBarIconButtonBasics() {
  return (
    <>
      <RibbonBarIconButton style={{ margin: 16 }} iconSvg={bold} />
      <RibbonBarIconButton
        style={{ margin: 16 }}
        iconSvg={textFormat}
        appearance="classic"
        title="Text Format"
      />
    </>
  );
}
