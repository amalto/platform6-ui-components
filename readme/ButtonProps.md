```typescript
export interface ButtonProps {
    
    /** OnClick method. */
    clickAction?: () => void;
    
    /** CSS class. */
    cssClass?: string;
    
    /** Font Awesome icon class. */
    iconClass?: string;
    
    /** Button's label. */
    text?: string;
    
    /** Disabled or not. */
    disabled?: boolean;
    
    /** Button tooltip. */
    tooltipText?: string;
    
    /** Button's children. */
    btnContent?: JSX.Element;
    
    /** Replace button by any component you want. */
    content?: JSX.Element;
    
    /** Button attribute type. */
    type?: string;
}
```