import classnames from 'classnames';
import Popover from '@material-ui/core/Popover';
import createStyles from '@material-ui/core/styles/createStyles';
import React from 'react';
import showIf from '../../_helpers/showIf';
import makeStyles from '../../_helpers/makeStyles';
import Input from '../../Input';

const useStyles = makeStyles(
  createStyles({
    root: {
      display: 'flex',
      flex: '0 0 auto',
      flexDirection: 'column',
      overflow: 'hidden',
      position: 'relative',
    },
    input: {},
    anchor: {},
  }),
  { name: 'UxtPopupInput' },
);

export interface PopupInputProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  classes?: object;
  iconSvg?: string;
  isPopupOpen?: boolean;
  isProgressBarVisible?: boolean;
  onIsPopupOpenChange?: (isPopupOpen: boolean) => void;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  progressBarValue?: number;
  value?: string;
}

function PopupInput(props: PopupInputProps) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);
  const {
    children,
    className,
    classes: classesProp,
    iconSvg,
    isPopupOpen,
    isProgressBarVisible,
    onIsPopupOpenChange,
    onValueChange,
    placeholder,
    progressBarValue,
    value,
    ...rest
  } = props;
  const classes = useStyles(props);

  const anchorWidth = React.useMemo(() => {
    if (!anchorEl) {
      return '';
    }

    return anchorEl.offsetWidth;
  }, [anchorEl]);

  const handleAnchorRefChange = React.useCallback(
    function handleAnchorRefChange(anchorRef) {
      setAnchorEl(anchorRef);
    },
    [],
  );

  const handlePopoverClose = React.useCallback(
    function handlePopoverClose() {
      onIsPopupOpenChange(false);
    },
    [onIsPopupOpenChange],
  );

  return (
    <div className={classnames(classes.root, className)} {...rest}>
      <Input
        className={classes.input}
        iconSvg={iconSvg}
        isProgressBarVisible={isProgressBarVisible}
        onValueChange={onValueChange}
        placeholder={placeholder}
        progressBarValue={progressBarValue}
        value={value}
      />
      <div className={classes.anchor} ref={handleAnchorRefChange} />
      {showIf(anchorEl)(() => (
        <Popover
          anchorEl={anchorEl}
          disableAutoFocus={true}
          disableEnforceFocus={true}
          elevation={2}
          marginThreshold={0}
          onClose={handlePopoverClose}
          open={isPopupOpen}
          PaperProps={{
            style: {
              minHeight: 0,
              minWidth: 0,
              width: anchorWidth,
            },
          }}
          TransitionProps={{ timeout: 0 }}
        >
          {children}
        </Popover>
      ))}
    </div>
  );
}

export default React.memo(PopupInput);
