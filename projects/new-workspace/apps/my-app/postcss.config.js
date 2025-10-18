const { join } = require('path');

module.exports = {
  plugins: {
    tailwindcss: {
      config: join(__dirname, 'tailwind.config.js'),
    },
    autoprefixer: {},
    'postcss-url': {
      url: 'rebase', // rewrites URLs relative to the CSS file
    },
  },
};
