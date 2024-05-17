import React from 'react';
import classnames from 'classnames';
import createStyles from '@material-ui/core/styles/createStyles';
import { UxtTheme } from '../../themes/UxtTheme';
import makeStyles from '../_helpers/makeStyles';
import safeGet from '../_helpers/safeGet';

export interface Item {
  [key: string]: any;
}

export interface InfoMapLinkProps extends React.SVGAttributes<SVGPathElement> {
  className?: string;
  classes?: Record<string, string>;
  dataId?: string;
  graphRef?: React.RefObject<SVGSVGElement>;
  idAccessor?: string | (() => string);
  item?: Item;
  isIndirectLink?: boolean;
  label?: React.ReactNode;
  markerId?: string;
  onClick?: (event: React.MouseEvent<SVGPathElement>) => {};
  showArrowHead?: boolean;
  showLabel?: boolean;
  stroke?: React.CSSProperties['stroke'];
  strokeDasharray?: React.CSSProperties['strokeDasharray'];
  strokeDashoffset?: React.CSSProperties['strokeDashoffset'];
  strokeHighlight?: React.CSSProperties['stroke'];
}

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {
        stroke: ({ stroke }: InfoMapLinkProps) =>
          stroke || theme.palette.grey[500],
        strokeWidth: ({ strokeWidth }: InfoMapLinkProps) => strokeWidth,
        strokeDasharray: ({ strokeDasharray }: InfoMapLinkProps) =>
          strokeDasharray,
        strokeDashoffset: ({ strokeDasharray }: InfoMapLinkProps) =>
          strokeDasharray,
        pointerEvents: 'all',
        '&:hover': {
          stroke: ({ strokeHighlight }: InfoMapLinkProps) =>
            strokeHighlight || theme.palette.grey[300],
        },
      },
    }),
  {
    name: 'UxtInfoMapLink',
  },
);

const InfoMapLink = React.forwardRef(
  (props: InfoMapLinkProps, ref: React.Ref<SVGPathElement>) => {
    const {
      className,
      dataId,
      onClick,
      showArrowHead = false,
      markerId,
      idAccessor = 'id',
      d,
      graphRef,
      item,
      strokeHighlight,
      ...rest
    } = props;
    const classes = useStyles(props);

    return (
      <path
        data-id={dataId}
        id={safeGet('', idAccessor, item)}
        ref={ref}
        className={classnames(classes.root, className)}
        markerEnd={showArrowHead ? `url(#${markerId})` : undefined}
        onClick={onClick}
        {...rest}
      />
    );
  },
);

export default React.memo(InfoMapLink);
