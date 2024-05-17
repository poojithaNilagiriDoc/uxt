import React from 'react';
import NotificationService from '../../../services/NotificationService';
import Shell from '../../Shell';
import ContextMenu from '../index';

export default function ContextMenuBasics() {
  const [anchorPoint, setAnchorPoint] = React.useState();

  const handleBackgroundContextMenu = React.useCallback(
    function handleBackgroundContextMenu(e) {
      e.preventDefault();

      setAnchorPoint({ x: e.pageX, y: e.pageY });
    },
    [],
  );

  return (
    <Shell>
      <div
        onContextMenu={handleBackgroundContextMenu}
        style={{
          bottom: 0,
          left: 0,
          position: 'absolute',
          right: 0,
          top: 0,
        }}
      />
      <ContextMenu
        anchorPoint={anchorPoint}
        isOpen={!!anchorPoint}
        items={[
          {
            text: 'Delete',
            action: () => {
              NotificationService.info('Delete');
            },
          },
          {
            text: 'Save',
            action: () => {
              NotificationService.info('Save');
            },
            children: [
              {
                text: 'To Computer',
                action: () => {
                  NotificationService.info('Save To Computer');
                },
              },
              {
                text: 'To Cloud Drive',
                action: () => {
                  NotificationService.info('Save To Cloud Drive');
                },
              },
            ],
          },
        ]}
        onIsOpenChange={() => setAnchorPoint(undefined)}
      />
    </Shell>
  );
}
