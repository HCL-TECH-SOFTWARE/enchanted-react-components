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
import { MatchImageSnapshotOptions } from 'jest-image-snapshot';
import fs from 'fs';
import puppeteer from 'puppeteer';
import { readCsf, CsfFile, CsfOptions } from '@storybook/csf-tools';

import { toMatchImageSnapshotExtended } from './jestMatcherExtended';

expect.extend({ toMatchImageSnapshotExtended });

const STORIES_NEEDING_LONGER_TIMEOUTS = ['(data-display-preview--.+)']; // regex you can extend with more components that need longer timeouts
// eslint-why constant is used inside regex for puppeteerImageSnapshotTest
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const STORIES_NEEDING_LONGER_TIMEOUTS_REGEX_STR = STORIES_NEEDING_LONGER_TIMEOUTS.join('|');
const SNAPSHOT_TIMEOUT_BEFORE: number = 2000;
const SNAPSHOT_TIMEOUT_AFTER: number = 1000;
const SNAPSHOTS_TIMEOUT: number = 720000;
const EXCLUDED_COMPONENT_FOLDER: string[] = ['/hidden_components/'];

const getFiles = (path: string, files: string[]) => {
  fs.readdirSync(path).forEach((file: string) => {
    const subpath = `${path}/${file}`;
    if (fs.lstatSync(subpath).isDirectory()) {
      getFiles(subpath, files);
    } else if (file.endsWith('.stories.tsx')) {
      if (!EXCLUDED_COMPONENT_FOLDER.some((excludedFolder: string) => { return path.includes(excludedFolder); })) {
        files.push(`${path}/${file}`);
      } else {
        // eslint-why - it is needed here to get specific information about the process
        // eslint-disable-next-line no-console
        console.info(`The story '${file}' is right now excluded from the visual tests.`);
      }
    }
  });
};

const makeTitle = (userTitle: string) => {
  return userTitle;
};

const getCsf = async (fileName: string) => {
  const csfOptions: CsfOptions = {
    makeTitle,
  };
  const csfFile: CsfFile = await readCsf(fileName, csfOptions);
  const csf = csfFile.parse();
  return csf;
};

const getStorieId = (csf: CsfFile, storieKey: string) => {
  // eslint-why - ...
  // eslint-disable-next-line no-underscore-dangle
  const { id } = csf._stories[storieKey];
  return id;
};

const getStorieKeys = (csf: CsfFile) => {
  // eslint-why - ...
  // eslint-disable-next-line no-underscore-dangle
  const storieKeys = Object.keys(csf._storyExports);
  return storieKeys;
};

const getCustomSnapshotIdentifier = (variant: string, storieId: string) => {
  return `${variant}-${storieId.replace('--', '-')}-1-snap`;
};

const getLaunchOptions = () => {
  const chromeExecutablePath = process.env.CHROME_EXECUTABLE_PATH;
  const options: puppeteer.LaunchOptions & puppeteer.BrowserLaunchArgumentOptions & puppeteer.BrowserConnectOptions = {
    headless: true,
    args: ['--no-sandbox ', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  };
  if (chromeExecutablePath !== undefined) {
    options.executablePath = chromeExecutablePath;
  }
  return options;
};

const getDefaultScreenshotOptions = (): puppeteer.ScreenshotOptions => {
  const defaultScreenshotOptions: puppeteer.ScreenshotOptions = {
    fullPage: true,
    encoding: 'base64',
  };
  return defaultScreenshotOptions;
};

const getMatchImageSnapshotOptions = (variant: string, storieId: string): MatchImageSnapshotOptions => {
  const matchImageSnapshotOptions: MatchImageSnapshotOptions = {
    customSnapshotIdentifier: getCustomSnapshotIdentifier(variant, storieId),
    failureThreshold: 0,
    failureThresholdType: 'percent',
    maxChildProcessBufferSizeInBytes: 1048576000,
  };
  return matchImageSnapshotOptions;
};

const getStories = () => {
  // TODO for latter, we should use here the stories configuration form the storybook main.js
  const path = `${process.cwd()}/src`;
  const files: string[] = [];
  getFiles(path, files);
  return files;
};

export const puppeteerImageSnapshotTest = (direction: string, variant: string) => {
  getStories().forEach((storiesFileName) => {
    it(storiesFileName, async () => {
      const launchOptions = getLaunchOptions();
      const browser = await puppeteer.launch(launchOptions);
      const page = await browser.newPage();
      const csf = await getCsf(storiesFileName);
      const storieKeys = getStorieKeys(csf);
      if (!browser || !page) {
        // eslint-why - it is needed here to get specific information about the process
        // eslint-disable-next-line no-console
        console.error(`Error when running puppeteer test for ${storiesFileName} : It seems the headless browser is not running.`);
        throw new Error('no-headless-browser-running');
      }
      // eslint-why - ...
      // eslint-disable-next-line no-restricted-syntax
      for await (const storieKey of storieKeys) {
        const storieId = getStorieId(csf, storieKey);
        if (storieId !== null) {
          const storybookUrlParams = `&id=${storieId}&viewMode=story`;
          const mainStorybookUrl = process.env.STORYBOOK_URL || 'http://localhost:6006';
          const storybookUrl = `${mainStorybookUrl}/iframe.html?args=&globals=themeDirection:${direction}${storybookUrlParams}`;

          try {
            await page.goto(storybookUrl);
          } catch (e) {
            // eslint-why - it is needed here to get specific information about the process
            // eslint-disable-next-line no-console
            console.error(`Error when connecting to ${storybookUrl}, did you start or build the storybook first?
              A storybook instance should be running or a static version should be built when using puppeteer test feature.`);
            throw e;
          }
          await new Promise((resolve) => {
            // eslint-why - need for current impl
            // eslint-disable-next-line no-promise-executor-return
            return setTimeout(resolve, [storieId.matchAll(/${STORIES_NEEDING_LONGER_TIMEOUTS_REGEX_STR}/g)].length > 0
              ? SNAPSHOT_TIMEOUT_BEFORE * 4
              : SNAPSHOT_TIMEOUT_BEFORE);
          });
          const image = await page.screenshot(getDefaultScreenshotOptions());
          await new Promise((resolve) => {
            // eslint-why - need for current impl
            // eslint-disable-next-line no-promise-executor-return
            return setTimeout(resolve, [storieId.matchAll(/${STORIES_NEEDING_LONGER_TIMEOUTS_REGEX_STR}/g)].length > 0
              ? SNAPSHOT_TIMEOUT_AFTER * 2
              : SNAPSHOT_TIMEOUT_AFTER);
          });
          expect(image).toMatchImageSnapshotExtended(getMatchImageSnapshotOptions(variant, storieId));
        }
      }
      await page.close();
      await browser.close();
    }, SNAPSHOTS_TIMEOUT);
  });

  process.on('SIGINT', async () => {
    process.exit();
  });
};
