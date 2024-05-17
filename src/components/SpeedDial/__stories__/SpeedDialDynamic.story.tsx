import React from 'react';
import add from 'uxt-graphics/icons/add';
import close from 'uxt-graphics/icons/close';
import newSvg from 'uxt-graphics/icons/new';
import upload from 'uxt-graphics/icons/upload';
import Fab from '../../Fab';
import SpeedDial from '../index';

export default function SpeedDialDynamic() {
  const [isOpen, setIsOpen] = React.useState(true);

  const handleNew = React.useCallback(function handleNew() {
    console.log('New!');
  }, []);

  const handleUpload = React.useCallback(function handleUpload() {
    console.log('Upload!');
  }, []);

  return (
    <SpeedDial
      actions={[
        { action: handleNew, iconSvg: newSvg, text: 'New' },
        { action: handleUpload, iconSvg: upload, text: 'Upload' },
      ]}
      isOpen={isOpen}
      onIsOpenChange={setIsOpen}
    >
      {({ fabRef }) => (
        <Fab
          iconSvg={isOpen ? close : add}
          isExtended={!isOpen}
          ref={fabRef}
          onClick={() => {
            if (isOpen) return;

            setIsOpen(true);
          }}
          style={{ bottom: 24, position: 'absolute', right: 24 }}
          text="Add Item"
        />
      )}
    </SpeedDial>
  );
}
