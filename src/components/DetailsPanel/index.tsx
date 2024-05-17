import classnames from 'classnames';
import createStyles from '@material-ui/core/styles/createStyles';
import React from 'react';
import MediaQuery from 'react-responsive';
import closeSvg from 'uxt-graphics/icons/close';
import showIf from '../_helpers/showIf';
import { UxtTheme } from '../../themes/UxtTheme';
import makeStyles from '../_helpers/makeStyles';
import IconButton from '../IconButton';
import Toolbar from '../Toolbar';
import theme from '../../themes/light';
import type { IconButtonProps } from '../IconButton';

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        flex: '0 0 auto',
        flexDirection: 'column',
        overflow: 'hidden',
        [theme.breakpoints.only('xs')]: {
          bottom: 0,
          left: '100%',
          position: 'absolute',
          right: 0,
          top: 0,
          transition: 'left 250ms ease',
          width: '100%',
          zIndex: theme.zIndex.detailsPanel,
        },
        [theme.breakpoints.up('sm')]: {
          borderLeft: `1px solid ${theme.palette.divider}`,
          marginRight: -320,
          transition: 'margin-right 250ms ease',
          width: 320,
        },
      },
      toolbar: {},
      closeButton: {
        flex: '0 0 auto',
        marginLeft: 'auto',
      },
      content: {
        display: 'flex',
        flex: '1 1 auto',
        flexDirection: 'column',
        overflowY: 'hidden',
      },
      internalScrollEnabled: {
        '& $content': {
          overflowY: 'auto',
        },
      },
      open: {
        [theme.breakpoints.only('xs')]: {
          boxShadow: '-2px 0 5px rgba(0, 0, 0, 0.25)',
          left: 0,
        },
        [theme.breakpoints.up('sm')]: {
          marginRight: 0,
        },
      },
    }),
  { name: 'UxtDetailsPanel' },
);

export interface DetailsPanelProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  classes?: object;
  closeIconButtonProps?: Partial<IconButtonProps>;
  isInternalScrollEnabled?: boolean;
  isOpen?: boolean;
  onIsOpenChange?: (isOpen: boolean) => void;
  showToolbar?: boolean;
}

const DetailsPanel = React.forwardRef(function DetailsPanel(
  props: DetailsPanelProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const {
    children,
    className,
    classes: classesProp,
    closeIconButtonProps,
    isInternalScrollEnabled,
    isOpen,
    onIsOpenChange,
    showToolbar = true,
    ...rest
  } = props;
  const classes = useStyles(props);

  const close = React.useCallback(
    function close() {
      onIsOpenChange(false);
    },
    [onIsOpenChange],
  );

  return (
    <MediaQuery minWidth={theme.breakpoints.values.sm} onChange={close}>
      {() => (
        <div
          className={classnames(
            classes.root,
            {
              [classes.internalScrollEnabled]: isInternalScrollEnabled,
              [classes.open]: isOpen,
            },
            className,
          )}
          {...rest}
        >
          {showIf(showToolbar)(
            <Toolbar className={classes.toolbar} position="top">
              <IconButton
                className={classes.closeButton}
                iconSvg={closeSvg}
                onClick={close}
                {...closeIconButtonProps}
              />
            </Toolbar>,
          )}
          <div className={classes.content}>{children}</div>
        </div>
      )}
    </MediaQuery>
  );
});

export default React.memo(DetailsPanel);
