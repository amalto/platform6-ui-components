export interface Id {
    appKey: string;
    name: string;
    originalName?: string;
}

export interface Description {
    [lang: string]: string;
}

export interface ServiceItemFacade extends Id {
    appInfo?: string;
    appName?: string;
    calculatedContentMode?: string;
    description?: string;
    lastModifiedBy?: string;
    lastModifiedDate?: number;
    revisionId?: string;
}

export interface ServiceItem extends Id {
    description?: Description;
    lastModifiedBy?: string;
    lastModifiedDate?: number;
    contentMode?: string;
    revisionId?: string;
}

export declare type ServiceItems = ServiceItem[];

export declare type ServiceItemFacades = ServiceItemFacade[];

export declare type Ids = Id[];