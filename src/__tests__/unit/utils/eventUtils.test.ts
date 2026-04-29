/* ======================================================================== *
 * Copyright 2026 HCL America Inc.                                          *
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

import { findTargetElement, findNextFocusableRow, findPreviousFocusableRow } from '../../../utils/eventUtils';

describe('eventUtils', () => {
  describe('findTargetElement', () => {
    it('Should return undefined when target is null', () => {
      const result = findTargetElement(null, 'test-class', false);
      expect(result).toBeUndefined();
    });

    it('Should return undefined when target is undefined', () => {
      const result = findTargetElement(undefined, 'test-class', false);
      expect(result).toBeUndefined();
    });

    it('Should return undefined when target has no classList', () => {
      const result = findTargetElement({} as EventTarget, 'test-class', false);
      expect(result).toBeUndefined();
    });

    it('Should return element when className matches exactly', () => {
      const div = document.createElement('div');
      div.className = 'test-class';

      const result = findTargetElement(div, 'test-class', false);
      expect(result).toBe(div);
    });

    it('Should return element when useInclude is true and className is included in string', () => {
      const div = document.createElement('div');
      div.className = 'test-class other-class';

      const result = findTargetElement(div, 'test-class', false, true);
      expect(result).toBe(div);
    });

    it('Should return undefined when useInclude is true but className is not in string', () => {
      const div = document.createElement('div');
      div.className = 'other-class';

      const result = findTargetElement(div, 'test-class', false, true);
      expect(result).toBeUndefined();
    });

    it('Should search parent when lookForParent is true', () => {
      const parent = document.createElement('div');
      parent.className = 'parent-class';

      const child = document.createElement('div');
      child.className = 'child-class';
      parent.appendChild(child);

      const result = findTargetElement(child, 'parent-class', true);
      expect(result).toBe(parent);
    });

    it('Should search child when lookForParent is false', () => {
      const parent = document.createElement('div');
      parent.className = 'parent-class';

      const child = document.createElement('div');
      child.className = 'child-class';
      parent.appendChild(child);

      const result = findTargetElement(parent, 'child-class', false);
      expect(result).toBe(child);
    });
  });

  describe('findNextFocusableRow', () => {
    it('Should return next row when it is not disabled', () => {
      const container = document.createElement('div');

      const currentRow = document.createElement('div');
      currentRow.className = 'current-row';

      const nextRow = document.createElement('div');
      nextRow.className = 'next-row';
      container.appendChild(currentRow);
      container.appendChild(nextRow);

      const result = findNextFocusableRow(currentRow);
      expect(result).toBe(nextRow);
    });

    it('Should skip disabled rows and return next focusable row', () => {
      const container = document.createElement('div');

      const currentRow = document.createElement('div');
      currentRow.className = 'current-row';

      const disabledRow1 = document.createElement('div');
      disabledRow1.className = 'disabled-row';

      const disabledRow2 = document.createElement('div');
      disabledRow2.className = 'disabled-row';

      const focusableRow = document.createElement('div');
      focusableRow.className = 'focusable-row';
      container.appendChild(currentRow);
      container.appendChild(disabledRow1);
      container.appendChild(disabledRow2);
      container.appendChild(focusableRow);

      const result = findNextFocusableRow(currentRow);
      expect(result).toBe(focusableRow);
    });

    it('Should return null when all next rows are disabled', () => {
      const container = document.createElement('div');

      const currentRow = document.createElement('div');
      currentRow.className = 'current-row';

      const disabledRow1 = document.createElement('div');
      disabledRow1.className = 'disabled-row';

      const disabledRow2 = document.createElement('div');
      disabledRow2.className = 'disabled-row';
      container.appendChild(currentRow);
      container.appendChild(disabledRow1);
      container.appendChild(disabledRow2);

      const result = findNextFocusableRow(currentRow);
      expect(result).toBeNull();
    });

    it('Should return null when there are no next rows', () => {
      const container = document.createElement('div');
      const currentRow = document.createElement('div');

      currentRow.className = 'current-row';
      container.appendChild(currentRow);

      const result = findNextFocusableRow(currentRow);
      expect(result).toBeNull();
    });
  });

  describe('findPreviousFocusableRow', () => {
    it('Should return previous row when it is not disabled', () => {
      const container = document.createElement('div');

      const previousRow = document.createElement('div');
      previousRow.className = 'previous-row';

      const currentRow = document.createElement('div');
      currentRow.className = 'current-row';
      container.appendChild(previousRow);
      container.appendChild(currentRow);

      const result = findPreviousFocusableRow(currentRow);
      expect(result).toBe(previousRow);
    });

    it('Should skip disabled rows and return previous focusable row', () => {
      const container = document.createElement('div');

      const focusableRow = document.createElement('div');
      focusableRow.className = 'focusable-row';

      const disabledRow1 = document.createElement('div');
      disabledRow1.className = 'disabled-row';

      const disabledRow2 = document.createElement('div');
      disabledRow2.className = 'disabled-row';

      const currentRow = document.createElement('div');
      currentRow.className = 'current-row';
      container.appendChild(focusableRow);
      container.appendChild(disabledRow1);
      container.appendChild(disabledRow2);
      container.appendChild(currentRow);

      const result = findPreviousFocusableRow(currentRow);
      expect(result).toBe(focusableRow);
    });

    it('Should return null when all previous rows are disabled', () => {
      const container = document.createElement('div');

      const disabledRow1 = document.createElement('div');
      disabledRow1.className = 'disabled-row';

      const disabledRow2 = document.createElement('div');
      disabledRow2.className = 'disabled-row';

      const currentRow = document.createElement('div');
      currentRow.className = 'current-row';
      container.appendChild(disabledRow1);
      container.appendChild(disabledRow2);
      container.appendChild(currentRow);

      const result = findPreviousFocusableRow(currentRow);
      expect(result).toBeNull();
    });

    it('Should return null when there are no previous rows', () => {
      const container = document.createElement('div');
      const currentRow = document.createElement('div');

      currentRow.className = 'current-row';
      container.appendChild(currentRow);

      const result = findPreviousFocusableRow(currentRow);
      expect(result).toBeNull();
    });
  });
});
