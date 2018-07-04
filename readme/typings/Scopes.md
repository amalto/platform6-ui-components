```typescript
export interface ScopeValue {
    [viewFilter: string]: {
        orgFilter: 'UNIT' | 'USER' | 'BRANCH';
        searchable: string;
        comparisonOperator: '=' | '>' | '>=' | '<' | '<=' | '~';
        value: string;
    }[]
}

export interface ScopesTree {
    [appInstance: string]: {
        [feature: string]: {
            [action: string]: string[] | ScopeValue
        }
    }
}

export interface PermissionDef {
    feature: string;
    action: string;
    requiredValue: string;
}
```