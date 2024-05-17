import React from 'react';
import documentSvg from 'uxt-graphics/icons/document';
import gear from 'uxt-graphics/icons/gear';
import home from 'uxt-graphics/icons/home';
import star from 'uxt-graphics/icons/star';
import color from 'uxt-graphics/icons/color';
import date from 'uxt-graphics/icons/date';
import extension from 'uxt-graphics/icons/extension';
import documentAdd from 'uxt-graphics/icons/document-add';
import folder from 'uxt-graphics/icons/folder';
import info from 'uxt-graphics/icons/info';
import model from 'uxt-graphics/icons/model';
import upload from 'uxt-graphics/icons/upload';
import wrench from 'uxt-graphics/icons/wrench';
import mail from 'uxt-graphics/icons/mail';
import save from 'uxt-graphics/icons/save';
import open from 'uxt-graphics/icons/open';
import ListItem from '../../ListItem';
import Shell from '../../Shell';
import ShellMain from '../../ShellMain';
import Topbar from '../../Topbar';
import Sidebar from '../../Sidebar';
import Orientation from '../../constants/orientation';
import ScrollableContainer from '../index';

export default function ScrollableVerticalContainer() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Shell>
      <Topbar
        onMenuPress={() => setIsOpen(!isOpen)}
        pageTitle="Sidebar: Icons Always Visible"
        showMenuButton={true}
      />
      <ShellMain>
        <Sidebar
          areIconsAlwaysVisible={true}
          isOpen={isOpen}
          onIsOpenChange={setIsOpen}
        >
          <ScrollableContainer
            enableScroll={!isOpen}
            orientation={Orientation.Vertical}
          >
            <ListItem
              iconSvgAccessor="iconSvg"
              item={{ text: 'Beta', iconSvg: star }}
              primaryTextAccessor="text"
            />
            <ListItem
              iconSvgAccessor="iconSvg"
              item={{ text: 'Charlie', iconSvg: home }}
              primaryTextAccessor="text"
            />
            <ListItem
              iconSvgAccessor="iconSvg"
              item={{ text: 'Golf', iconSvg: documentSvg }}
              primaryTextAccessor="text"
            />
            <ListItem
              iconSvgAccessor="iconSvg"
              item={{ text: 'Hotel', iconSvg: gear }}
              primaryTextAccessor="text"
            />
            <ListItem
              iconSvgAccessor="iconSvg"
              item={{ text: 'Delta', iconSvg: documentSvg }}
              primaryTextAccessor="text"
            />
            <ListItem
              iconSvgAccessor="iconSvg"
              item={{ text: 'Echo', iconSvg: gear }}
              primaryTextAccessor="text"
            />
            <ListItem
              iconSvgAccessor="iconSvg"
              item={{ text: 'Color', iconSvg: color }}
              primaryTextAccessor="text"
            />
            <ListItem
              iconSvgAccessor="iconSvg"
              item={{ text: 'Date', iconSvg: date }}
              primaryTextAccessor="text"
            />
            <ListItem
              iconSvgAccessor="iconSvg"
              item={{ text: 'Extension', iconSvg: extension }}
              primaryTextAccessor="text"
            />
            <ListItem
              iconSvgAccessor="iconSvg"
              item={{ text: 'Add document', iconSvg: documentAdd }}
              primaryTextAccessor="text"
            />
            <ListItem
              iconSvgAccessor="iconSvg"
              item={{ text: 'Folder', iconSvg: folder }}
              primaryTextAccessor="text"
            />
            <ListItem
              iconSvgAccessor="iconSvg"
              item={{ text: 'Info', iconSvg: info }}
              primaryTextAccessor="text"
            />
            <ListItem
              iconSvgAccessor="iconSvg"
              item={{ text: 'Model', iconSvg: model }}
              primaryTextAccessor="text"
            />
            <ListItem
              iconSvgAccessor="iconSvg"
              item={{ text: 'Wrench', iconSvg: wrench }}
              primaryTextAccessor="text"
            />
            <ListItem
              iconSvgAccessor="iconSvg"
              item={{ text: 'Mail', iconSvg: mail }}
              primaryTextAccessor="text"
            />
            <ListItem
              iconSvgAccessor="iconSvg"
              item={{ text: 'Save', iconSvg: save }}
              primaryTextAccessor="text"
            />
            <ListItem
              iconSvgAccessor="iconSvg"
              item={{ text: 'Open', iconSvg: open }}
              primaryTextAccessor="text"
            />
            <ListItem
              iconSvgAccessor="iconSvg"
              item={{ text: 'Upload', iconSvg: upload }}
              primaryTextAccessor="text"
            />
          </ScrollableContainer>
        </Sidebar>
      </ShellMain>
    </Shell>
  );
}
