import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { ChartPage } from './chart';

const meta: Meta<typeof ChartPage> = {
  title: 'Components/ChartPage',
  component: ChartPage,
};

export default meta;

type Story = StoryObj<typeof ChartPage>;

export const Default: Story = {
  args: {},
};
