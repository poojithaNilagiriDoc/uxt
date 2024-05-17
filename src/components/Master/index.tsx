import classnames from 'classnames';
import createStyles from '@material-ui/core/styles/createStyles';
import React from 'react';
import makeStyles from '../_helpers/makeStyles';
import ListItem from '../ListItem';

const useStyles = makeStyles(
  createStyles({
    root: {
      display: 'flex',
      flex: '1 1 auto',
      flexDirection: 'column',
      overflowY: 'auto',
    },
    item: {
      height: 56,
    },
    widescreen: {},
  }),
  { name: 'UxtMaster' },
);

export interface MasterProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  classes?: object;
  currentViewName?: string;
  getMasterItemText?: (viewName: string) => string;
  isScreenWide?: boolean;
  onCurrentViewNameChange?: (currentViewName: string) => void;
  viewNames?: Array<string>;
}

const Master = React.forwardRef(function Master(
  props: MasterProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const {
    className,
    classes: classesProp,
    currentViewName,
    getMasterItemText = viewName => viewName,
    isScreenWide,
    onCurrentViewNameChange,
    viewNames = [],
    ...rest
  } = props;
  const classes = useStyles(props);

  const handleItemClick = React.useCallback(
    function handleItemClick(viewName) {
      if (!!viewName && viewName === currentViewName) return;

      onCurrentViewNameChange(viewName);
    },
    [currentViewName, onCurrentViewNameChange],
  );

  return (
    <div
      className={classnames(
        classes.root,
        { [classes.widescreen]: isScreenWide },
        className,
      )}
      ref={ref}
      {...rest}
    >
      {viewNames.map(viewName => (
        <ListItem
          className={classes.item}
          key={viewName}
          isSelected={!!viewName && viewName === currentViewName}
          item={{ viewName }}
          onClick={() => handleItemClick(viewName)}
          primaryTextAccessor={item => getMasterItemText(item.viewName)}
        />
      ))}
    </div>
  );
});

export default React.memo(Master);
