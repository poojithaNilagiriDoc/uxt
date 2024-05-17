import React from 'react';
import Shell from '../../Shell';
import WizardStep from '../../WizardStep';
import Wizard from '../index';

export default function WizardDynamic() {
  const [step, setStep] = React.useState('a');

  return (
    <Shell>
      <Wizard onFinish={() => setStep('a')} onStepChange={setStep} step={step}>
        <WizardStep stepId="a">A</WizardStep>
        <WizardStep stepId="b">B</WizardStep>
        <WizardStep stepId="c">C</WizardStep>
      </Wizard>
    </Shell>
  );
}
