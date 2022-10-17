import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Stepper from '.';

describe('stepper', () => {
  test('initial render', () => {
    render(
      <Stepper
        steps={['One', 'Two', 'Three']}
        activeStep={2}
      />
    );
    
    const stepper = screen.getByTestId('stepper');
    const stepsElements = stepper.getElementsByClassName('step');

    expect(stepper).toBeInTheDocument();
    expect(stepsElements.length).toEqual(3);
    expect(stepsElements[0].classList.contains('step_done')).toBeTruthy();
    expect(stepsElements[0].classList.contains('step_active')).toBeFalsy();
    expect(stepsElements[1].classList.contains('step_active')).toBeTruthy();
    expect(stepsElements[2].classList.contains('step_active')).toBeFalsy();
    expect(stepsElements[2].classList.contains('step_disabled')).toBeTruthy();
  });
});