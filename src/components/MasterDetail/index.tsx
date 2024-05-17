import createStyles from '@material-ui/core/styles/createStyles';
import React from 'react';
import makeStyles from '../_helpers/makeStyles';
import MasterDetailDesktop from './MasterDetailDesktop';
import MasterDetailMobile from './MasterDetailMobile';

const useStyles = makeStyles(createStyles({ root: {} }), {
  name: 'UxtMasterDetail',
});

export interface MasterDetailProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  classes?: object;
  currentViewName?: string;
  getMasterItemText?: (viewName: string) => string;
  isScreenWide?: boolean;
  masterComponent?: string | React.FC<any> | React.ComponentClass<any, any>;
  onCurrentViewNameChange?: (currentViewName: string) => void;
  views?: {
    [key: string]:
      | string
      | React.FC<any>
      | React.ComponentClass<any, any>
      | React.ReactElement<any>;
  };
}

const MasterDetail = React.forwardRef(function MasterDetail(
  props: MasterDetailProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const { classes: classesProp, isScreenWide, ...rest } = props;
  const classes = useStyles(props);
  const Component = isScreenWide ? MasterDetailDesktop : MasterDetailMobile;

  return <Component classes={classes} ref={ref} {...rest} />;
});

export default React.memo(MasterDetail);
