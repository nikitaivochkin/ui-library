import React, { FC } from 'react';
import cx from 'classnames';

import './styles.scss';

type StepperProps = {
  activeStep: number,
  orientation?: 'horisontal' | 'vertical',
  steps: Array<string>,
}

const Stepper: FC<StepperProps> = ({
  activeStep = 1,
  orientation = 'horisontal',
  steps,
}: StepperProps) => {
  const isHorisontal = orientation === 'horisontal';

  const renderSteps = steps.map((title, index) => {
    const i = index + 1;

    const isActive = activeStep === i;
    const isDone = activeStep > i;
    const isDisabled = activeStep < i;

    const isFirstElement = !index;

    const stepClassNames = cx({
      step: true,
      [`step-${orientation}`]: true,
      step_done: isDone,
      step_active: isActive,
      step_disabled: isDisabled,
    });

    return (
      <div
        key={title}
        className={stepClassNames}
      >
        <div className="step__icon-container">
          <div
            className="step__icon"
          >
            <span>{ index + 1 }</span>
          </div>
          <div
            className="step__title"
          >
            { title }
          </div>
          {
            !isFirstElement && isHorisontal && (
              <div
                className="step__line"
              />
            )
          }
        </div>
      </div>
    );
  });

  const stepperClassNames = cx({
    stepper: true,
    [`stepper-${orientation}`]: true,
  });

  return (
    <div
      className={stepperClassNames}
      data-testid="stepper"
    >
      {
        renderSteps
      }
    </div>
  );
};

export default Stepper;
