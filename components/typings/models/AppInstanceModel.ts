/**
 * Created by Bruno Grieder on 09 April 2015.
 */


module AppInstanceModel {
    export interface Properties {
        baseContext?: string;
        infoPath?: string;
        communityPortalUrl?: string;
    }
}


interface AppInstanceModel {
    displayName?: string;
    name: string
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

export { AppInstanceModel, AppInstanceSearch }
