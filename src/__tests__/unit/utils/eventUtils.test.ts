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

import { findTargetElement, findNextFocusableRow, findPreviousFocusableRow } from '../../../utils/eventUtils';

describe('eventUtils', () => {
  describe('findTargetElement', () => {
    it('should return undefined when target is null', () => {
      const result = findTargetElement(null, 'test-class', true);
      expect(result).toBeUndefined();
    });

    it('should return undefined when target is undefined', () => {
      const result = findTargetElement(undefined, 'test-class', true);
      expect(result).toBeUndefined();
    });

    it('should return undefined when target has no classList', () => {
      const target = {} as HTMLElement;
      const result = findTargetElement(target, 'test-class', true);
      expect(result).toBeUndefined();
    });

    it('should find element with exact class name', () => {
      const div = document.createElement('div');
      div.className = 'test-class';
      const result = findTargetElement(div, 'test-class', true);
      expect(result).toBe(div);
    });

    it('should find element using useInclude when className is a string and includes the search term', () => {
      const div = document.createElement('div');
      div.className = 'prefix-test-class-suffix';
      const result = findTargetElement(div, 'test-class', true, true);
      expect(result).toBe(div);
    });

    it('should find element using useInclude when className string contains the search term', () => {
      const div = document.createElement('div');
      div.className = 'my-test-class-name';
      const result = findTargetElement(div, 'test-class', false, true);
      expect(result).toBe(div);
    });

    it('should not find element using useInclude when className does not include the search term', () => {
      const parent = document.createElement('div');
      parent.className = 'parent-class';
      const child = document.createElement('div');
      child.className = 'other-class';
      parent.appendChild(child);

      const result = findTargetElement(child, 'test-class', true, true);
      expect(result).toBeUndefined();
    });

    it('should continue searching parent when useInclude is true but current element does not match', () => {
      const grandparent = document.createElement('div');
      grandparent.className = 'contains-target-class';
      const parent = document.createElement('div');
      parent.className = 'parent-class';
      const child = document.createElement('div');
      child.className = 'child-class';
      grandparent.appendChild(parent);
      parent.appendChild(child);

      const result = findTargetElement(child, 'target-class', true, true);
      expect(result).toBe(grandparent);
    });

    it('should find parent element with matching class', () => {
      const parent = document.createElement('div');
      parent.className = 'parent-class';
      const child = document.createElement('div');
      child.className = 'child-class';
      parent.appendChild(child);

      const result = findTargetElement(child, 'parent-class', true);
      expect(result).toBe(parent);
    });

    it('should find child element with matching class', () => {
      const parent = document.createElement('div');
      parent.className = 'parent-class';
      const child = document.createElement('div');
      child.className = 'child-class';
      parent.appendChild(child);

      const result = findTargetElement(parent, 'child-class', false);
      expect(result).toBe(child);
    });

    it('should return undefined when no parent has matching class', () => {
      const div = document.createElement('div');
      div.className = 'test-class';
      const result = findTargetElement(div, 'non-existent-class', true);
      expect(result).toBeUndefined();
    });

    it('should return undefined when no child has matching class', () => {
      const div = document.createElement('div');
      div.className = 'test-class';
      const result = findTargetElement(div, 'non-existent-class', false);
      expect(result).toBeUndefined();
    });
  });

  describe('findNextFocusableRow', () => {
    it('should return the next row without disabled-row class', () => {
      const container = document.createElement('div');
      const row1 = document.createElement('div');
      const row2 = document.createElement('div');
      row2.className = 'disabled-row';
      const row3 = document.createElement('div');

      container.appendChild(row1);
      container.appendChild(row2);
      container.appendChild(row3);

      const result = findNextFocusableRow(row1);
      expect(result).toBe(row3);
    });

    it('should return null when there is no next focusable row', () => {
      const container = document.createElement('div');
      const row1 = document.createElement('div');
      const row2 = document.createElement('div');
      row2.className = 'disabled-row';

      container.appendChild(row1);
      container.appendChild(row2);

      const result = findNextFocusableRow(row1);
      expect(result).toBeNull();
    });

    it('should return null when all remaining rows are disabled', () => {
      const container = document.createElement('div');
      const row1 = document.createElement('div');
      const row2 = document.createElement('div');
      row2.className = 'disabled-row';
      const row3 = document.createElement('div');
      row3.className = 'disabled-row';
      const row4 = document.createElement('div');
      row4.className = 'disabled-row';

      container.appendChild(row1);
      container.appendChild(row2);
      container.appendChild(row3);
      container.appendChild(row4);

      const result = findNextFocusableRow(row1);
      expect(result).toBeNull();
    });

    it('should return null when current row is the last row', () => {
      const container = document.createElement('div');
      const row1 = document.createElement('div');

      container.appendChild(row1);

      const result = findNextFocusableRow(row1);
      expect(result).toBeNull();
    });

    it('should return immediately next row if it is focusable', () => {
      const container = document.createElement('div');
      const row1 = document.createElement('div');
      const row2 = document.createElement('div');

      container.appendChild(row1);
      container.appendChild(row2);

      const result = findNextFocusableRow(row1);
      expect(result).toBe(row2);
    });

    it('should skip multiple disabled rows', () => {
      const container = document.createElement('div');
      const row1 = document.createElement('div');
      const row2 = document.createElement('div');
      row2.className = 'disabled-row';
      const row3 = document.createElement('div');
      row3.className = 'disabled-row';
      const row4 = document.createElement('div');

      container.appendChild(row1);
      container.appendChild(row2);
      container.appendChild(row3);
      container.appendChild(row4);

      const result = findNextFocusableRow(row1);
      expect(result).toBe(row4);
    });
  });

  describe('findPreviousFocusableRow', () => {
    it('should return the previous row without disabled-row class', () => {
      const container = document.createElement('div');
      const row1 = document.createElement('div');
      const row2 = document.createElement('div');
      row2.className = 'disabled-row';
      const row3 = document.createElement('div');

      container.appendChild(row1);
      container.appendChild(row2);
      container.appendChild(row3);

      const result = findPreviousFocusableRow(row3 as HTMLDivElement);
      expect(result).toBe(row1);
    });

    it('should return null when there is no previous focusable row', () => {
      const container = document.createElement('div');
      const row1 = document.createElement('div');
      row1.className = 'disabled-row';
      const row2 = document.createElement('div');

      container.appendChild(row1);
      container.appendChild(row2);

      const result = findPreviousFocusableRow(row2 as HTMLDivElement);
      expect(result).toBeNull();
    });

    it('should return null when all previous rows are disabled', () => {
      const container = document.createElement('div');
      const row1 = document.createElement('div');
      row1.className = 'disabled-row';
      const row2 = document.createElement('div');
      row2.className = 'disabled-row';
      const row3 = document.createElement('div');
      row3.className = 'disabled-row';
      const row4 = document.createElement('div');

      container.appendChild(row1);
      container.appendChild(row2);
      container.appendChild(row3);
      container.appendChild(row4);

      const result = findPreviousFocusableRow(row4 as HTMLDivElement);
      expect(result).toBeNull();
    });

    it('should return null when current row is the first row', () => {
      const container = document.createElement('div');
      const row1 = document.createElement('div');

      container.appendChild(row1);

      const result = findPreviousFocusableRow(row1 as HTMLDivElement);
      expect(result).toBeNull();
    });

    it('should return immediately previous row if it is focusable', () => {
      const container = document.createElement('div');
      const row1 = document.createElement('div');
      const row2 = document.createElement('div');

      container.appendChild(row1);
      container.appendChild(row2);

      const result = findPreviousFocusableRow(row2 as HTMLDivElement);
      expect(result).toBe(row1);
    });

    it('should skip multiple disabled rows', () => {
      const container = document.createElement('div');
      const row1 = document.createElement('div');
      const row2 = document.createElement('div');
      row2.className = 'disabled-row';
      const row3 = document.createElement('div');
      row3.className = 'disabled-row';
      const row4 = document.createElement('div');

      container.appendChild(row1);
      container.appendChild(row2);
      container.appendChild(row3);
      container.appendChild(row4);

      const result = findPreviousFocusableRow(row4 as HTMLDivElement);
      expect(result).toBe(row1);
    });
  });
});
