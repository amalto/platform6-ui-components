export interface AppKey {
    appKey: string;
    appLogo: string;
    appDescriptionMap: {
        [lang: string]: string;
    },
    publisherName: string;
    publisherAddress: string;
    properties: {
        [key: string]: string;
    },
    active: boolean;
}