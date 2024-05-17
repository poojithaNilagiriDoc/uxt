import classnames from 'classnames';
import { motion } from 'framer-motion';
import includes from 'lodash/fp/includes';
import without from 'lodash/fp/without';
import createStyles from '@material-ui/core/styles/createStyles';
import { Popper } from '@material-ui/core';
import React from 'react';
import { UxtTheme } from '../../themes/UxtTheme';
import makeStyles from '../_helpers/makeStyles';
import ToggleIconButton from '../ToggleIconButton';
import Orientation from '../constants/orientation';
import useClickAwayListener from '../../hooks/useClickAwayListener';
import showIf from '../_helpers/showIf';

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {
        borderRadius: theme.height.toolbar,
        display: 'flex',
        willChange: 'transform, width',
      },
      fab: {
        alignItems: 'center',
        borderRadius: '100%',
        cursor: 'pointer',
        display: 'flex',
        flex: '0 0 auto',
        height: theme.height.toolbar,
        justifyContent: 'center',
        marginLeft: -7,
        marginRight: -7,
        position: 'relative',
        width: theme.height.toolbar,
        zIndex: 1,
      },
      ring: {
        border: `2px solid ${theme.palette.divider}`,
        borderRadius: 56,
        bottom: 0,
        left: 0,
        opacity: 0,
        position: 'absolute',
        right: 0,
        top: 0,
        transition: 'opacity 500ms ease',
      },
      button: {},
      caret: {
        borderColor: `transparent transparent ${theme.palette.grey[500]}`,
        borderStyle: 'solid',
        borderWidth: '0 0 6px 6px',
        bottom: -theme.spacing(0.5) + 1,
        left: theme.spacing(2) + 1,
        cursor: 'pointer',
        height: 0,
        pointerEvents: 'none',
        position: 'absolute',
        transform: 'rotate(45deg)',
        width: 0,
      },
      content: {
        alignItems: 'center',
        backgroundColor: 'inherit',
        borderRadius: theme.spacing(7),
        display: 'flex',
        height: theme.height.toolbar,
        marginRight: theme.spacing(-1),
        paddingLeft: theme.spacing(1),
        pointerEvents: 'none',
        top: 0,
        transition: 'padding-left 300ms ease',
      },
      popupModeContent: {
        pointerEvents: 'auto',
        borderRadius: 'inherit',
        height: 'inherit',
        marginRight: 0,
        paddingLeft: 0,
      },
      open: {
        '& $ring': {
          opacity: 1,
        },
        '& $content': {
          paddingLeft: theme.spacing(2),
          pointerEvents: 'auto',
        },
      },
      popup: {
        background: theme.palette.background.paper,
        boxShadow: theme.shadows[1],
        borderRadius: theme.spacing(0.5),
        padding: theme.spacing(0.5),
        overflow: 'hidden',
        marginTop: theme.spacing(1.5),
      },
      verticalOrientation: {
        flexDirection: 'column',
      },
    }),
  { name: 'UxtFloatingToolbarSubmenu' },
);

export interface FloatingToolbarProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  classes?: object;
  displayMode?: 'popup' | 'inline';
  iconSvg?: string;
  isActive?: boolean;
  isOpen?: boolean;
  keepPopupOpen?: boolean;
  onFabClick?: (isOpen: boolean) => void;
  toolbarContentRef?: HTMLDivElement;
  popupOrientation?: Orientation;
}

