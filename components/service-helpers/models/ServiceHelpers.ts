export interface Id {
    name: string
    appKey: string
}

export interface Description {
    [lang: string]: string
}

export interface ServiceItemFacade extends Id {
    description?: string
    calculatedContentMode?: string
    appInfo?: string
    lastModifiedBy?: string
    lastModifiedDate?: number
    revisionId?: string
}

export interface ServiceItem extends Id {
    description?: Description
    lastModifiedBy?: string
    lastModifiedDate?: number
    contentMode?: string
    revisionId?: string
}

export declare type ServiceItems = ServiceItem[]

export declare type ServiceItemFacades = ServiceItemFacade[]

export declare type Ids = Id[]

export type ServiceStatus = 'SERVICE_STATE_STARTED' | 'SERVICE_STATE_STARTED_RESTART' | 'SERVICE_STATE_STOPPED' | 'LOADING' | 'UNKNOWN'