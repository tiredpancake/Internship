import { StatsTableContainer } from './StatsTableContainer'; // ✅ Use curly braces
import { DataProvider } from '../../data/datacontext';

export default {
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

const Template = (args) => <StatsTableContainer {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const WithMockData = Template.bind({});
