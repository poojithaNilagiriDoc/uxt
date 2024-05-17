import classnames from 'classnames';
import createStyles from '@material-ui/core/styles/createStyles';
import React from 'react';
import { UxtTheme } from '../../themes/UxtTheme';
import makeStyles from '../_helpers/makeStyles';
import loginLogo from './loginLogo';

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {
        bottom: 0,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
      },
      background: {
        background: 'linear-gradient(to right, #3cc0ff, #00608f)', // primary4 to primary7
        bottom: 0,
        left: 0,
        position: 'absolute',
        right: 480,
        top: 0,
        transition: 'opacity 0.25s ease',
      },
      logo: {
        bottom: theme.spacing(4),
        fill: theme.palette.common.white,
        height: 40,
        left: theme.spacing(4),
        position: 'absolute',
        transition: 'opacity 0.25s ease',
        width: 40,
      },
      panel: {
        backgroundColor: theme.palette.background.paper,
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        padding: 0,
        position: 'absolute',
        right: 0,
        top: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          maxWidth: 480,
        },
      },
      header: {
        borderBottom: `1px solid ${theme.palette.divider}`,
        display: 'flex',
        flex: '0 0 auto',
        flexDirection: 'column',
        padding: theme.spacing(2),
      },
      release: {
        ...theme.typography.h6,
        alignSelf: 'flex-end',
        color: theme.palette.text.link,
      },
      productTitle: {
        ...theme.typography.h4,
        color: theme.palette.text.link,
      },
      content: {
        flex: '1 1 auto',
        overflowX: 'hidden',
        padding: theme.spacing(2),
      },
      footer: {
        borderTop: `1 solid ${theme.palette.divider}`,
        padding: theme.spacing(2),
      },
      copyright: {
        fontSize: '0.875rem',
      },
    }),
  { name: 'UxtLogin' },
);

export interface LoginProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  classes?: object;
  productTitle?: string;
  release?: string;
}

const Login = React.forwardRef(function Login(
  props: LoginProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const {
    children,
    className,
    classes: classesProp,
    productTitle,
    release,
    ...rest
  } = props;
  const classes = useStyles(props);

  return (
    <div className={classnames(classes.root, className)} ref={ref} {...rest}>
      <div className={classes.background}>
        <div
          className={classes.logo}
          dangerouslySetInnerHTML={{ __html: loginLogo }}
        />
      </div>
      <div className={classes.panel}>
        <div className={classes.header}>
          <div className={classes.release}>{release}</div>
          <div className={classes.productTitle}>{productTitle}</div>
        </div>
        <div className={classes.content}>{children}</div>
        <div className={classes.footer}>
          <div className={classes.copyright}>
            Copyright© ${new Date().getFullYear()} Intergraph Corporation.
            <br />
            All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
});

export default React.memo(Login);
