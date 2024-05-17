import React from 'react';
import bold from 'uxt-graphics/icons/bold';
import textFormat from 'uxt-graphics/icons/text-format';
import RibbonBarToggleIconButton from '../index';

export default function RibbonBarToggleIconButtonBasics() {
  const [isActive, setIsActive] = React.useState<boolean>(false);

  return (
    <>
      <RibbonBarToggleIconButton
        iconSvg={bold}
        isActive={isActive}
        onIsActiveChange={setIsActive}
        title="Bold"
      />
      <RibbonBarToggleIconButton
        style={{ marginTop: 8 }}
        iconSvg={textFormat}
        appearance="classic"
        title="Tex Format"
      />
    </>
  );
}
