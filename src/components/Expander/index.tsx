import classnames from 'classnames';
import createStyles from '@material-ui/core/styles/createStyles';
import React from 'react';
import showIf from '../_helpers/showIf';
import makeStyles from '../_helpers/makeStyles';
import ExpanderHeader from '../ExpanderHeader';

const useStyles = makeStyles(
  createStyles({
    root: {
      display: 'flex',
      flex: '0 0 auto',
      flexDirection: 'column',
    },
    header: {},
    content: {
      display: 'flex',
      flex: '1 1 auto',
      flexDirection: 'column',
    },
  }),
  { name: 'UxtExpander' },
);

export interface ExpanderProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  classes?: object;
  headerComponent?:
    | string
    | React.FC<any>
    | React.ComponentClass<any, any>
    | ((props: any) => JSX.Element);
  headerText?: string;
  isDisabled?: boolean;
  isOpen?: boolean;
  onIsOpenChange?: (isOpen: boolean) => void;
}

const Expander = React.forwardRef(function Expander(
  props: ExpanderProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const {
    children,
    className,
    classes: classesProp,
    headerComponent = ExpanderHeader,
    headerText,
    isDisabled,
    isOpen,
    onIsOpenChange,
    ...rest
  } = props;
  const classes = useStyles(props);

  return (
    <div className={classnames(classes.root, className)} ref={ref} {...rest}>
      {React.createElement(headerComponent, {
        className: classes.header,
        isDisabled: isDisabled,
        isOpen: isOpen,
        onIsOpenChange: onIsOpenChange,
        text: headerText,
      })}
      {showIf(isOpen)(<div className={classes.content}>{children}</div>)}
    </div>
  );
});

export default React.memo(Expander);
