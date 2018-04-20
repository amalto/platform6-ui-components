export interface Id {
    name: string
    appKey: string
}

export interface Description {
    [lang: string]: string
}

export interface Wordings {
    [key: string]: {
        [lang: string]: string | JSX.Element
    }
}

export interface CompiledWordings {
    [key: string]: string | JSX.Element
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
    lastModifiedDate?: string
    contentMode?: string
    revisionId?: string
}

export declare type ServiceItems = ServiceItem[]

export declare type ServiceItemFacades = ServiceItemFacade[]

export declare type Ids = Id[]