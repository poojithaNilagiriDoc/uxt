import classnames from 'classnames';
import createStyles from '@material-ui/core/styles/createStyles';
import React from 'react';
import showIf from '../_helpers/showIf';
import { UxtTheme } from '../../themes/UxtTheme';
import makeStyles from '../_helpers/makeStyles';
import useTheme from '../_helpers/useTheme';
import Resizer from '../_internal/Resizer';
import useCombinedRefs from '../../hooks/useCombinedRefs';

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {
        borderBottom: `1px solid ${theme.palette.divider}`,
        display: 'flex',
        flex: '0 0 auto',
        height: theme.height.item || 48,
        overflow: 'hidden',
      },
      nameCell: {
        borderRight: `1px solid ${theme.palette.divider}`,
        display: 'flex',
        flex: (props: PropertyProps) =>
          !props.nameColumnWidth ? '1 1 33%' : '0 0 auto',
        overflow: 'hidden',
        paddingLeft: theme.spacing(2),
        position: 'relative',
      },
      nameColumnWidth: {
        width: (props: PropertyProps) => props.nameColumnWidth,
      },
      nameText: {
        alignSelf: 'center',
        overflow: 'hidden',
        paddingRight: theme.spacing(2),
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      },
      valueCell: {
        alignItems: 'center',
        display: 'flex',
        flex: '1 1 66%',
        overflow: 'hidden',
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
      },
      valueText: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        width: '100%',
      },
    }),
  { name: 'UxtProperty' },
);

export interface PropertyProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  classes?: object;
  name?: string;
  nameColumnWidth?: number;
  onNameColumnWidthChange?: (nameColumnWidth: number) => void;
  value?: React.ReactNode;
}

const Property = React.forwardRef<HTMLDivElement, PropertyProps>(
  function Property(
    props: PropertyProps,
    ref: React.RefObject<HTMLDivElement>,
  ) {
    const {
      className,
      classes: classesProp,
      name,
      nameColumnWidth,
      onNameColumnWidthChange,
      value,
      ...rest
    } = props;
    const classes = useStyles(props);
    const innerRef = React.useRef<HTMLDivElement>(null);
    const rootRef = useCombinedRefs<HTMLDivElement>(ref, innerRef);
    const theme = useTheme() as UxtTheme;

    return (
      <div
        className={classnames(classes.root, className)}
        ref={rootRef}
        {...rest}
      >
        <div
          className={classnames(classes.nameCell, {
            [classes.nameColumnWidth]: nameColumnWidth,
          })}
          title={name}
        >
          <span className={classes.nameText}>{name}</span>
          {showIf(onNameColumnWidthChange)(() => (
            <Resizer
              enabledDragHandles={['r']}
              minWidth={theme?.height?.item || 48}
              onWidthChange={onNameColumnWidthChange}
              width={nameColumnWidth}
              maxWidth={
                rootRef.current
                  ? rootRef.current.getBoundingClientRect().width -
                    (theme?.height?.item || 48)
                  : undefined
              }
            />
          ))}
        </div>
        <div
          className={classes.valueCell}
          title={typeof value === 'string' ? value : undefined}
        >
          <div className={classes.valueText}>{value}</div>
        </div>
      </div>
    );
  },
);

export default React.memo(Property);
