import React, {
  ChangeEvent, FC, useState, useCallback,
} from 'react';
import cx from 'classnames';
import clamp from 'lodash.clamp';
import noop from 'lodash.noop';
import { getFormattedTotalCost } from '@/utils';
import './styles.scss';

type SliderProps = {
  title: string,
  defaultCost: number,
  disabled?: boolean,
  range?: [number, number],
  costRange: [number, number],
  step?: number,
  color?: 'red100' | 'red200' | 'red300',
  currensy?: '₽' | '$' | '€' | '£',
  // eslint-disable-next-line no-unused-vars
  cb?: (n?: number) => void,
}

const Slider: FC<SliderProps> = ({
  title = '',
  defaultCost,
  disabled = false,
  range = [0, 1000],
  costRange,
  step = 1,
  color = 'red100',
  currensy = '₽',
  cb = noop,
}: SliderProps) => {
  // eslint-disable-next-line no-unused-vars
  const memoisedCallBack: (n?: number) => void = useCallback(
    () => {
      cb();
    },
    [],
  );

  const [min, max] = range;
  const [minValue, maxValue] = costRange.map((n) => (n <= 0 ? 1 : n));
  const diffFactor = (maxValue - minValue) / 100;

  const defaultValue = ((clamp(defaultCost, ...costRange) - minValue) / diffFactor) * 10;

  const [value, setValue] = useState(defaultValue);

  const getCurrentCost = (v: number): number => {
    const rangeFactor = (100 / max) * v;
    const resultedSelectedCost = Math.round(diffFactor * rangeFactor + minValue) * 1000;

    return resultedSelectedCost;
  };

  const handleChangeRange = (e: ChangeEvent<HTMLInputElement>) => {
    const currentInputValue = Number(e.target.value);
    setValue(currentInputValue);

    const currentCostValue: number = getCurrentCost(currentInputValue);
    memoisedCallBack(currentCostValue);
  };

  const costRates = [
    {
      check: (n: number): boolean => n < 1,
      formattedCost: (n: number): string => `${getFormattedTotalCost(n * 1000)} ${currensy}`,
    },
    {
      check: (n: number): boolean => n < 1000 && n >= 1,
      formattedCost: (n: number): string => `${getFormattedTotalCost(n)} тыс. ${currensy}`,
    },
    {
      check: (n: number): boolean => n >= 1000 && n < 1000000,
      formattedCost: (n: number): string => `${getFormattedTotalCost(n / 1000)} млн. ${currensy}`,
    },
    {
      check: (n: number): boolean => n >= 1000000,
      formattedCost: (n: number): string => `${getFormattedTotalCost(n / 1000000)} млрд. ${currensy}`,
    },
  ];

  const minCostRate = costRates.find(({ check }) => check(minValue))?.formattedCost(minValue);
  const maxCostRate = costRates.find(({ check }) => check(maxValue))?.formattedCost(maxValue);

  const sliderClassNames = cx({
    slider: true,
    [`slider_${color}`]: true,
    slider_disabled: disabled,
  });

  return (
    <div
      className={sliderClassNames}
      data-testid="slider"
    >
      {
        title && (
          <div className="slider__title">
            { title }
          </div>
        )
      }
      <div className="slider__current-value">
        { getFormattedTotalCost(getCurrentCost(value)) }
        {' '}
        { currensy }
      </div>
      <div className="slider__input">
        <div className="slider__root">
          <span className="slider__rail" />
          <span
            className="slider__track"
            style={{
              width: `${(100 / max) * value}%`,
            }}
          />
        </div>
        <input
          type="range"
          disabled={disabled}
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChangeRange}
        />
      </div>

      <div className="slider-cost-range">
        <div className="slider-cost-range__value">
          { minCostRate }

        </div>
        <div className="slider-cost-range__value">
          { maxCostRate }
        </div>
      </div>
    </div>
  );
};

export default Slider;
