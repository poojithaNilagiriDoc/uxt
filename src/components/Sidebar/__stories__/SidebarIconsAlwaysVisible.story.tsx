import React from 'react';
import documentSvg from 'uxt-graphics/icons/document';
import filter from 'uxt-graphics/icons/filter';
import gear from 'uxt-graphics/icons/gear';
import home from 'uxt-graphics/icons/home';
import star from 'uxt-graphics/icons/star';
import Button from '../../Button';
import ListItem from '../../ListItem';
import Shell from '../../Shell';
import ShellContent from '../../ShellContent';
import ShellMain from '../../ShellMain';
import Topbar from '../../Topbar';
import Sidebar from '../index';
import SidebarGroupItem from '../../SidebarGroupItem';

export default function SidebarIconsAlwaysVisible() {
  const [areIconsAlwaysVisible, setAreIconsAlwaysVisible] =
    React.useState(true);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [selectedId, setSelectedId] = React.useState('beta');

  return (
    <Shell>
      <Topbar
        onMenuPress={() => setIsOpen(!isOpen)}
        pageTitle="Sidebar: Icons Always Visible"
        showMenuButton={true}
      />
      <ShellMain>
        <Sidebar
          areIconsAlwaysVisible={areIconsAlwaysVisible}
          isOpen={isOpen}
          onIsOpenChange={setIsOpen}
        >
          <ListItem
            iconSvgAccessor="iconSvg"
            isSelected={selectedId === 'beta'}
            item={{ text: 'Beta', iconSvg: star }}
            onClick={() => setSelectedId('beta')}
            primaryTextAccessor="text"
          />
          <ListItem
            iconSvgAccessor="iconSvg"
            isSelected={selectedId === 'charlie'}
            item={{ text: 'Charlie', iconSvg: home }}
            onClick={() => setSelectedId('charlie')}
            primaryTextAccessor="text"
          />
          <SidebarGroupItem
            iconSvgAccessor="iconSvg"
            isSelected={selectedId === 'golf' || selectedId === 'hotel'}
            item={{ text: 'Foxtrot', iconSvg: filter }}
            primaryTextAccessor="text"
          >
            <ListItem
              iconSvgAccessor="iconSvg"
              isSelected={selectedId === 'golf'}
              item={{ text: 'Golf', iconSvg: documentSvg }}
              onClick={() => setSelectedId('golf')}
              primaryTextAccessor="text"
            />
            <ListItem
              iconSvgAccessor="iconSvg"
              isSelected={selectedId === 'hotel'}
              item={{ text: 'Hotel', iconSvg: gear }}
              onClick={() => setSelectedId('hotel')}
              primaryTextAccessor="text"
            />
          </SidebarGroupItem>
          <ListItem
            iconSvgAccessor="iconSvg"
            isSelected={selectedId === 'delta'}
            item={{ text: 'Delta', iconSvg: documentSvg }}
            onClick={() => setSelectedId('delta')}
            primaryTextAccessor="text"
          />
          <ListItem
            iconSvgAccessor="iconSvg"
            isSelected={selectedId === 'echo'}
            item={{ text: 'Echo', iconSvg: gear }}
            onClick={() => setSelectedId('echo')}
            primaryTextAccessor="text"
          />
        </Sidebar>
        <ShellContent>
          <Button
            onClick={() => setAreIconsAlwaysVisible(!areIconsAlwaysVisible)}
            text="Toggle Icons Always Visible"
          />
        </ShellContent>
      </ShellMain>
    </Shell>
  );
}
