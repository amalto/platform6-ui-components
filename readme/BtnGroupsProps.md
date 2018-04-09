BtnGroupsProps is only used on [ButtonsBar](#buttonsbar). It uses the [ButtonProps](#buttonProps) interface.

```typescript
export interface BtnGroupsProps {

    /**
     * Button object array to be displayed.
     */
    btns: ButtonProps[];
    
    /** CSS properties of the component. */
    style?: React.CSSProperties;
    
    /** CSS class of the component. */
    cssClass?: string;
}
```