import startCase from 'lodash/fp/startCase';
import React from 'react';
import bold from 'uxt-graphics/icons/bold';
import copy from 'uxt-graphics/icons/copy';
import cut from 'uxt-graphics/icons/cut';
import document from 'uxt-graphics/icons/document';
import formatPainter from 'uxt-graphics/icons/format-painter';
import home from 'uxt-graphics/icons/home';
import italic from 'uxt-graphics/icons/italic';
import open from 'uxt-graphics/icons/open';
import search from 'uxt-graphics/icons/page-find-text';
import paste from 'uxt-graphics/icons/paste';
import redo from 'uxt-graphics/icons/redo';
import save from 'uxt-graphics/icons/save';
import underline from 'uxt-graphics/icons/underline';
import undo from 'uxt-graphics/icons/undo';
import SelectionMode from '../../constants/selectionMode';
import DropdownChoice, { DropdownChoiceProps } from '../../DropdownChoice';
import List from '../../List';
import RibbonBarButton, { RibbonBarTypes } from '../../RibbonBarButton';
import RibbonBarDropdownButton from '../../RibbonBarDropdownButton';
import RibbonBarDropdownList, { Items } from '../../RibbonBarDropdownList';
import RibbonBarIconButton from '../../RibbonBarIconButton';
import RibbonBarSplitButton from '../../RibbonBarSplitButton';
import RibbonBarTab from '../../RibbonBarTab';
import RibbonBarToggleIconButton from '../../RibbonBarToggleIconButton';
import RibbonBarToggleIconButtonGroup from '../../RibbonBarToggleIconButtonGroup';
import Shell from '../../Shell';
import ShellContent from '../../ShellContent';
import ShellMain from '../../ShellMain';
import Sidebar from '../../Sidebar';
import Topbar from '../../Topbar';
import Tabs from '../index';

interface Item {
  [key: string]: any;
}

interface RibbonBarDropdownListChoiceProps extends DropdownChoiceProps {
  fontFamily: React.CSSProperties['fontFamily'];
}

const sidebarItems: Array<Item> = [
  { text: 'Home', iconSvg: home, id: 'home' },
  { text: 'Open', iconSvg: open, id: 'open' },
  { text: 'Save', iconSvg: save, id: 'save' },
];

