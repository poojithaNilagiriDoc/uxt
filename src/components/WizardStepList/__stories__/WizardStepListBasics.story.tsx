import React from 'react';
import { action } from '@storybook/addon-actions';
import WizardStepList from '../index';

export default function WizardStepListBasics() {
  return (
    <WizardStepList
      activeStepId="2"
      completedStepIds={['1']}
      invalidStepIds={['2']}
      onStepChange={action('onStepChange')}
      steps={[
        { getIsNextEnabled: () => true, stepId: '1', text: 'One' },
        { getIsNextEnabled: () => false, stepId: '2', text: 'Two' },
      ]}
    />
  );
}
