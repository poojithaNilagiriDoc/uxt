import classnames from 'classnames';
import isArray from 'lodash/fp/isArray';
import isFunction from 'lodash/fp/isFunction';
import createStyles from '@material-ui/core/styles/createStyles';
import React from 'react';
import showIf from '../_helpers/showIf';
import makeStyles from '../_helpers/makeStyles';
import IconButton from '../IconButton';
import OverflowButton, { OverflowButtonProps } from '../OverflowButton';
import type { IconButtonProps } from '../IconButton';

const useStyles = makeStyles(
  createStyles({
    root: {},
    iconButton: {},
    overflowButton: {},
  }),
  { name: 'UxtListItemAction' },
);

interface Item {
  [key: string]: any;
}

type ListItemActionFunctionAction = (item: Item) => void;

type ListItemActionArrayAction = Array<{
  action: ListItemActionFunctionAction;
  text: string;
}>;

export type ListItemActionAction =
  | ListItemActionFunctionAction
  | ListItemActionArrayAction;

export interface ListItemActionProps
  extends React.HTMLAttributes<HTMLDivElement> {
  action?: ListItemActionAction;
  className?: string;
  classes?: object;
  iconButtonProps?: Partial<IconButtonProps>;
  iconSvg?: string;
  item?: Item;
  itemComponent?: string | React.FC<any> | React.ComponentClass<any, any>;
  overflowButtonProps?: OverflowButtonProps;
  size?: 'small' | 'regular' | 'large' | number;
}

const ListItemAction = React.forwardRef(function ListItemAction(
  props: ListItemActionProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const {
    action,
    className,
    classes: classesProp,
    iconButtonProps,
    iconSvg,
    item,
    itemComponent,
    overflowButtonProps = {},
    size,
    ...rest
  } = props;
  const classes = useStyles(props);

  const handleIconButtonClick = React.useCallback(
    function handleIconButtonClick(e) {
      e.preventDefault();
      e.stopPropagation();

      (action as ListItemActionFunctionAction)(item);
    },
    [action, item],
  );

  return (
    <div className={classnames(classes.root, className)} ref={ref} {...rest}>
      {showIf(isFunction(action))(() => (
        <IconButton
          className={classes.iconButton}
          iconSvg={iconSvg}
          onClick={handleIconButtonClick}
          size={size}
          {...iconButtonProps}
        />
      ))}
      {showIf(isArray(action))(() => (
        <OverflowButton
          actionArguments={[item]}
          className={classes.overflowButton}
          iconSize={size}
          iconSvg={iconSvg}
          itemComponent={itemComponent}
          items={action as ListItemActionArrayAction}
          {...overflowButtonProps}
        />
      ))}
    </div>
  );
});

export default React.memo(ListItemAction);
