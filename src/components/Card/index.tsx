import classnames from 'classnames';
import createStyles from '@material-ui/core/styles/createStyles';
import React from 'react';
import showIf from '../_helpers/showIf';
import { UxtTheme } from '../../themes/UxtTheme';
import makeStyles from '../_helpers/makeStyles';
import Button from '../Button';
import Toolbar from '../Toolbar';

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {
        backgroundColor: theme.palette.background.paper,
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[1],
        overflow: 'hidden',
        position: 'relative',
      },
      content: {},
      toolbar: {},
      actionButton1: {
        color: theme.palette.text.link,
      },
      actionButton2: {
        color: theme.palette.text.link,
      },
      actionable: {
        cursor: 'pointer',
      },
    }),
  { name: 'UxtCard' },
);

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  actionButton1Text?: string;
  actionButton2Text?: string;
  children?: React.ReactNode;
  className?: string;
  classes?: object;
  item?: { [key: string]: any };
  onActionButton1Click?: (item: { [key: string]: any }) => void;
  onActionButton2Click?: (item: { [key: string]: any }) => void;
  onClick?: (item: { [key: string]: any }) => void;
}

const Card = React.forwardRef(function Card(
  props: CardProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const {
    actionButton1Text,
    actionButton2Text,
    children,
    className,
    classes: classesProp,
    item,
    onActionButton1Click,
    onActionButton2Click,
    onClick,
    ...rest
  } = props;
  const classes = useStyles(props);

  const handleActionButton1Click = React.useCallback(
    function handleActionButton1Click(
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ): void {
      e.preventDefault();
      e.stopPropagation();

      if (onActionButton1Click) onActionButton1Click(item);
    },
    [item, onActionButton1Click],
  );

  const handleActionButton2Click = React.useCallback(
    function handleActionButton2Click(
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ): void {
      e.preventDefault();
      e.stopPropagation();

      if (onActionButton2Click) onActionButton2Click(item);
    },
    [item, onActionButton2Click],
  );

  const handleClick = React.useCallback(
    function handleClick() {
      if (onClick) {
        onClick(item);
      }
    },
    [item, onClick],
  );

  return (
    <div
      className={classnames(
        classes.root,
        { [classes.actionable]: !!onClick },
        className,
      )}
      onClick={handleClick}
      {...rest}
    >
      <div className={classes.content}>{children}</div>
      {showIf(onActionButton1Click || onActionButton2Click)(() => (
        <Toolbar className={classes.toolbar}>
          {showIf(!!onActionButton1Click)(() => (
            <Button
              appearance="text"
              className={classes.actionButton1}
              onClick={handleActionButton1Click}
            >
              {actionButton1Text}
            </Button>
          ))}
          {showIf(!!onActionButton2Click)(() => (
            <Button
              appearance="text"
              className={classes.actionButton1}
              onClick={handleActionButton2Click}
            >
              {actionButton2Text}
            </Button>
          ))}
        </Toolbar>
      ))}
    </div>
  );
});

export default React.memo(Card);
