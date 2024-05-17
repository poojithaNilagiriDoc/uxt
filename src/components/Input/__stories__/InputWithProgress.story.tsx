import React from 'react';
import newIconNeeded from 'uxt-graphics/icons/new-icon-needed';
import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '../../_helpers/makeStyles';
import Input from '../index';
import Checkbox from '../../Checkbox';
import type { UxtTheme } from '../../../themes/UxtTheme';

const useStyles = makeStyles(
  (theme: UxtTheme) =>
    createStyles({
      root: {
        ...theme.mixins.absoluteFill,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: theme.spacing(2),
        flexDirection: 'column',
      },
      container: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: theme.spacing(2),
        flexDirection: 'column',
        width: 400,
      },
    }),
  {
    name: 'UxtReactStorybookInputWithProgress',
  },
);

export default function InputWithProgress() {
  const [value, setValue] = React.useState('');

  const [showProgress, setShowProgress] = React.useState<boolean>(false);

  const classes = useStyles({});

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Checkbox
          text="Show Progress Indicator"
          isActive={showProgress}
          onIsActiveChange={setShowProgress}
        />
        <Input
          label=""
          onValueChange={v => setValue(v)}
          value={value}
          isProgressBarVisible={showProgress}
        />
        <Input
          label="Favorite food"
          onValueChange={v => setValue(v)}
          value={value}
          iconSvg={newIconNeeded}
          isProgressBarVisible={showProgress}
          progressIndicatorType="spinner"
        />
        <Input
          label="Favorite food"
          onValueChange={v => setValue(v)}
          value={value}
          isProgressBarVisible={showProgress}
          progressIndicatorType="linear"
        />
      </div>
    </div>
  );
}
