import type { StorybookConfig } from '@storybook/react-vite'

import { KEY } from '../src/constants'
import data from './figma.json'

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    'storybook-addon-tag-badges',
    {
      name: './local-preset.js',
      options: {
        [KEY]: { data },

        // NOTE: Will work.
        // [KEY]: { path: path.resolve(__dirname, "./figma.json") },

        // NOTE: Will throw a "ENOENT" error.
        // [KEY]: { path: path.resolve("./figma.json") },

        // NOTE: Will throw a "relative path" error.
        // [KEY]: { path: "./figma.json" },
      },
    },
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
}

export default config
