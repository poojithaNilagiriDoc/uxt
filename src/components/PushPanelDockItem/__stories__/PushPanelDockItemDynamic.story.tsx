import React from 'react';
import star from 'uxt-graphics/icons/star';
import PushPanelDockItem from '../index';

interface ItemProps {
  title?: string;
  iconSvgName?: string;
}

const Item: ItemProps = {
  iconSvgName: star,
  title: 'star',
};

export default function PushPanelDockItemDynamic() {
  const [isActive, setIsActive] = React.useState<boolean>(false);

  return (
    <PushPanelDockItem
      item={Item}
      iconSvgAccessor="iconSvgName"
      iconSize="regular"
      isActive={isActive}
      onIsActiveChange={() => setIsActive(!isActive)}
      title={Item.title}
    >
      DockItem Custom Content
    </PushPanelDockItem>
  );
}
