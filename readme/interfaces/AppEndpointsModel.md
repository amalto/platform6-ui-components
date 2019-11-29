```typescript
export interface FeatureEndpoint {
    
    /** Unique id. */
    id: string;

    /** Api path. */
    path: string;

    /** Feature version. */
    version: string;

    /** TODO: Add description. */
    altContextUrl?: string;

    /** Navigation bar visibility parameters. */
    ui?: {        
        visible?: boolean;
        
        /** Font Awesome icon associated to navigation button. */
        iconName?: string;

        /** Use instead of Font Awesome icons classes. */
        iconInlineImage?: string;

        /** Label object with each language. */
        label?: {
            [lang: string]: string;
        }

        /** Order on navigation sidebar. */
        weight?: number;

        /** Version of the feature. */
        version?: string;
    };
}

/** Feature associated to instance. */
export interface Endpoints {
    [appInstanceName: string]: {
        [featureId: string]: FeatureEndpoint
    }
}

export interface AppEndpointsModel {

    /** Instance name. */
    appInstanceName: string;

    /** Feature associated to instance. */
    endpoints: FeatureEndpoint[];

}
```