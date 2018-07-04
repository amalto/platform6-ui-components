```typescript
export interface FeatureEndpoint {

    // Feature's id.
    id: string;

    // Path to the feature's endpoints.
    path: string;

    // Version of the feature.
    version: string;
    altContextUrl?: string;

    // Options concerning the ui, principally the sidebar.
    ui?: {
        visible?: boolean;

        // Font Awesome icons name.
        iconName?: string;
        iconInlineImage?: string;

        // Name displayed
        label?: {
            [lang: string]: string;
        }

        // Define the position in the sidebar.
        weight?: number;
    };
}

// Keep track of the feature you have access to by instance.
export interface Endpoints {
    [appInstanceName: string]: {
        [featureId: string]: FeatureEndpoint
    }
}

export interface AppEndpointsModel {
    appInstanceName: string;
    endpoints: FeatureEndpoint[];
}
```