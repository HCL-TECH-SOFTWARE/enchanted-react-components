/* ======================================================================== *
 * Copyright 2024 HCL America Inc.                                          *
 * Licensed under the Apache License, Version 2.0 (the "License");          *
 * you may not use this file except in compliance with the License.         *
 * You may obtain a copy of the License at                                  *
 *                                                                          *
 * http://www.apache.org/licenses/LICENSE-2.0                               *
 *                                                                          *
 * Unless required by applicable law or agreed to in writing, software      *
 * distributed under the License is distributed on an "AS IS" BASIS,        *
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. *
 * See the License for the specific language governing permissions and      *
 * limitations under the License.                                           *
 * ======================================================================== */

module.exports = {
  "stories": [
    "../src/!(hidden_components)/**/*.stories.@(js|jsx|ts|tsx)",
    "../src/**/*.mdx",
  ],

  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-themes",
    "@storybook/addon-a11y",
    "@storybook/addon-docs"
  ],

  "framework": {
    name: "@storybook/react-webpack5",
    options: {}
  },

  staticDirs: ['../public'],

  webpackFinal: async (config) => {
    config.watchOptions = {
      ...config.watchOptions,
      ignored: ['**/node_modules/', '**/src/__tests__/unit/__image_snapshots__/**/*.png']
    };

    // Add babel-loader to handle TypeScript and JSX files
    config.module.rules.push({
      test: /\.(ts|tsx|js|jsx)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: require.resolve('babel-loader'),
          options: {
            presets: [
              require.resolve('@babel/preset-env'),
              require.resolve('@babel/preset-react'),
              require.resolve('@babel/preset-typescript'),
            ],
          },
        },
      ],
    });

    return config;
  }
}
