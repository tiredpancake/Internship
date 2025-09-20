import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
  stories: ['../src/Components/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: ['@nx/react/plugins/storybook'],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
    staticDirs: ['../public'],

  webpackFinal: async (config) => {
    if (!config.module) config.module = { rules: [] };
    if (!config.module.rules) config.module.rules = [];

    // Webpack rule to handle font files
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      type: 'asset/resource',
      generator: { filename: 'static/fonts/[name][ext]' },
    });


    return config;
  },
};

export default config;
