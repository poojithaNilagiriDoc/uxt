import React from 'react';
import first from 'lodash/fp/first';
import classnames from 'classnames';
import createStyles from '@material-ui/core/styles/createStyles';
import { UxtTheme } from '../../themes/UxtTheme';
import makeStyles from '../_helpers/makeStyles';
import ContentSwitcher from '../_internal/ContentSwitcher';
import Master from '../Master';
import isDOMTypeElement from '../_helpers/isDOMTypeElement';
import isElement from '../_helpers/isElement';

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {
        display: 'flex',
        flex: '1 1 auto',
        flexDirection: 'row',
        overflow: 'inherit',
      },
      master: {
        borderRight: `1px solid ${theme.palette.divider}`,
        flex: '0 0 240px',
      },
      detail: {
        display: 'flex',
        flex: '1 1 auto',
        flexDirection: 'column',
      },
    }),
  { name: 'UxtMasterDetailDesktop' },
);

export interface MasterDetailDesktopProps
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
      | React.ReactElement<any, string | React.JSXElementConstructor<any>>;
  };
}

const MasterDetailDesktop = React.forwardRef(function MasterDetailDesktop(
  props: MasterDetailDesktopProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const {
    className,
    classes: classesProp,
    currentViewName,
    getMasterItemText,
    masterComponent: MasterComponent = Master,
    onCurrentViewNameChange,
    views = {},
    ...rest
  } = props;
  const classes = useStyles(props);

  const contentMap = React.useMemo(() => {
    return Object.keys(views).reduce(
      (acc: Record<string, unknown>, viewName: string) => {
        const View = views[viewName];

        if (typeof View === 'string' || isDOMTypeElement(View))
          return { ...acc, [viewName]: View };

        if (isElement(View) && !isDOMTypeElement(View))
          return {
            ...acc,
            [viewName]: React.cloneElement(View as any, {
              isScreenWide: true,
              ...props,
            }),
          };

        return {
          ...acc,
          [viewName]: React.createElement(View as any, {
            isScreenWide: true,
            ...props,
          }),
        };
      },
      {},
    );
  }, [props, views]);

  return (
    <div className={classnames(classes.root, className)} ref={ref} {...rest}>
      <MasterComponent
        className={classes.master}
        currentViewName={currentViewName || first(Object.keys(views))}
        getMasterItemText={getMasterItemText}
        isScreenWide={true}
        onCurrentViewNameChange={onCurrentViewNameChange}
        viewNames={Object.keys(views)}
      />
      <ContentSwitcher
        className={classes.detail}
        contentKey={currentViewName || first(Object.keys(views))}
        contentMap={contentMap}
      />
    </div>
  );
});

export default React.memo(MasterDetailDesktop);
