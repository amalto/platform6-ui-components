import { DisplayTemplate } from './DisplayTemplate';
import { DataGridTemplates } from './DataGrid';
import { OrderDataset } from './Home';
declare module UserModel {
    interface Policy {
        appInstanceName: string;
        permissionSetId: string;
        appInstanceDescription?: string;
        appInstanceEnabled?: boolean;
        permissionSetName?: string;
        permissionSetDescription?: string;
        permissionSetEnabled?: boolean;
        permissions?: string[];
    }
    interface JsonContent {
        homeSettings?: {
            [appInstanceName: string]: {
                [id: string]: OrderDataset[];
            };
        };
        preferredLanguage?: string;
        avatar?: string;
        messagesAutoRefresh?: number;
        displayTemplates?: {
            [appInstanceName: string]: {
                [viewName: string]: DisplayTemplate;
            };
        };
        dataGridTemplates?: DataGridTemplates;
        codeEditorSettings?: {
            theme: string;
            fontSize: string;
            showInvisibles: boolean;
            showGutter: boolean;
            showIndent: boolean;
            wrap: boolean;
        };
        version?: string;
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
    propertiesMap?: {
        [key: string]: string;
    };
    orgPositionIdMap?: {
        [appIntanceName: string]: string[];
    };
}
interface UserSearch {
    pageSize?: number;
    pageContext?: string;
    searchColumn?: 'EMAIL' | 'LAST_NAME' | 'PERM_SET_ID';
    searchTerm?: string;
    orderDesc?: boolean;
    orderColumn?: 'EMAIL' | 'LAST_NAME';
}
declare function getUserJson(user: UserModel): UserModel.JsonContent;
export { UserModel, getUserJson, UserSearch };
