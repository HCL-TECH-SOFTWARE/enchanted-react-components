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

import { toMatchImageSnapshot, MatchImageSnapshotOptions } from 'jest-image-snapshot';

declare global {
  namespace jest {
      interface Matchers<R> {
        toMatchImageSnapshotExtended(config: MatchImageSnapshotOptions): R;
      }
  }
}

const dontFailingByDetectedDiffs = process.env.DONT_EXIT_ON_DIFF ? 'true'.includes(process.env.DONT_EXIT_ON_DIFF) : false;
// eslint-why - it is needed here to get specific information about the process
// eslint-disable-next-line no-console
console.info("The 'DONT_EXIT_ON_DIFF' env parameter is 'true'. The test will be passing, independent are some differences will be detected");

/*
 * This logic extends or wrapped the default `toMatchImageSnapshot` jest matcher.
 * - If some UI difference is detected and the environment parameter 'DONT_EXIT_ON_DIFF' is TRUE the specific jest test will be pass.
 * - If some UI difference is detected and the environment parameter 'DONT_EXIT_ON_DIFF' is FALSE the specific jest test will be fail.
 */
export function toMatchImageSnapshotExtended(image: string, config: MatchImageSnapshotOptions): jest.CustomMatcherResult {
  // @ts-ignore
  const result = toMatchImageSnapshot.call(this, image, config);
  if (dontFailingByDetectedDiffs) {
    // @ts-ignore
    if (this.snapshotState.unmatched > 0) {
      // @ts-ignore
      this.snapshotState.matched += this.snapshotState.unmatched;
      // @ts-ignore
      this.snapshotState.unmatched = 0;
    }
    result.pass = true;
  }

  return result;
}
