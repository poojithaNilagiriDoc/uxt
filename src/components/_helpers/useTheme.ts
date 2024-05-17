import { default as useThemeWithoutDefault } from '@material-ui/core/styles/useTheme';
import defaultTheme from '../../themes/light';
import { UxtTheme } from '../../themes/UxtTheme';

export default function useTheme(): UxtTheme {
  return useThemeWithoutDefault() || defaultTheme;
}
