export interface Option {
    leftIcon?: string;
    leftIconTooltip?: string;
    rightIcon?: string;
    rightIconTooltip?: string;
    iconAlignment?: 'center' | 'baseline';
    value: string | number;
    label?: string;
    disabled?: boolean;
}