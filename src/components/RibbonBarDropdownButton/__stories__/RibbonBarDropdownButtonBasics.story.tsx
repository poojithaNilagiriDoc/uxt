import React from 'react';
import comment from 'uxt-graphics/icons/comment';
import paste from 'uxt-graphics/icons/paste';
import cut from 'uxt-graphics/icons/cut';
import copy from 'uxt-graphics/icons/copy';
import RibbonBarDropdownButton from '../index';
import List from '../../List';

export default function RibbonBarDropdownButtonBasics() {
  const [isActive, setIsActive] = React.useState<boolean>(false);

  const pasteContent = React.useCallback((): React.ReactNode => {
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

  return (
    <>
      <RibbonBarDropdownButton
        style={{ margin: 16 }}
        text="new comment"
        iconSvg={comment}
        onClick={() => setIsActive(!isActive)}
        popoverContent={<h1>Content</h1>}
        isActive={isActive}
      />
      <RibbonBarDropdownButton
        style={{ margin: 16 }}
        appearance="classic"
        text="new comment"
        iconSvg={comment}
        isActive={true}
        popoverContent={pasteContent()}
      />
    </>
  );
}
