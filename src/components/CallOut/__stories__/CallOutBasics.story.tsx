import React from 'react';
import CallOut from '../index';
import Button from '../../Button';
import Shell from '../../Shell';

export default function CallOutBasics() {
  const [isDisabled, setIsDisabled] = React.useState<boolean>(false);

  const handleClick = React.useCallback(() => {
    setIsDisabled(true);
  }, []);

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      e.persist();
      if (e.key === 'Enter') {
        setIsDisabled(false);
      }
      e.preventDefault();
    },
    [],
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
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        <CallOut
          isInteractive={true}
          anchorElement={
            <Button
              text="Hover here!"
              onClick={handleClick}
              disabled={isDisabled}
            />
          }
          placement="bottom"
        >
          "Hello"
        </CallOut>
      </div>
    </Shell>
  );
}
