import React from 'react';
import edit from 'uxt-graphics/icons/edit';
import RibbonBarSplitButton from '../index';

export default function RibbonBarSplitButtonBasics() {
  return (
    <>
      <RibbonBarSplitButton
        style={{ margin: 16 }}
        iconSvg={edit}
        popoverContent={<p>Content</p>}
      />
      <RibbonBarSplitButton
        style={{ margin: 16 }}
        iconSvg={edit}
        appearance="classic"
        popoverContent={<h1>Content</h1>}
        isActive={true}
      />
    </>
  );
}
