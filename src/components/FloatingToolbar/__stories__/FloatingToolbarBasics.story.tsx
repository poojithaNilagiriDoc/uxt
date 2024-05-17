import React from 'react';
import add from 'uxt-graphics/icons/add';
import closeSvg from 'uxt-graphics/icons/close';
import edit from 'uxt-graphics/icons/edit';
import star from 'uxt-graphics/icons/star';
import trash from 'uxt-graphics/icons/trash';
import user from 'uxt-graphics/icons/user';
import IconButton from '../../IconButton';
import OverflowButton from '../../OverflowButton';
import Shell from '../../Shell';
import ToggleIconButton from '../../ToggleIconButton';
import FloatingToolbar from '../index';

export default function FloatingToolbarBasics() {
  return (
    <Shell style={{ alignItems: 'center', paddingTop: 24 }}>
      <FloatingToolbar>
        <IconButton iconSvg={add} />
        <ToggleIconButton iconSvg={closeSvg} isActive={true} />
        <ToggleIconButton iconSvg={trash} />
        <OverflowButton
          iconSvg={edit}
          items={[
            { iconSvg: star, text: 'star' },
            { iconSvg: user, text: 'user' },
          ]}
        />
      </FloatingToolbar>
    </Shell>
  );
}
