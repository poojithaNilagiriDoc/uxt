import React from 'react';
import SnackbarStack from '../index';

export default function SnackbarStackBasics() {
  return (
    <div
      style={{
        display: 'flex',
        flex: '1 1 auto',
        flexDirection: 'column',
        padding: 16,
      }}
    >
      <SnackbarStack
        notifications={[
          {
            id: '1',
            message: 'Notification 1',
            type: 'error',
          },
          {
            id: '2',
            message: 'Notification 2',
          },
        ]}
      />
    </div>
  );
}
