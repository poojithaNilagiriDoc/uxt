import classnames from 'classnames';
import createStyles from '@material-ui/core/styles/createStyles';
import React from 'react';
import showIf from '../_helpers/showIf';
import { UxtTheme } from '../../themes/UxtTheme';
import makeStyles from '../_helpers/makeStyles';
import safeGet from '../_helpers/safeGet';

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {
        color: 'inherit',
        display: 'flex',
        flex: '1 1 auto',
        flexDirection: 'column',
        overflow: 'hidden',
      },
      primary: {
        fontSize: '1rem',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      },
      secondary: {
        fontSize: '0.875rem',
        overflow: 'hidden',
        paddingTop: theme.spacing(0.5),
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      },
      tertiary: {
        fontSize: '0.875rem',
        overflow: 'hidden',
        paddingTop: theme.spacing(0.5),
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      },
      singleLine: {},
      doubleLine: {
        '& $secondary': {
          color: theme.palette.text.secondary,
        },
      },
      tripleLine: {
        marginTop: -3,
        '& $tertiary': {
          color: theme.palette.text.secondary,
        },
      },
    }),
  { name: 'UxtListItemText' },
);

interface Item {
  [key: string]: any;
}

type TextAccessor<T = Item> =
  | ((props: T) => React.ReactNode)
  | ((item: T) => string);

export interface ListItemTextProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  classes?: object;
  item?: { [key: string]: any };
  primaryTextAccessor?: string | TextAccessor;
  secondaryTextAccessor?: string | TextAccessor;
  tertiaryTextAccessor?: string | TextAccessor;
}

const ListItemText = React.forwardRef(function ListItemText(
  props: ListItemTextProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const {
    className,
    classes: classesProp,
    item,
    primaryTextAccessor,
    secondaryTextAccessor,
    tertiaryTextAccessor,
    ...rest
  } = props;
  const classes = useStyles(props);

  return (
    <div
      className={classnames(
        classes.root,
        {
          [classes.doubleLine]: secondaryTextAccessor && !tertiaryTextAccessor,
          [classes.singleLine]: !(
            secondaryTextAccessor || tertiaryTextAccessor
          ),
          [classes.tripleLine]: secondaryTextAccessor && tertiaryTextAccessor,
        },
        className,
      )}
      ref={ref}
      {...rest}
    >
      <div className={classes.primary}>
        {safeGet('', primaryTextAccessor, item)}
      </div>
      {showIf(secondaryTextAccessor)(
        <div className={classes.secondary}>
          {safeGet('', secondaryTextAccessor, item)}
        </div>,
      )}
      {showIf(tertiaryTextAccessor)(
        <div className={classes.tertiary}>
          {safeGet('', tertiaryTextAccessor, item)}
        </div>,
      )}
    </div>
  );
});

export default React.memo(ListItemText);
