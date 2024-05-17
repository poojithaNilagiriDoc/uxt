import classnames from 'classnames';
import compose from 'lodash/fp/compose';
import keys from 'lodash/fp/keys';
import map from 'lodash/fp/map';
import Collapse from '@material-ui/core/Collapse';
import createStyles from '@material-ui/core/styles/createStyles';
import React from 'react';
import { transparentize } from 'polished';
import showIf from '../_helpers/showIf';
import { UxtTheme } from '../../themes/UxtTheme';
import makeStyles from '../_helpers/makeStyles';
import Property from '../Property';
import PropertySectionHeader from '../PropertySectionHeader';
import isFunction from '../_helpers/isFunction';

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      },
      body: {},
      '@keyframes loading': {
        '100%': {
          transform: 'translateX(100%)',
        },
      },
      loadingIndicator: {
        width: '100%',
        height: theme.spacing(2),
        borderRadius: theme.spacing(2),
        position: 'relative',
        background: transparentize(0.8, theme.palette.grey[600]),
        overflow: 'hidden',
        '&::after': {
          display: 'block',
          content: '""',
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundClip: 'border-box',
          borderRadius: theme.spacing(2),
          transform: 'translateX(-100%)',
          background: `linear-gradient(90deg, transparent,${transparentize(
            0.9,
            theme.palette.grey[600],
          )}, transparent)`,
          animation: `$loading 1s infinite`,
        },
      },
    }),
  { name: 'UxtPropertySection' },
);

export interface Item {
  name: string;
  value?: any;
}

export interface PropertySectionProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  classes?: object;
  data?: Map<any, any> | { [key: string]: any } | Array<Partial<Item>>;
  defaultCollapsed?: boolean;
  headerComponent?: string | React.FC<any> | React.ComponentClass<any, any>;
  isCollapsible?: boolean;
  isLoading?: boolean;
  isPropertyLoading?: (item: Item) => boolean;
  loadingIndicatorComponent?:
    | React.ReactNode
    | ((property: Item) => React.ReactNode);
  loadingText?: string;
  name?: string;
  nameColumnWidth?: number;
  onNameColumnWidthChange?: (nameColumnWidth: number) => void;
  propertyComponent?: string | React.FC<any> | React.ComponentClass<any, any>;
}

const PropertySection = React.forwardRef(function PropertySection(
  props: PropertySectionProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const {
    className,
    classes: classesObject,
    data,
    defaultCollapsed,
    headerComponent = PropertySectionHeader,
    isCollapsible,
    isLoading = false,
    isPropertyLoading = () => false,
    loadingIndicatorComponent: LoadingIndicatorComponentProp,
    loadingText = 'Loading',
    name,
    nameColumnWidth,
    onNameColumnWidthChange,
    propertyComponent = Property,
    ...rest
  } = props;
  const classes = useStyles(props);
  const [isOpen, setIsOpen] = React.useState(!defaultCollapsed);

  const properties = React.useMemo(
    function () {
      if (data instanceof Map) {
        return Array.from((data as Map<any, any>).keys()).map(name => ({
          value: data.get(name),
          name,
        }));
      } else if (data instanceof Array) {
        return data.map(datum => ({ value: datum.value, name: datum.name }));
      } else {
        return compose(
          map(name => ({ value: data[name], name })),
          keys,
        )(data);
      }
    },
    [data],
  );

  const handleHeaderClick = React.useCallback(
    function handleHeaderClick() {
      setIsOpen(!isOpen);
    },
    [isOpen],
  );

  const getLoadingIndicator = React.useCallback(
    (property: Item): React.ReactNode =>
      (isFunction(LoadingIndicatorComponentProp)
        ? LoadingIndicatorComponentProp(property)
        : LoadingIndicatorComponentProp) || (
        <div className={classes.loadingIndicator} title={loadingText} />
      ),
    [classes.loadingIndicator, loadingText, LoadingIndicatorComponentProp],
  );

  return (
    <div className={classnames(classes.root, className)} ref={ref} {...rest}>
      {showIf(!!name)(
        React.createElement(headerComponent, {
          isCollapsible: isCollapsible,
          onClick: handleHeaderClick,
          isOpen,
          name,
        }),
      )}
      <Collapse in={isOpen}>
        <div className={classes.body}>
          {properties.map((property: Item, index: number) =>
            React.createElement(propertyComponent, {
              key: index,
              name: property.name,
              nameColumnWidth: nameColumnWidth,
              onNameColumnWidthChange: onNameColumnWidthChange,
              value:
                isLoading || (isPropertyLoading && isPropertyLoading(property))
                  ? getLoadingIndicator(property)
                  : property.value,
            }),
          )}
        </div>
      </Collapse>
    </div>
  );
});

export default React.memo(PropertySection);
