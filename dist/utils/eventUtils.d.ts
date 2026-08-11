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
export declare const findTargetElement: (target: EventTarget | HTMLElement | null | undefined, className: string, lookForParent: boolean, useInclude?: boolean) => HTMLElement | undefined;
/**
   * Finds the next available/focusable row which doesn't have tabindex="-1".
   * @param currentRow - The current row element.
   * @returns The next focusable row element or null if none found.
   */
export declare const findNextFocusableRow: (currentRow: HTMLDivElement | HTMLElement) => HTMLDivElement | null;
/**
   * Finds the previous available/focusable row which doesn't have tabindex="-1".
   * @param currentRow - The current row element.
   * @returns The previous focusable row element or null if none found.
   */
export declare const findPreviousFocusableRow: (currentRow: HTMLDivElement) => HTMLDivElement | null;
