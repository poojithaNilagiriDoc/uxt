import createStyles from '@material-ui/core/styles/createStyles';
import React from 'react';
import { UxtTheme } from '../../themes/UxtTheme';
import makeStyles from '../_helpers/makeStyles';
import HexagonLogo from '../_internal/HexagonLogo';

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        flex: '1 1 auto',
        flexDirection: 'column',
        overflow: 'hidden',
      },
      contentWrapper: {
        alignItems: 'center',
        display: 'flex',
        flex: '1 1 auto',
        flexDirection: 'column',
        overflowY: 'auto',
      },
      content: {
        flex: '1 0 auto',
        maxWidth: theme.breakpoints.values.sm,
        padding: theme.spacing(2),
        width: '100%',
        '& h1': {
          ...theme.typography.h5,
          [theme.breakpoints.up('sm')]: {
            ...theme.typography.h4,
          },
        },
        '& h2': {
          ...theme.typography.body1,
          marginBottom: theme.spacing(4),
        },
        '& p': {
          marginBottom: theme.spacing(2),
          '&:last-of-type': {
            marginBottom: theme.spacing(4),
          },
        },
        '& li + li': {
          marginTop: theme.spacing(2),
        },
      },
      footer: {
        alignItems: 'center',
        backgroundColor: theme.palette.background.paper,
        borderTop: `solid 1px ${theme.palette.divider}`,
        display: 'flex',
        flex: '0 0 auto',
        height: theme.height.toolbar,
        justifyContent: 'flex-end',
        overflow: 'hidden',
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        width: '100%',
      },
    }),
  { name: 'UxtAbout' },
);

export interface AboutProps
  extends React.HTMLAttributes<HTMLDivElement>,
    React.HTMLProps<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  classes?: object;
}

const About = React.forwardRef(function About(
  props: AboutProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const { children, classes: classesProp, ...rest } = props;
  const classes = useStyles(props);

  return (
    <div className={classes.root} ref={ref} {...rest}>
      <div className={classes.contentWrapper}>
        <div className={classes.content}>{children}</div>
      </div>
      <div className={classes.footer}>
        <HexagonLogo />
      </div>
    </div>
  );
});

export default React.memo(About);
