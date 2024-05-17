import classnames from 'classnames';
import createStyles from '@material-ui/core/styles/createStyles';
import React from 'react';
import { UxtTheme } from '../../../themes/UxtTheme';
import makeStyles from '../../_helpers/makeStyles';

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {
        height: 40,
        '& svg': { height: 40 },
      },
      graphicClass1: { fill: 'none' },
      lightBlueSection: { fill: '#85cddb' },
      greenSection: { fill: '#a5d867' },
      darkBlueSection: { fill: '#0097ba' },
      text: { fill: theme.palette.text.primary },
    }),
  { name: 'UxtHexagonLogo' },
);

export interface HexagonLogoProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  classes?: object;
}

const HexagonLogo = React.forwardRef(function HexagonLogo(
  props: HexagonLogoProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const { className, classes: classesProp, ...rest } = props;
  const classes = useStyles(props);
  return (
    <div className={classnames(classes.root, className)} ref={ref} {...rest}>
      <svg viewBox="0 0 284 88">
        <path
          className={classes.text}
          d="M115,59.21v-13H102.73v13H97.3V29.38h5.43V41H115V29.38h5.43V59.21Z"
        />
        <path
          className={classes.text}
          d="M126.06,59.21V29.38h20.36V34.3H131.48v6.94h13v4.88h-13v8.16h14.94v4.92Z"
        />
        <path
          className={classes.text}
          d="M168.34,59.21l-6.68-10.85L155,59.21h-5.84L158.5,44l-9.29-14.64h5.93l6.69,10.44,6.48-10.44h5.89L165,44.07l9.29,15.14Z"
        />
        <path
          className={classes.text}
          d="M195.85,59.21l-1.94-5.72H182l-1.93,5.72h-5.47l10.47-29.83H191l10.47,29.83ZM188,36l-4.25,12.58h8.5Z"
        />
        <path
          className={classes.text}
          d="M226,59.21l-3.15-3.28c-.89,1.73-3.74,3.79-7.49,3.83-3.44,0-6.52-.84-8.88-3.33-3.11-3.24-3.87-7.24-3.87-12.11s.63-8.75,3.87-12a12.83,12.83,0,0,1,8.88-3.5,12.32,12.32,0,0,1,8.83,3.41,9.15,9.15,0,0,1,2.73,6h-5.56a4.66,4.66,0,0,0-1.3-2.74,6,6,0,0,0-4.75-1.81,7,7,0,0,0-4.89,2c-2.06,2.15-2.31,5.85-2.31,8.58s.29,6.56,2.35,8.71a6.84,6.84,0,0,0,4.84,1.89,6,6,0,0,0,4.46-1.73c1.59-1.68,1.93-3.53,1.93-5.81h-7.11v-4.5h12.37V59.21Z"
        />
        <path
          className={classes.text}
          d="M252.27,56.39a12.62,12.62,0,0,1-17.16,0c-3.24-3.24-3.79-7.2-3.79-12.08s.55-8.88,3.79-12.11a12.61,12.61,0,0,1,17.16,0c3.24,3.24,3.79,7.23,3.79,12.11S255.5,53.15,252.27,56.39ZM248.4,35.73a6.61,6.61,0,0,0-9.43,0c-2.05,2.15-2.15,5.85-2.15,8.58s.09,6.4,2.15,8.54a6.61,6.61,0,0,0,9.43,0c2.06-2.14,2.14-5.8,2.14-8.54S250.46,37.88,248.4,35.73Z"
        />
        <path
          className={classes.text}
          d="M278.46,59.21,265.54,38.72V59.21H260.2V29.38H266l12.75,20.19V29.38H284V59.21Z"
        />
        <polygon
          className={classes.lightBlueSection}
          points="-0.07 65.89 25.22 65.89 18.89 54.94 -0.07 65.89"
        />
        <polygon
          className={classes.lightBlueSection}
          points="50.51 65.89 75.8 22.09 37.86 43.99 37.86 65.89 50.51 65.89"
        />
        <polygon
          className={classes.greenSection}
          points="37.86 87.8 75.8 65.89 50.51 65.89 37.86 87.8"
        />
        <polygon
          className={classes.greenSection}
          points="18.89 54.94 37.86 43.99 37.86 0.19 12.57 43.99 18.89 54.94"
        />
        <polygon
          className={classes.greenSection}
          points="25.22 65.89 37.86 87.8 37.86 65.89 25.22 65.89"
        />
        <polygon
          className={classes.lightBlueSection}
          points="-0.07 22.09 -0.07 65.89 12.57 43.99 -0.07 22.09"
        />
        <polygon
          className={classes.darkBlueSection}
          points="75.8 22.09 50.51 65.89 75.8 65.89 75.8 22.09 75.8 22.09"
        />
        <polygon
          className={classes.darkBlueSection}
          points="37.86 43.99 18.89 54.94 25.22 65.89 37.86 65.89 37.86 43.99"
        />
        <polygon
          className={classes.darkBlueSection}
          points="37.86 0.19 -0.07 22.09 12.57 43.99 37.86 0.19"
        />
      </svg>
    </div>
  );
});

export default React.memo(HexagonLogo);