export default function RibbonBarTabsBasics() {
  const [activeTab, setActiveTab] = React.useState<React.ReactText>('home');
  const [selectedId, setSelectedId] = React.useState<React.ReactText>('home');
  const [isOpen, setIsOpen] = React.useState<boolean>(true);
  const [isCoverPanelOpen, setIsCoverPanelOpen] =
    React.useState<boolean>(false);
  const [toggleRibbonView, setToggleRibbonView] =
    React.useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [ribbonBarType, setRibbonBarType] =
    React.useState<RibbonBarTypes>('simplified');
  const [value, setValue] = React.useState<string>();
  const [isActive, setIsActive] = React.useState<boolean>();
  const [activeItems, setActiveItems] = React.useState<Items>([]);
  const items: Items = [
    { iconSvg: italic, title: 'Italic' },
    { iconSvg: underline, title: 'Underline' },
    { iconSvg: bold, title: 'Bold' },
  ];

  const getPanelContent = React.useCallback(
    (): JSX.Element => <h1>{startCase(selectedId)}</h1>,
    [selectedId],
  );

  const getSidebarContent = React.useCallback(
    (): JSX.Element => (
      <List
        items={sidebarItems}
        iconSvgAccessor="iconSvg"
        primaryTextAccessor="text"
        selectedId={selectedId}
        onSelectedIdChange={id => setSelectedId(id)}
      />
    ),
    [selectedId],
  );

  const getPasteContent = React.useCallback((): React.ReactNode => {
    return (
      <div style={{ height: 112, width: 130, display: 'flex' }}>
        <List
          rowHeight={32}
          primaryTextAccessor={'text'}
          iconSvgAccessor={'iconSvg'}
          items={[
            { iconSvg: cut, text: 'Cut', id: 1 },
            { iconSvg: copy, text: 'Copy', id: 2 },
            { iconSvg: paste, text: 'Paste', id: 3 },
          ]}
        />
      </div>
    );
  }, []);

  const getUndoContent = React.useCallback((): React.ReactNode => {
    return (
      <div style={{ height: 80, width: 130, display: 'flex' }}>
        <List
          rowHeight={32}
          primaryTextAccessor={'text'}
          iconSvgAccessor={'iconSvg'}
          items={[
            { iconSvg: undo, text: 'Undo', id: 1 },
            { iconSvg: redo, text: 'Redo', id: 2 },
          ]}
        />
      </div>
    );
  }, []);

  return (
    <Shell>
      <Topbar
        onMouseEnter={() => toggleRibbonView && setIsOpen(true)}
        onMouseLeave={() => toggleRibbonView && setIsOpen(false)}
        pageTitle="Page Title"
        showMenuButton={true}
        onMenuPress={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <ShellMain>
        <Sidebar isOpen={isSidebarOpen} onIsOpenChange={setIsSidebarOpen}>
          Sidebar Content
        </Sidebar>
        <ShellContent>
          <Tabs
            isOpen={isOpen}
            onIsOpenChange={setIsOpen}
            onAutomaticallyHide={() => setToggleRibbonView(true)}
            onAlwaysShow={() => setToggleRibbonView(false)}
            activeTabName={activeTab}
            onActiveTabNameChange={tab => setActiveTab(tab)}
            isCoverPanelOpen={isCoverPanelOpen}
            onCoverPanelIsOpenChange={setIsCoverPanelOpen}
            onClassicRibbon={() => setRibbonBarType('classic')}
            onSimplifiedRibbon={() => setRibbonBarType('simplified')}
          >
            <RibbonBarTab
              name="file"
              isBackArrowVisible={true}
              panelContent={getPanelContent}
              sidebarContent={getSidebarContent}
            >
              <h3>File</h3>
            </RibbonBarTab>
            <RibbonBarTab name="home">
              <div style={{ display: 'flex' }}>
                <RibbonBarDropdownButton
                  iconSvg={paste}
                  appearance={ribbonBarType}
                  popoverContent={getPasteContent()}
                  title="Paste"
                />
                <RibbonBarSplitButton
                  iconSvg={undo}
                  appearance={ribbonBarType}
                  popoverContent={getUndoContent()}
                  title="Undo"
                />
                <RibbonBarIconButton
                  iconSvg={formatPainter}
                  appearance={ribbonBarType}
                  title="Format Painter"
                />
                <RibbonBarDropdownList
                  placeholder="Font"
                  onValueChange={setValue}
                  value={value}
                  showFilterItems={true}
                  separateAccessor={'isSeparator'}
                  title="Font"
                  style={{ margin: 8 }}
                >
                  {getItems().map((item: RibbonBarDropdownListChoiceProps) => (
                    <DropdownChoice
                      key={item.value}
                      text={item.text}
                      value={item.value}
                      style={{ fontFamily: item.fontFamily }}
                      isSeparator={item.isSeparator}
                    />
                  ))}
                </RibbonBarDropdownList>
                <RibbonBarToggleIconButtonGroup
                  selectionMode={SelectionMode.Multiple}
                  onActiveItemsChange={setActiveItems}
                  activeItems={activeItems}
                  items={items}
                />
                <RibbonBarButton
                  iconSvg={search}
                  appearance={ribbonBarType}
                  text="search"
                  title="Search"
                />
                <RibbonBarToggleIconButton
                  iconSvg={document}
                  appearance={ribbonBarType}
                  isActive={isActive}
                  onClick={() => setIsActive(!isActive)}
                  title="File"
                />
              </div>
            </RibbonBarTab>
            <RibbonBarTab name="insert">
              <h3>Insert</h3>
            </RibbonBarTab>
            <RibbonBarTab name="layout">
              <h3>Layout</h3>
            </RibbonBarTab>
            <RibbonBarTab name="references">
              <h3>References</h3>
            </RibbonBarTab>
            <RibbonBarTab name="review">
              <h3>Review</h3>
            </RibbonBarTab>
            <RibbonBarTab name="view" isContextual={true}>
              <h3>View</h3>
            </RibbonBarTab>
            <RibbonBarTab name="help" isContextual={true}>
              <h3>Help</h3>
            </RibbonBarTab>
          </Tabs>
        </ShellContent>
      </ShellMain>
    </Shell>
  );
}

function getItems(): Items {
  return [
    {
      value: 12,
      text: 'Stencil Std',
      fontFamily: 'Stencil Std',
    },
    {
      value: 11,
      text: 'Bradley Hand',
      fontFamily: 'Bradley Hand',
      disabled: true,
    },
    { value: 10, text: 'Recently Used', isSeparator: true },
    { value: 2, text: 'Verdana', fontFamily: 'Verdana' },
    { value: 3, text: 'Garamond', fontFamily: 'Garamond' },
    { value: 4, text: 'Tahoma', fontFamily: 'Tahoma' },
    {
      value: 5,
      text: 'Courier New',
      fontFamily: 'Courier New ',
    },
    { value: 6, text: 'cursive', fontFamily: 'cursive' },
    { value: 7, text: 'system-ui', fontFamily: 'system-ui' },
    {
      value: 8,
      text: 'Times New Roman',
      fontFamily: 'Times New Roman',
    },
    { value: 9, text: 'Brush Script MT', fontFamily: 'Brush Script MT' },
  ];
}
