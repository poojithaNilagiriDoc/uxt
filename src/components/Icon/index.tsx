import classnames from 'classnames';
import isNumber from 'lodash/fp/isNumber';
import createStyles from '@material-ui/core/styles/createStyles';
import React from 'react';
import makeStyles from '../_helpers/makeStyles';
import sanitize from '../_helpers/sanitize';

function svgSizeToPixels(size) {
  if (isNumber(size)) return size;

  if (size === 'small') return 16;

  if (size === 'large') return 32;

  return 24;
}

const useStyles = makeStyles(
  createStyles({
    root: {
      alignItems: 'center',
      display: 'flex',
      fill: 'inherit',
      flex: '0 0 auto',
      justifyContent: 'center',
      height: 40,
      overflow: 'hidden',
      width: 40,
      '& > svg': {
        height: (props: IconProps) => svgSizeToPixels(props.size),
        width: (props: IconProps) => svgSizeToPixels(props.size),
      },
    },
    clickable: {
      cursor: 'pointer',
    },
  }),
  { name: 'UxtIcon' },
);

export interface IconProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  classes?: object;
  size?: 'small' | 'regular' | 'large' | number;
  svg?: string;
}

const Icon = React.forwardRef(function Icon(
  props: IconProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const { className, classes: classesProp, svg, onClick, ...rest } = props;
  const classes = useStyles(props);

  return (
    <div
      className={classnames(
        classes.root,
        { [classes.clickable]: onClick },
        className,
      )}
      dangerouslySetInnerHTML={{ __html: sanitize(svg) }}
      onClick={onClick}
      ref={ref}
      {...rest}
    />
  );
});

export default React.memo(Icon);
