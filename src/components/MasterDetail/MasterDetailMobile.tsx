import classnames from 'classnames';
import createStyles from '@material-ui/core/styles/createStyles';
import React from 'react';
import hideIf from '../_helpers/hideIf';
import showIf from '../_helpers/showIf';
import { UxtTheme } from '../../themes/UxtTheme';
import makeStyles from '../_helpers/makeStyles';
import Master from '../Master';
import isDOMTypeElement from '../_helpers/isDOMTypeElement';
import isElement from '../_helpers/isElement';

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {
        display: 'flex',
        flex: '1 1 auto',
        flexDirection: 'column',
        overflow: 'inherit',
      },
      transition: {
        display: 'flex',
        flex: '1 1 auto',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative',
      },
      page: {
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        flex: '1 1 auto',
        flexDirection: 'column',
        overflowY: 'auto',
      },
    }),
  { name: 'UxtMasterDetailMobile' },
);

export interface MasterDetailMobileProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  classes?: object;
  currentViewName?: string;
  getMasterItemText?: (viewName: string) => string;
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

const MasterDetailMobile = React.forwardRef(function MasterDetailMobile(
  props: MasterDetailMobileProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const {
    className,
    classes: classesProp,
    currentViewName,
    getMasterItemText,
    masterComponent = Master,
    onCurrentViewNameChange = () => {},
    views = {},
    ...rest
  } = props;
  const classes = useStyles(props);

  const contentView = React.useMemo(() => {
    if (
      currentViewName === undefined ||
      currentViewName === '' ||
      currentViewName === null
    )
      return null;

    const View = views[currentViewName];
    if (View === undefined) return null;

    if (typeof View === 'string' || isDOMTypeElement(View)) return View;

    if (isElement(View) && !isDOMTypeElement(View))
      return React.cloneElement(View as any, {
        ...props,
        isScreenWide: false,
      });

    return React.createElement(View as any, {
      ...props,
      isScreenWide: false,
    });
  }, [views, currentViewName, onCurrentViewNameChange]);

  return (
    <div className={classnames(classes.root, className)} ref={ref} {...rest}>
      <div className={classes.transition}>
        <div className={classes.page}>
          {hideIf(currentViewName || currentViewName !== '')(() =>
            React.createElement(masterComponent, {
              currentViewName: currentViewName,
              isScreenWide: false,
              onCurrentViewNameChange: onCurrentViewNameChange,
              viewNames: Object.keys(views),
              getMasterItemText,
            }),
          )}
          {showIf(currentViewName && views[currentViewName])(() => contentView)}
        </div>
      </div>
    </div>
  );
});

export default React.memo(MasterDetailMobile);
