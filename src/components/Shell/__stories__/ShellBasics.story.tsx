import React from 'react';
import ShellContent from '../../ShellContent';
import ShellMain from '../../ShellMain';
import Sidebar from '../../Sidebar';
import Topbar from '../../Topbar';
import Shell from '../index';

function ShellBasics() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  return (
    <Shell>
      <Topbar
        pageTitle="Page Title"
        showMenuButton={true}
        onMenuPress={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <ShellMain>
        <Sidebar isOpen={isSidebarOpen} onIsOpenChange={setIsSidebarOpen}>
          Sidebar Content
        </Sidebar>
        <ShellContent>Main Content</ShellContent>
      </ShellMain>
    </Shell>
  );
}

export default ShellBasics;
