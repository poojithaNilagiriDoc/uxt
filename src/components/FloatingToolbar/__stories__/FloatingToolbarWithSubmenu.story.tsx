import React from 'react';
import add from 'uxt-graphics/icons/add';
import clip from 'uxt-graphics/icons/clip';
import closeSvg from 'uxt-graphics/icons/close';
import edit from 'uxt-graphics/icons/edit';
import measure from 'uxt-graphics/icons/measure';
import star from 'uxt-graphics/icons/star';
import trash from 'uxt-graphics/icons/trash';
import FloatingToolbarSubmenu from '../../FloatingToolbarSubmenu';
import IconButton from '../../IconButton';
import OverflowButton from '../../OverflowButton';
import Shell from '../../Shell';
import ToggleIconButton from '../../ToggleIconButton';
import FloatingToolbar from '../index';

export default function FloatingToolbarWithSubmenu() {
  const [isClipActive, setIsClipActive] = React.useState(false);
  const [isClipOpen, setIsClipOpen] = React.useState(false);
  const [isEditActive, setIsEditActive] = React.useState(false);
  const [isEditOpen, setIsEditOpen] = React.useState(false);

  return (
    <Shell style={{ alignItems: 'center', paddingTop: 24 }}>
      <FloatingToolbar>
        <IconButton iconSvg={measure} />
        <FloatingToolbarSubmenu
          iconSvg={clip}
          isActive={isClipActive}
          isOpen={isClipOpen}
          onFabClick={x => {
            setIsClipOpen(x);
            setIsClipActive(true);
          }}
        >
          <IconButton iconSvg={add} />
          <IconButton iconSvg={add} />
          <IconButton
            iconSvg={closeSvg}
            onClick={() => {
              setIsClipOpen(false);
              setIsClipActive(false);
            }}
          />
        </FloatingToolbarSubmenu>
        <IconButton iconSvg={star} />
        <ToggleIconButton iconSvg={closeSvg} />
        <ToggleIconButton iconSvg={trash} />
        <FloatingToolbarSubmenu
          iconSvg={edit}
          isActive={isEditActive}
          isOpen={isEditOpen}
          onFabClick={x => {
            setIsEditOpen(x);
            setIsEditActive(true);
          }}
        >
          <IconButton iconSvg={add} />
          <IconButton
            iconSvg={closeSvg}
            onClick={() => {
              setIsEditOpen(false);
              setIsEditActive(false);
            }}
          />
        </FloatingToolbarSubmenu>
        <OverflowButton
          iconSvg={star}
          items={[
            { action: () => {}, text: 'Star' },
            { action: () => {}, text: 'User' },
          ]}
        />
      </FloatingToolbar>
    </Shell>
  );
}
