```typescript
export interface PermissionDef {

    /** Feature name. e.g: home. */
    feature: string;

    /** Action name. e.g: read. */
    action: string;

    /** Required value. e.g: single in message=read('single'). */
    requiredValue: string;
}
```