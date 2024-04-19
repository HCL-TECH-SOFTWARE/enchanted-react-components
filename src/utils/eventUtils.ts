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

/**
 * Retrieve Target Element either parent to child or child to parent using the provided classname
 * Will only get the first instance of that element
 * Note this will only search only from parent or firstchild not with sibling
 * @param {EventTarget | HTMLElement | null | undefined} target object where start the search
 * @param {string} className get element with this classname
 * @param {boolean} lookForParent this parameter will tell if want to search from parent to child or vice versa
 * @param {boolean} useInclude use wildcard to get the element, its means classname is not a exact search
 * @return {HTMLElement | undefined } returns the element with the provided className or undefined when there is no element with that classname
 */
export const findTargetElement = (target: EventTarget | HTMLElement | null | undefined, className: string, lookForParent: boolean, useInclude: boolean = false): HTMLElement | undefined => {
  const divElement = target as HTMLDivElement;
  if (target === undefined || target === null || !divElement.classList) {
    return undefined;
  }
  if (useInclude) {
    if (typeof divElement.className === 'string' && divElement.className.includes(className)) {
      return divElement;
    }
  }
  if (divElement.classList.contains(className)) {
    return divElement;
  }
  if (lookForParent) {
    return findTargetElement(divElement.parentElement, className, lookForParent, useInclude);
  }
  return findTargetElement(divElement.firstChild, className, lookForParent, useInclude);
};
