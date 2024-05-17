import React from 'react';
import info from 'uxt-graphics/icons/info';
import CallOut from '../index';
import Input from '../../Input';
import IconButton from '../../IconButton';
import Shell from '../../Shell';
import useTheme from '../../_helpers/useTheme';
import type { UxtTheme } from '../../../themes/UxtTheme';

export default function CallOutClickTrigger() {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [displayName, setDisplayName] = React.useState<string | undefined>();

  const handleClick = React.useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const theme = useTheme() as UxtTheme;

  return (
    <Shell>
      <div
        style={{
          background: theme.palette.background.default,
          display: 'flex',
          gap: theme.spacing(1),
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Input
          label="Display Name"
          value={displayName}
          onValueChange={(v: string | undefined) => {
            setDisplayName(v);
          }}
        />
        <CallOut
          isInteractive={true}
          isOpen={isOpen}
          onClose={() => {
            setIsOpen(false);
          }}
          disableHoverListener={false}
          anchorElement={<IconButton iconSvg={info} onClick={handleClick} />}
          placement="right"
        >
          <>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: theme.spacing(1),
                padding: theme.spacing(1),
              }}
            >
              <h3>Display Name</h3>
              <span
                style={{
                  ...theme.typography.body2,
                  color: theme.palette.text.secondary,
                }}
              >
                Enter a name to be displayed beside your profile. This name can
                be seen by others.
              </span>
            </div>
          </>
        </CallOut>
      </div>
    </Shell>
  );
}
