import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Button from './Button';

export default {
  title: "ReactComponentLibrary/Button",
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args}>Click me!</Button>;

export const SizeMBnt = Template.bind({});

SizeMBnt.args = {
  size: 'm',
};

export const TypeSecondaryBtn = Template.bind({});

TypeSecondaryBtn.args = {
  type: "secondary",
};