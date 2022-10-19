import React from 'react';
import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { fireEvent } from '@testing-library/dom'
import '@testing-library/jest-dom';

import Slider from './Slider';

describe('button', () => {
  test('render with default args', () => {
    render(
      <Slider
        title='Title'
        costRange={[450, 1000]}
        defaultCost={480}
      />
    );

    const slider = screen.getByTestId('slider');
    const sliderInput = slider.getElementsByTagName('input')[0];

    expect(slider).toBeInTheDocument();

    expect(slider.getElementsByClassName('slider__title')[0].textContent).toBe('Title');
    expect(slider.getElementsByClassName('slider__current-value')[0].textContent).toBe('480 000 ₽');
    expect(slider.getElementsByClassName('slider-cost-range__value')[0].textContent).toBe('450 тыс. ₽');
    expect(slider.getElementsByClassName('slider-cost-range__value')[1].textContent).toBe('1 млн. ₽');

    expect(slider.getElementsByClassName('slider__track')[0]).toHaveStyle('width: 5.454545454545454%');
    expect(Math.round(Number(sliderInput.value))).toEqual(55);
    expect(sliderInput.min).toBe("0");
    expect(sliderInput.max).toBe("1000");
  });

  test('render with different args', () => {
    render(
      <Slider
        title='Title'
        costRange={[790, 10000]}
        defaultCost={8204}
        color="red200"
        currensy="€"
      />
    );

    const slider = screen.getByTestId('slider');
    const sliderInput = slider.getElementsByTagName('input')[0];

    expect(slider.classList.contains('slider_red200')).toBeTruthy();

    expect(slider.getElementsByClassName('slider__current-value')[0].textContent).toBe('8 204 000 €');
    expect(slider.getElementsByClassName('slider__track')[0]).toHaveStyle('width: 80.49945711183499%');

    expect(Math.round(Number(sliderInput.value))).toEqual(805);
  });

  test('render with border values (defaultCost lower then range)', () => {
    render(
      <Slider
        title='Title'
        costRange={[450, 1000]}
        defaultCost={300}
      />
    );

    const slider = screen.getByTestId('slider');

    expect(slider.getElementsByClassName('slider__current-value')[0].textContent).toBe('450 000 ₽');
  });

  test('render with border values (defaultCost bigger then range)', () => {
    render(
      <Slider
        title='Title'
        costRange={[450, 1000]}
        defaultCost={1100}
      />
    );

    const slider = screen.getByTestId('slider');

    expect(slider.getElementsByClassName('slider__current-value')[0].textContent).toBe('1 000 000 ₽');
  });

  test('call cb', () => {
    const cb = jest.fn();
    window = Object.assign(window, { innerWidth: 500 });

    render(
      <div style={{ width: '500px' }}>
        <Slider
          title='Title'
          costRange={[500, 1000]}
          defaultCost={500}
          onChange={cb}
        />
      </div>
    );

    const slider = screen.getByTestId('slider');
    const sliderInput = slider.getElementsByTagName('input')[0];

    fireEvent.mouseDown(sliderInput);
    fireEvent.mouseUp(sliderInput);

    expect(cb).toHaveBeenCalled();
    expect(cb).toHaveBeenCalledTimes(1);
  });
});