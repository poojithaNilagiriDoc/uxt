import React from 'react';
import components from 'uxt-graphics/graphics/components';
import CallOut from '../index';
import Button from '../../Button';
import Graphic from '../../Graphic';
import Shell from '../../Shell';

export default function CallOutInteractive() {
  const anchorElement = (
    <Button text="Hover Here for Interactive Tooltip"></Button>
  );

  return (
    <Shell>
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CallOut
          anchorElement={anchorElement}
          isInteractive={true}
          placement="right"
        >
          <>
            <Graphic size="small" style={{ fill: 'blue' }} svg={components} />
            <Button text="Clickable" />
          </>
        </CallOut>
      </div>
    </Shell>
  );
}
