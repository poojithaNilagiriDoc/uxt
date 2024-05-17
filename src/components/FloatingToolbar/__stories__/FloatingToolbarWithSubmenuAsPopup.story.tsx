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
import Orientation from '../../constants/orientation';

export default function FloatingToolbarWithSubmenuAsPopup() {
  const [isClipActive, setIsClipActive] = React.useState<boolean>(false);
  const [isClipOpen, setIsClipOpen] = React.useState<boolean>(false);
  const [isEditActive, setIsEditActive] = React.useState<boolean>(false);
  const [isEditOpen, setIsEditOpen] = React.useState<boolean>(false);

  return (
    <Shell style={{ alignItems: 'center', paddingTop: 24 }}>
      <FloatingToolbar>
        <IconButton iconSvg={measure} />
        <FloatingToolbarSubmenu
          displayMode="popup"
          popupOrientation={Orientation.Vertical}
          iconSvg={clip}
          isActive={isClipActive}
          isOpen={isClipOpen}
          onFabClick={(x: boolean) => {
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
          keepPopupOpen={true}
          iconSvg={edit}
          isActive={isEditActive}
          isOpen={isEditOpen}
          onFabClick={(x: boolean) => {
            setIsEditOpen(x);
            setIsEditActive(true);
          }}
          displayMode="popup"
          popupOrientation={Orientation.Horizontal}
        >
          <IconButton
            iconSvg={add}
            onClick={() => console.log('Clicked add')}
          />
          <IconButton
            iconSvg={add}
            onClick={() => console.log('Clicked add')}
          />
          <IconButton
            iconSvg={closeSvg}
            onClick={() => {
              setIsEditOpen(false);
              setIsEditActive(false);
              console.log('Clicked close');
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
