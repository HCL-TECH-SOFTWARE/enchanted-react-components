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

import type { ComponentProps, ReactNode } from 'react';
import { Select as BaseSelect } from '@base-ui/react/select';
import { cn } from '../../utils/cn';

/**
 * Props of the {@link SelectItem}. Extends the Base UI `Select.Item` props, so `value`, `label` and
 * `disabled` work as documented there. The label is `children`.
 */
export interface SelectItemProps extends Omit<ComponentProps<typeof BaseSelect.Item>, 'className' | 'children'> {
  /** Extra class name for the item. */
  className?: string;
  /** Text of the option, shown in the list and, once chosen, in the trigger. */
  children: ReactNode;
}

/**
 * One option in a {@link Select} list. Pass items through the Select `menu` prop when the options
 * need more than a value and a label; for plain options use the Select `options` prop instead.
 *
 * @example
 * ```tsx
 * <Select label="Fruit" menu={<SelectItem value="apple">Apple</SelectItem>} />
 * ```
 */
export const SelectItem = ({ className, children, ...props }: SelectItemProps) => (
  <BaseSelect.Item {...props} className={cn('selectItem', className)}>
    <BaseSelect.ItemText className="selectItemText">{children}</BaseSelect.ItemText>
  </BaseSelect.Item>
);
