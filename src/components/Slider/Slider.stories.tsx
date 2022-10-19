/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Slider from './Slider';

export default {
  title: 'ReactComponentLibrary/Slider',
  component: Slider,
} as ComponentMeta<typeof Slider>;

const Template: ComponentStory<typeof Slider> = (args) => (
  <Slider {...args} />
);

export const SliderDefault = Template.bind({});

SliderDefault.args = {
  title: 'Стоимость недвижимости',
  range: [0, 1000],
  costRange: [450, 1000],
  defaultCost: 603,
  // eslint-disable-next-line no-console
  onChange: console.log,
};

export const SliderWithArgs = Template.bind({});

SliderWithArgs.args = {
  title: 'Стоимость недвижимости',
  costRange: [790, 10000],
  defaultCost: 8204,
};
