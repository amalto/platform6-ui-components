```typescript

export interface Option {

    /** Left icon's class. */
    leftIcon?: string;

    /** Left icon's tooltip. */
    leftIconTooltip?: string;

    /** Rigth icon's class. */
    rightIcon?: string;

    /** Rigth icon's tooltip. */
    rightIconTooltip?: string;

    /** Option slignement. */
    iconAlignment?: 'center' | 'baseline';

    /** Value. */
    value: string | number;

    /** Displayed label. */
    label?: string;

    /** Weither the component is disabled or not. */
    disabled?: boolean;
}
```