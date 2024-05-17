import React from 'react';
import WizardStep from '../index';

export default function WizardStepBasics() {
  return (
    <>
      <WizardStep isActive={false} isNextEnabled={true} stepId="1">
        Step 1
      </WizardStep>
      <WizardStep isActive={true} isNextEnabled={false} stepId="2">
        Step 2
      </WizardStep>
    </>
  );
}
