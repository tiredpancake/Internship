/** @type { import('@storybook/react-webpack5').Preview } */
import '../src/index.css'; // ✅ This pulls in Tailwind styles
const preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
};

export default preview;