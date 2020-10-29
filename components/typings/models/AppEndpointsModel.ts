export interface FeatureEndpoint {
    id: string;
    path: string;
    version: string;
    altContextUrl?: string;
    ui?: {
        visible?: boolean;
        iconName?: string;
        iconInlineImage?: string;
        defaultRoute?: boolean;
        label?: {
            [lang: string]: string;
        }
        weight?: number;
        version?: string;
        url?: string;
    };
}

export interface Endpoints {
    [appInstanceName: string]: {
        [featureId: string]: FeatureEndpoint
    }
}

export interface AppEndpointsModel {

    appInstanceName: string;
    endpoints: FeatureEndpoint[];

}