function FloatingToolbarSubmenu(props) {
  const ref = React.useRef();
  const prevIsOpenRef = React.useRef();
  const {
    children,
    className,
    classes: classesProp,
    iconSvg,
    isActive,
    isOpen,
    keepPopupOpen = false,
    onFabClick,
    toolbarContentRef,
    displayMode = 'inline',
    popupOrientation = Orientation.Vertical,
    ...rest
  } = props;
  const classes = useStyles(props);
  const toggleRef: React.RefObject<HTMLDivElement> = React.useRef();
  const popupRef = useClickAwayListener<HTMLDivElement>((): void => {
    if (isOpen && !keepPopupOpen) onFabClick(false);
  });

  const close = React.useCallback(() => {
    if (displayMode === 'inline') {
      if (!toolbarContentRef) return;

      without([ref.current], toolbarContentRef.children).forEach(item => {
        item.style.transition =
          'opacity 300ms ease, transform 300ms ease, width 300ms ease';
        item.style.opacity = '1';
        item.style.transform = 'scale(1, 1)';

        if (includes('UxtFloatingToolbarSubmenu', item.className)) {
          item.style.width = '';
          return;
        }

        item.style.width = '40px';
      });
    }
  }, [toolbarContentRef, displayMode]);

  const handleFabClick = React.useCallback(
    function handleFabClick() {
      onFabClick(!isOpen);
    },
    [isOpen, onFabClick],
  );

  const open = React.useCallback(() => {
    if (displayMode === 'inline') {
      if (!toolbarContentRef) return;

      without([ref.current], toolbarContentRef.children).forEach(item => {
        item.style.transition =
          'opacity 300ms ease, transform 300ms ease, width 300ms ease';
        item.style.opacity = '0';
        item.style.transform = 'scale(0, 0)';
        item.style.width = '0';
      });
    }
  }, [toolbarContentRef, displayMode]);

  const childVariants = React.useMemo(() => {
    return displayMode === 'inline'
      ? {
          closed: { opacity: 0, scale: 0, width: 0 },
          open: { opacity: 1, scale: 1, width: 40 },
        }
      : {
          closed: { opacity: 0, height: 0 },
          open: { opacity: 1, height: '100%' },
        };
  }, [displayMode]);

  React.useEffect(() => {
    if (isOpen === prevIsOpenRef.current) return;

    if (isOpen) {
      open();
    } else {
      close();
    }

    prevIsOpenRef.current = isOpen;
  }, [close, isOpen, open]);

  const safeChildren = React.useMemo((): React.ReactNode => {
    return (
      <div
        className={classnames(classes.content, {
          [classes.verticalOrientation]:
            displayMode === 'popup' &&
            popupOrientation === Orientation.Vertical,
          [classes.popupModeContent]: displayMode === 'popup',
        })}
      >
        {React.Children.map(
          children,
          (child: React.ReactNode, index: number) => {
            return (
              <motion.div
                key={index}
                animate={isOpen ? 'open' : 'closed'}
                initial={false}
                transition={{ duration: 0.3 }}
                variants={childVariants}
              >
                {child}
              </motion.div>
            );
          },
        )}
      </div>
    );
  }, [
    children,
    isOpen,
    classes.content,
    childVariants,
    popupOrientation,
    displayMode,
    classes.verticalOrientation,
    classes.popupModeContent,
  ]);

  return (
    <div
      className={classnames(
        classes.root,
        { [classes.open]: isOpen && displayMode === 'inline' },
        className,
      )}
      ref={ref}
      {...rest}
    >
      <div
        className={classnames({ [classes.fab]: displayMode === 'inline' })}
        onClick={handleFabClick}
        style={{ marginLeft: isOpen && displayMode === 'inline' ? -24 : '' }}
      >
        {showIf(displayMode === 'inline')(<div className={classes.ring} />)}
        <ToggleIconButton
          className={classes.button}
          iconSvg={iconSvg}
          isActive={displayMode === 'inline' ? !isOpen && isActive : isActive}
          ref={toggleRef}
        />
        {showIf(displayMode === 'popup')(<div className={classes.caret} />)}
      </div>

      {showIf(isOpen && displayMode === 'inline')(<div>{safeChildren}</div>)}
      {showIf(displayMode === 'popup')(
        <div ref={popupRef}>
          <Popper
            disablePortal={false}
            open={isOpen}
            anchorEl={toggleRef.current}
            className={classes.popup}
            modifiers={{
              flip: { enabled: true },
              preventOverflow: {
                enabled: true,
                boundariesElement: 'window',
              },
              offset: 16,
            }}
            placement="bottom"
          >
            {safeChildren}
          </Popper>
        </div>,
      )}
    </div>
  );
}

export default React.memo(FloatingToolbarSubmenu);
