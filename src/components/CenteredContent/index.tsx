import classnames from 'classnames';
import createStyles from '@material-ui/core/styles/createStyles';
import React from 'react';
import { UxtTheme } from '../../themes/UxtTheme';
import makeStyles from '../_helpers/makeStyles';

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {
        alignItems: 'center',
        backgroundColor: theme.palette.background.default,
        display: 'flex',
        flex: '1 1 auto',
        flexDirection: 'column',
        overflow: 'hidden',
      },
      content: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: `1px 0 0 ${theme.palette.divider}, -1px 0 0 ${theme.palette.divider}`,
        display: 'flex',
        flex: '1 1 auto',
        flexDirection: 'column',
        maxWidth: theme.breakpoints.values['sm'],
        width: '100%',
      },
    }),
  { name: 'UxtCenteredContent' },
);

export interface CenteredContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  classes?: object;
}

const CenteredContent = React.forwardRef(function CenteredContent(
  props: CenteredContentProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const { children, className, classes: classesProp, ...rest } = props;
  const classes = useStyles(props);

  return (
    <div className={classnames(classes.root, className)} ref={ref} {...rest}>
      <div className={classes.content}>{children}</div>
    </div>
  );
});

export default React.memo(CenteredContent);
