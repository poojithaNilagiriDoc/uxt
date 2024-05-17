import React from 'react';
import { action } from '@storybook/addon-actions';
import Shell from '../../Shell';
import WizardStep from '../../WizardStep';
import Wizard from '../index';

export default function WizardWithStepIsNextEnabled() {
  return (
    <Shell>
      <Wizard
        onFinish={action('onFinish')}
        onStepChange={action('onStepChange')}
        step="a"
      >
        <WizardStep isNextEnabled={false} stepId="a">
          A
        </WizardStep>
        <WizardStep stepId="b">B</WizardStep>
        <WizardStep stepId="c">C</WizardStep>
      </Wizard>
    </Shell>
  );
}
