import { Meta, StoryObj } from '@storybook/react';
import { StatsTableContainer } from './StatsTableContainer';
import { DataProvider } from '../../data/datacontext';

const meta: Meta<typeof StatsTableContainer> = {
  title: 'Components/StatsTableContainer',
  component: StatsTableContainer,
  decorators: [
    (Story) => (
      <DataProvider>
        <Story />
      </DataProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof StatsTableContainer>;

export const Default: Story = {
  args: {}, 
};

export const WithMockData: Story = {
  args: {}, 
};
