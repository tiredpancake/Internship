import React from 'react';
import { CellCards } from './CellCards';

export default {
  title: 'Components/CellCards',
  component: CellCards,
  argTypes: {
    heightClass: { control: 'text' },
    bgClass: { control: 'text' },
    content: { control: 'text' },
    hover: { control: 'text' },
  },
};

const Template = (args) => <CellCards {...args} />;

export const Default = Template.bind({});
Default.args = {
  heightClass: 'h-10',
  bgClass: 'bg-green-200',
  content: '12.5',
  hover: 'hover:bg-green-300',
};

export const NegativeValue = Template.bind({});
NegativeValue.args = {
  heightClass: 'h-10',
  bgClass: 'bg-red500',
  content: -9.3,
  hover: 'hover:bg-red-300',
};

export const ZeroValue = Template.bind({});
ZeroValue.args = {
  heightClass: 'h-10',
  bgClass: 'bg-gray-200',
  content: '0',
  hover: 'hover:bg-gray-300',
};

export const NullValue = Template.bind({});
NullValue.args = {
  heightClass: 'h-10',
  bgClass: 'bg-transparent',
  content: 'null',
  hover: '',
};


