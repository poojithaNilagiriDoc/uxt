import classnames from 'classnames';
import isNumber from 'lodash/fp/isNumber';
import createStyles from '@material-ui/core/styles/createStyles';
import React from 'react';
import makeStyles from '../_helpers/makeStyles';
import sanitize from '../_helpers/sanitize';

function svgSizeToPixels(size) {
  if (isNumber(size)) return size;

  if (size === 'small') return 64;

  if (size === 'large') return 192;

  return 128;
}

const useStyles = makeStyles(
  createStyles({
    root: {
      fill: 'inherit',
      flex: '0 0 auto',
      height: (props: GraphicProps) => svgSizeToPixels(props.size),
      width: (props: GraphicProps) => svgSizeToPixels(props.size),
    },
  }),
  { name: 'UxtGraphic' },
);

export interface GraphicProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  classes?: object;
  fill?: React.CSSProperties['fill'];
  size?: 'small' | 'regular' | 'large' | number;
  svg?: string;
}

const Graphic = React.forwardRef(function Graphic(
  props: GraphicProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const { className, classes: classesProp, size, svg, ...rest } = props;
  const classes = useStyles(props);

  return (
    <div
      className={classnames(classes.root, className)}
      dangerouslySetInnerHTML={{ __html: sanitize(svg) }}
      ref={ref}
      {...rest}
    />
  );
});

export default React.memo(Graphic);
