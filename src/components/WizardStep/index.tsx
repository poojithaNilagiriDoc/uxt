import React from 'react';

export interface WizardStepProps {
  children?: React.ReactNode;
  isActive?: boolean;
  isNextEnabled?: boolean;
  stepId?: string;
  dataStepType?: 'first' | 'last' | 'middle';
  className?: string;
}

function WizardStep(props: WizardStepProps) {
  return null;
}

export default React.memo(WizardStep);
