import React from 'react';
import comment from 'uxt-graphics/icons/comment';
import Shell from '../../Shell';
import RibbonBarButton from '../index';

export default function RibbonBarButtonBasics() {
  return (
    <Shell>
      <RibbonBarButton
        style={{ margin: 16 }}
        text="new comment"
        iconSvg={comment}
      />
      <RibbonBarButton
        style={{ margin: 16 }}
        appearance="classic"
        text="new comment"
        iconSvg={comment}
      />
    </Shell>
  );
}
