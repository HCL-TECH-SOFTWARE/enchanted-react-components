import React from 'react';
import { AutocompleteProps, AutocompleteBannerProps } from '../../Autocomplete/Autocomplete';
/**
 * Props that will be used for MultipleSelectChip its extension of SelectProps
 *
 * @interface MultipleSelectChipProps
 */
export interface MultipleSelectChipProps<T, Multiple, DisableClearable, FreeSolo> extends AutocompleteProps<T, boolean, boolean, boolean> {
    emptyOptions?: boolean;
    /**
     * When provided, renders an informational banner at the top of the dropdown listbox.
     * The banner is non-interactive and excluded from keyboard navigation.
     */
    listboxBanner?: AutocompleteBannerProps;
}
declare const MultipleSelectChip: {
    <T, Multiple extends boolean | undefined = undefined, DisableClearable extends boolean | undefined = undefined, FreeSolo extends boolean | undefined = undefined>({ ...props }: MultipleSelectChipProps<T, Multiple, DisableClearable, FreeSolo>): React.JSX.Element;
    defaultProps: {
        emptyOptions: boolean;
    };
};
export default MultipleSelectChip;
