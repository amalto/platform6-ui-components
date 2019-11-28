```typescript
module AppInstanceModel {
    export interface Properties {
        baseContext?: string;
        infoPath?: string;
        communityPortalUrl?: string;
    }
}

interface AppInstanceModel {
    name?: string
    displayName?: string;
    description?: string
    enabled?: boolean
    orgRootId?: string;
    properties?: AppInstanceModel.Properties
}

interface AppInstanceSearch {
    pageSize?: number;
    pageContext?: string;
    searchColumn?: 'NAME' | 'DESCRIPTION';
    searchTerm?: string;
    orderDesc?: boolean;
}
```