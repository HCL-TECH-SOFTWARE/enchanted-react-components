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
import * as React from 'react';

export interface IntroductionPageProps {
}

const IntroductionPage: React.FC<IntroductionPageProps> = (props: IntroductionPageProps) => {
  return (
    <div>
      <div className="intro-container">
        <h3>Introduction</h3>
        <p>
          This Storybook implementation holds icons, styles and components.
          This is the representation of the code implementation of the enchanted react components library.
          Please visit the&nbsp;
          <a href="https://github.com/HCL-TECH-SOFTWARE/enchanted-react-components">Github Repository</a>
          &nbsp;for more information.
        </p>
      </div>
    </div>
  );
};

IntroductionPage.defaultProps = { };

export default IntroductionPage;
