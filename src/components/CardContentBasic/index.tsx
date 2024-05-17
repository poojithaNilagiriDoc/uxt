import classnames from 'classnames';
import createStyles from '@material-ui/core/styles/createStyles';
import React from 'react';
import showIf from '../_helpers/showIf';
import { UxtTheme } from '../../themes/UxtTheme';
import makeStyles from '../_helpers/makeStyles';
import safeGet from '../_helpers/safeGet';
import ListItemAction, { ListItemActionAction } from '../ListItemAction';
import ListItemText from '../ListItemText';

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {
        display: 'flex',
        flex: '0 0 auto',
        justifyContent: 'space-between',
        paddingBottom: theme.spacing(2),
      },
      leftText: {
        display: 'flex',
        flex: '1 1 auto',
        flexDirection: 'column',
        paddingLeft: theme.spacing(2),
        paddingTop: theme.spacing(2),
      },
      right: {
        display: 'flex',
        flex: '1 1 auto',
        flexDirection: 'column',
        paddingTop: theme.spacing(1),
      },
      icons: {
        display: 'flex',
        flex: '0 0 auto',
        flexDirection: 'row-reverse',
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
      },
      icon1: {},
      icon2: {},
      icon3: {},
      rightText: {
        alignItems: 'flex-end',
        display: 'flex',
        flex: '1 1 auto',
        flexDirection: 'column',
        fontSize: '0.75rem',
        paddingTop: theme.spacing(1),
        textAlign: 'right',
      },
      rightTextLine1: {
        paddingRight: theme.spacing(2),
      },
      rightTextLine2: {
        paddingRight: theme.spacing(2),
        paddingTop: theme.spacing(0.5),
      },
      rightTextLine3: {
        paddingRight: theme.spacing(2),
        paddingTop: theme.spacing(0.5),
      },
    }),
  { name: 'UxtCardContentBasic' },
);

interface Item {
  [key: string]: any;
}

type TextAccessor<T = Item> =
  | ((props: T) => React.ReactNode)
  | ((item: T) => string);

export interface CardContentBasicProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  classes?: object;
  icon1Action?: ListItemActionAction;
  icon1IconSvg?: string;
  icon2Action?: ListItemActionAction;
  icon2IconSvg?: string;
  icon3Action?: ListItemActionAction;
  icon3IconSvg?: string;
  item?: Item;
  leftTextComponent?: string | React.FC<any> | React.ComponentClass<any, any>;
  leftTextLine1TextAccessor?: string | TextAccessor;
  leftTextLine2TextAccessor?: string | TextAccessor;
  leftTextLine3TextAccessor?: string | TextAccessor;
  rightTextLine1TextAccessor?: string | TextAccessor;
  rightTextLine2TextAccessor?: string | TextAccessor;
  rightTextLine3TextAccessor?: string | TextAccessor;
}

function CardContentBasic(props: CardContentBasicProps) {
  const {
    className,
    classes: classesProp,
    icon1Action,
    icon1IconSvg,
    icon2Action,
    icon2IconSvg,
    icon3Action,
    icon3IconSvg,
    item,
    leftTextComponent: LeftTextComponent = ListItemText,
    leftTextLine1TextAccessor,
    leftTextLine2TextAccessor,
    leftTextLine3TextAccessor,
    rightTextLine1TextAccessor,
    rightTextLine2TextAccessor,
    rightTextLine3TextAccessor,
    ...rest
  } = props;
  const classes = useStyles(props);

  return (
    <div className={classnames(classes.root, className)} {...rest}>
      <LeftTextComponent
        className={classes.leftText}
        item={item}
        primaryTextAccessor={leftTextLine1TextAccessor}
        secondaryTextAccessor={leftTextLine2TextAccessor}
        tertiaryTextAccessor={leftTextLine3TextAccessor}
      />
      <div className={classes.right}>
        {showIf(icon1Action || icon2Action || icon3Action)(() => (
          <div className={classes.icons}>
            {showIf(icon1Action)(() => (
              <ListItemAction
                action={icon1Action}
                className={classes.icon1}
                iconSvg={icon1IconSvg}
                item={item}
              />
            ))}
            {showIf(icon1Action)(() => (
              <ListItemAction
                action={icon2Action}
                className={classes.icon2}
                iconSvg={icon2IconSvg}
                item={item}
              />
            ))}
            {showIf(icon1Action)(() => (
              <ListItemAction
                action={icon3Action}
                className={classes.icon3}
                iconSvg={icon3IconSvg}
                item={item}
              />
            ))}
          </div>
        ))}
        <div className={classes.rightText}>
          {showIf(rightTextLine1TextAccessor)(() => (
            <div className={classes.rightTextLine1}>
              {safeGet('', rightTextLine1TextAccessor, item)}
            </div>
          ))}
          {showIf(rightTextLine2TextAccessor)(() => (
            <div className={classes.rightTextLine2}>
              {safeGet('', rightTextLine2TextAccessor, item)}
            </div>
          ))}
          {showIf(rightTextLine3TextAccessor)(() => (
            <div className={classes.rightTextLine3}>
              {safeGet('', rightTextLine3TextAccessor, item)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default React.memo(CardContentBasic);
