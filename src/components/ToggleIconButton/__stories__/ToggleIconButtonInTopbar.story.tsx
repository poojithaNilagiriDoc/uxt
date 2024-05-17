import React from 'react';
import { action } from '@storybook/addon-actions';
import star from 'uxt-graphics/icons/star';
import { UxtTheme } from '../../../themes/UxtTheme';
import makeStyles from '../../_helpers/makeStyles';
import Topbar from '../../Topbar';
import ToggleIconButton from '../index';

const useStyles = makeStyles(
  (theme: UxtTheme) => ({
    background: { backgroundColor: theme.palette.action.disabled },
    active: { fill: 'inherit' },
  }),
  {},
);

function TopbarToggleIconButton(props) {
  const { classes: classesProp, ...rest } = props;

  return <ToggleIconButton classes={useStyles(props)} {...rest} />;
}

export default function ToggleIconButtonInTopbar() {
  return (
    <Topbar>
      <TopbarToggleIconButton
        iconSvg={star}
        isActive={true}
        onIsActiveChange={action('onIsActiveChange')}
      />
      <TopbarToggleIconButton
        iconSvg={star}
        isActive={false}
        onIsActiveChange={action('onIsActiveChange')}
      />
    </Topbar>
  );
}
