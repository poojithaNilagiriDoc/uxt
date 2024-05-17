import classnames from 'classnames';
import Popover from '@material-ui/core/Popover';
import createStyles from '@material-ui/core/styles/createStyles';
import React from 'react';
import { UxtTheme } from '../../themes/UxtTheme';
import makeStyles from '../_helpers/makeStyles';
import ListItem from '../ListItem';

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {
        position: 'relative',
      },
      caret: {
        borderColor: 'transparent transparent white',
        borderStyle: 'solid',
        borderWidth: '0 0 6px 6px',
        bottom: 3,
        cursor: 'pointer',
        height: 0,
        pointerEvents: 'none',
        position: 'absolute',
        right: 3,
        width: 0,
      },
      content: {
        backgroundColor: theme.palette.background.sidebar,
        color: theme.palette.getContrastText(theme.palette.background.sidebar),
        fill: theme.palette.getContrastText(theme.palette.background.sidebar),
        width: 240,
      },
      item: {},
    }),
  { name: 'UxtSidebarGroupItem' },
);

export interface SidebarGroupItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  classes?: object;
  iconSvgAccessor?: string | ((item: { [key: string]: any }) => string);
  isSelected?: boolean;
  item?: { [key: string]: any };
  primaryTextAccessor?: string | ((item: { [key: string]: any }) => string);
}

function SidebarGroupItem(props: SidebarGroupItemProps) {
  const itemRef: React.MutableRefObject<HTMLDivElement> = React.useRef();
  const {
    children,
    className,
    classes: classesProp,
    iconSvgAccessor,
    isSelected,
    item = {},
    onClick,
    primaryTextAccessor,
    ...rest
  } = props;
  const classes = useStyles(props);
  const [isOpen, setIsOpen] = React.useState(false);

  const handleClick = React.useCallback(
    function handleClick(e) {
      setIsOpen(!isOpen);

      if (onClick) {
        onClick(e);
      }
    },
    [isOpen, onClick],
  );

  const handleClose = React.useCallback(function handleClose() {
    setIsOpen(false);
  }, []);

  const handleContentClick = React.useCallback(function handleContentClick() {
    setIsOpen(false);
  }, []);

  return (
    <div className={classnames(classes.root, className)} {...rest}>
      <ListItem
        className={classes.item}
        iconSvgAccessor={iconSvgAccessor}
        isSelected={isSelected}
        item={item}
        onClick={handleClick}
        primaryTextAccessor={primaryTextAccessor}
        ref={itemRef}
      />
      <div className={classes.caret} />
      <Popover
        anchorEl={itemRef.current}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        disableAutoFocus={true}
        disableEnforceFocus={true}
        marginThreshold={0}
        onClose={handleClose}
        open={isOpen}
        PaperProps={{ square: true }}
        transformOrigin={{ horizontal: 'left', vertical: 'top' }}
        TransitionProps={{ timeout: 0 }}
      >
        <div className={classes.content} onClick={handleContentClick}>
          {children}
        </div>
      </Popover>
    </div>
  );
}

export default React.memo(SidebarGroupItem);
