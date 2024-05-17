import muiMakeStyles from '@material-ui/core/styles/makeStyles';
import defaultTheme from '../../themes/light';

export default function makeStyles(stylesOrCreator, options) {
  return muiMakeStyles(stylesOrCreator, {
    defaultTheme,
    ...options,
  });
}
