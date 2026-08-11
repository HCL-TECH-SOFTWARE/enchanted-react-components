import React from 'react';
import { Literals, ProgressBarLocalization } from './ProgressBar';
interface progressHeaderProps {
    totalPercentage: number;
    uploadStatus: string;
    closeModal(event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>): void;
    stringLiterals: Literals;
    cancelAll?: Function;
    pauseButton?: Function;
    translation?: ProgressBarLocalization | undefined;
    expanded: boolean;
    toggleButtonClick(): void;
    isCancelAllDisabled: boolean;
}
/**
 * Represents the ProgressHeader component.
 * @param props - The props for the ProgressHeader component.
 * @returns The rendered ProgressHeader component.
 */
declare const ProgressHeader: (props: progressHeaderProps) => React.JSX.Element;
export default ProgressHeader;
