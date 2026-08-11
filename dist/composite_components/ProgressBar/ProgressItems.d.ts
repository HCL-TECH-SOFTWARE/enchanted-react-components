import React from 'react';
import { IProgressState, Literals, ProgressBarLocalization } from './ProgressBar';
interface ProgressItemsProps {
    file: IProgressState[];
    retryUploadItem?(queueItem: IProgressState): void;
    cancelItem?(queueItem: IProgressState): void;
    navigateFolder?(queueItem: IProgressState): void;
    literals: Literals;
    learnMoreOnFailure(event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>): void;
    translation?: ProgressBarLocalization | undefined;
    direction?: 'ltr' | 'rtl';
}
/**
 * @component Renders the progress items component.
 * @param {ProgressItemProps} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
declare const ProgressItems: (props: ProgressItemsProps) => React.JSX.Element;
export default ProgressItems;
