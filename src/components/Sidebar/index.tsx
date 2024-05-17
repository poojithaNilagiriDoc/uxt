import classnames from 'classnames';
import { motion } from 'framer-motion';
import createStyles from '@material-ui/core/styles/createStyles';
import { ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import MediaQuery from 'react-responsive';
import showIf from '../_helpers/showIf';
import { UxtTheme } from '../../themes/UxtTheme';
import makeStyles from '../_helpers/makeStyles';
import useTheme from '../_helpers/useTheme';
import CoverPanel from '../CoverPanel';
import IconPanel from '../IconPanel';
import PushPanel from '../PushPanel';
import darkTheme from '../../themes/dark';
import sidebarTheme from './sidebarTheme';

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {
        display: 'flex',
        flex: '0 0 auto',
        overflow: 'hidden',
        pointerEvents: 'none',
        position: 'relative',
        zIndex: theme.zIndex.sidebar,
        [theme.breakpoints.only('xs')]: {
          height: 'calc(100% - 56px)',
          position: 'absolute',
          top: theme?.height?.toolbar || 56,
          width: '100%',
        },
      },
      overlay: {
        backgroundColor: theme.palette.common.black,
        bottom: 0,
        left: 0,
        pointerEvents: 'all',
        position: 'absolute',
        right: 0,
        top: 0,
      },
      panel: {
        backgroundColor: theme.palette.background.sidebar,
        color: theme.palette.getContrastText(theme.palette.background.sidebar),
        display: 'flex',
        fill: theme.palette.getContrastText(theme.palette.background.sidebar),
        flex: '0 0 auto',
        flexDirection: 'column',
        overflow: 'hidden',
        pointerEvents: 'all',
        width: 256,
      },
      content: {
        display: 'flex',
        flex: '1 1 auto',
        flexDirection: 'column',
        overflow: 'hidden',
        width: '100%',
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
        },
        '&::-webkit-scrollbar-thumb': {
          '&:hover': {
            backgroundColor: darkTheme.palette.background.sidebar,
          },
        },
      },
      brandingStrip: {
        backgroundColor: theme.palette.background.topbar,
        flex: '0 0 auto',
        height: 8,
      },
    }),
  { name: 'UxtSidebar' },
);

export interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  areIconsAlwaysVisible?: boolean;
  children?: React.ReactNode;
  className?: string;
  classes?: object;
  displayMode?: 'auto' | 'cover' | 'push';
  isOnRight?: boolean;
  isOpen?: boolean;
  onIsOpenChange?: (isOpen: boolean) => void;
  width?: number;
}

function Sidebar(props: SidebarProps) {
  const {
    areIconsAlwaysVisible = false,
    children,
    className,
    classes: classesProp,
    displayMode = 'auto' as const,
    isOnRight,
    isOpen,
    onIsOpenChange,
    width = 256,
    ...rest
  } = props;
  const classes = useStyles(props);
  const [isScreenWide, setIsScreenWide] = React.useState(false);
  const theme = useTheme();

  const isCovering = React.useMemo(() => {
    return displayMode === 'cover' || (displayMode === 'auto' && !isScreenWide);
  }, [displayMode, isScreenWide]);

  const PanelComponent = React.useMemo(() => {
    if (isCovering) {
      return CoverPanel;
    }

    if (areIconsAlwaysVisible) {
      return IconPanel;
    }

    return PushPanel;
  }, [areIconsAlwaysVisible, isCovering]);

  const handleOverlayClick = React.useCallback(
    function handleOverlayClick() {
      onIsOpenChange(false);
    },
    [onIsOpenChange],
  );

  const handleScreenSizeChange = React.useCallback(
    function handleScreenSizeChange(isScreenWide) {
      setIsScreenWide(isScreenWide);

      if (isOpen) {
        onIsOpenChange(false);
      }
    },
    [isOpen, onIsOpenChange],
  );

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsScreenWide(
        !window.matchMedia(`(max-width: ${darkTheme.breakpoints.values.sm}px)`)
          .matches,
      );
    }
  }, []);

  return (
    <ThemeProvider theme={sidebarTheme(theme)}>
      <MediaQuery
        minWidth={darkTheme.breakpoints.values.sm}
        onChange={handleScreenSizeChange}
      >
        {() => (
          <div className={classnames(classes.root, className)} {...rest}>
            {showIf(isCovering)(() => (
              <motion.div
                animate={{
                  opacity: isOpen ? 0.5 : 0,
                  pointerEvents: isOpen ? 'all' : 'none',
                }}
                className={classes.overlay}
                initial={false}
                onClick={handleOverlayClick}
                transition={{ duration: 0.25 }}
              />
            ))}
            <PanelComponent
              width={width}
              className={classes.panel}
              isOpen={isOpen}
              {...(PanelComponent === IconPanel
                ? {}
                : { isOnRight: isOnRight })}
            >
              <div className={classes.content}>{children}</div>
              <div className={classes.brandingStrip} />
            </PanelComponent>
          </div>
        )}
      </MediaQuery>
    </ThemeProvider>
  );
}

export default React.memo(Sidebar);
