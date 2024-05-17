import muiWithStyles from '@material-ui/core/styles/withStyles';
import defaultTheme from '../../themes/light';

export default function withStyles(stylesOrCreator, options): any {
  return muiWithStyles(stylesOrCreator, {
    defaultTheme,
    ...options,
  });
}
