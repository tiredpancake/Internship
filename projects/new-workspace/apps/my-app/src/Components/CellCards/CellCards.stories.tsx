import { CellCards } from './CellCards';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof CellCards> = {
  title: 'Components/CellCards',
  component: CellCards,
  argTypes: {
    heightClass: { control: 'text' },
    bgClass: { control: 'text' },
    content: { control: 'text' },
    hover: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof CellCards>;

export const Default: Story = {
  args: {
    heightClass: 'h-10',
    bgClass: 'bg-green-200',
    content: '12.5',
    hover: 'hover:bg-green-300',
  },
};

export const NegativeValue: Story = {
  args: {
    heightClass: 'h-10',
    bgClass: 'bg-red-500',
    content: -9.3,
    hover: 'hover:bg-red-300',
  },
};

export const ZeroValue: Story = {
  args: {
    heightClass: 'h-10',
    bgClass: 'bg-gray-200',
    content: '0',
    hover: 'hover:bg-gray-300',
  },
};

export const NullValue: Story = {
  args: {
    heightClass: 'h-10',
    bgClass: 'bg-transparent',
    content: 'null',
    hover: '',
  },
};
