import React from 'react';
import documentSvg from 'uxt-graphics/icons/document';
import star from 'uxt-graphics/icons/star';
import ListItem from '../../ListItem';
import SidebarGroupItem from '../index';

export default function SidebarGroupItemDynamic() {
  const [selectedId, setSelectedId] = React.useState();

  return (
    <div style={{ width: 420 }}>
      <SidebarGroupItem
        iconSvgAccessor="iconSvg"
        isSelected={selectedId === 'delta' || selectedId === 'echo'}
        item={{ text: 'Beta', iconSvg: star }}
        primaryTextAccessor={'text'}
      >
        <ListItem
          iconSvgAccessor="iconSvg"
          item={{ text: 'Delta', iconSvg: documentSvg }}
          primaryTextAccessor="text"
          onClick={() => setSelectedId('delta')}
        />
        <ListItem
          iconSvgAccessor="iconSvg"
          item={{ text: 'Echo', iconSvg: documentSvg }}
          primaryTextAccessor="text"
          onClick={() => setSelectedId('echo')}
        />
      </SidebarGroupItem>
      <SidebarGroupItem
        iconSvgAccessor="iconSvg"
        item={{ text: 'Foxtrot', iconSvg: star }}
        primaryTextAccessor={'text'}
        isSelected={selectedId === 'hotel' || selectedId === 'india'}
      >
        <ListItem
          iconSvgAccessor="iconSvg"
          item={{ text: 'Hotel', iconSvg: documentSvg }}
          primaryTextAccessor="text"
          onClick={() => setSelectedId('hotel')}
        />
        <ListItem
          iconSvgAccessor="iconSvg"
          item={{ text: 'India', iconSvg: documentSvg }}
          primaryTextAccessor="text"
          onClick={() => setSelectedId('india')}
        />
      </SidebarGroupItem>
    </div>
  );
}
