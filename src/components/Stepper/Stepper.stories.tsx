/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Stepper from '.';

export default {
  title: 'ReactComponentLibrary/Stepper',
  component: Stepper,
} as ComponentMeta<typeof Stepper>;

const Template: ComponentStory<typeof Stepper> = (args) => (
  <>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
      Eos, consequatur! Aliquam odit fugiat error,
      assumenda minima doloribus at.
      Repellat adipisci incidunt expedita molestiae inventore explicabo optio ipsum debitis nisi,
      accusamus vitae qui, nesciunt quibusdam architecto sed dolorum, perspiciatis deleniti esse.
      Dolores similique eum pariatur, eveniet ducimus itaque repellendus et fugit.
    </p>
    <Stepper {...args} />
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
      Eos, consequatur! Aliquam odit fugiat error,
      assumenda minima doloribus at.
      Repellat adipisci incidunt expedita molestiae inventore explicabo optio ipsum debitis nisi,
      accusamus vitae qui, nesciunt quibusdam architecto sed dolorum, perspiciatis deleniti esse.
      Dolores similique eum pariatur, eveniet ducimus itaque repellendus et fugit.
    </p>
  </>
);

export const StepperDefault = Template.bind({});

StepperDefault.args = {
  steps: ['Плательщик', 'Получатель', 'Условия', 'Дополнительно'],
  activeStep: 1,
};
