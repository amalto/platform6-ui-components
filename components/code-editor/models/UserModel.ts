/**
 * Created by Bruno Grieder on 09 April 2015.
 */

import { DisplayTemplate } from './DisplayTemplate'
import { DataGridTemplates } from './DataGrid'
import { OrderDataset } from './Home'

module UserModel {

    export interface Policy {
        appInstanceName: string
        permissionSetId: string
        appInstanceDescription?: string
        appInstanceEnabled?: boolean
        permissionSetName?: string
        permissionSetDescription?: string
        permissionSetEnabled?: boolean
        permissions?: string[]
    }

    export interface JsonContent {
        // JSON string containing the order of Home modules
        homeSettings?: {
            [appInstanceName: string]: {
                [id: string]: OrderDataset[]
            };
        };
        preferredLanguage?: string;
        //base64 string or absolute url to image file
        avatar?: string;
        //delay of messages list auto-refresh (in seconds)
        messagesAutoRefresh?: number;
        displayTemplates?: {
            [appInstanceName: string]: {
                [viewName: string]: DisplayTemplate;
            };
        };

        dataGridTemplates?: DataGridTemplates;

        //ACE preferred settings
        codeEditorSettings?: {
            theme: string;
            fontSize: string;
            showInvisibles: boolean;
            showGutter: boolean;
            showIndent: boolean;
            wrap: boolean;
        }

        version?: string
    }

}

interface UserModel {
    userEmail?: string;
    realm?: string;
    enabled?: boolean;
    passwordIn?: string;
    emailVerified?: boolean;
    passwordReset?: boolean;
    firstName?: string;
    lastName?: string;
    contentIndexAttributes?: string[];
    jsonContent?: string;
    policyDetails?: UserModel.Policy[];
    policyList?: UserModel.Policy[];
    propertiesMap?: { [key: string]: string };
    orgPositionIdMap?: { [appIntanceName: string]: string[] };
}

interface UserSearch {
    pageSize?: number;
    pageContext?: string;
    searchColumn?: 'EMAIL' | 'LAST_NAME' | 'PERM_SET_ID';
    searchTerm?: string;
    orderDesc?: boolean;
    orderColumn?: 'EMAIL' | 'LAST_NAME';
}

function getUserJson( user: UserModel ): UserModel.JsonContent {
    let json = {}

    if ( user && user.jsonContent ) {
        try {
            json = JSON.parse( user.jsonContent )
        }
        catch ( error ) {
            console.log( 'JSON content parsing error: ', error )
        }
    }

    return json
}

export { UserModel, getUserJson, UserSearch }