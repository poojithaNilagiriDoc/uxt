import classnames from 'classnames';
import noop from 'lodash/fp/noop';
import createStyles from '@material-ui/core/styles/createStyles';
import React from 'react';
import { UxtTheme } from '../../themes/UxtTheme';
import makeStyles from '../_helpers/makeStyles';
import ExpanderHeader from '../ExpanderHeader';

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {
        backgroundColor: theme.palette.action.hover,
        borderBottom: `1px solid ${theme.palette.divider}`,
        borderTop: 0,
      },
      text: {
        ...theme.typography.subtitle2,
      },
    }),
  { name: 'UxtPropertySectionHeader' },
);

export interface PropertySectionHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  classes?: object;
  isCollapsible?: boolean;
  isOpen?: boolean;
  name?: string;
}

const PropertySectionHeader = React.forwardRef(function PropertySectionHeader(
  props: PropertySectionHeaderProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const {
    className,
    classes: classesProp,
    isCollapsible,
    isOpen,
    name,
    onClick,
    ...rest
  } = props;
  const classes = useStyles(props);

  return (
    <ExpanderHeader
      className={classnames(classes.root, className)}
      classes={{ text: classes.text }}
      isDisabled={!isCollapsible}
      isOpen={isOpen}
      onClick={isCollapsible ? onClick : noop}
      ref={ref}
      text={name}
      {...rest}
    />
  );
});

export default React.memo(PropertySectionHeader);
