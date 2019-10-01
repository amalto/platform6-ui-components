UserModel uses [DisplayTemplate](#displaytemplate) and [OrderDataset](#orderdataset) interfaces.

```typescript
module UserModel {

    export interface Policy {

        /** Instance name. */
        appInstanceName: string

        /** Permission id. */
        permissionSetId: string

        /** Readable instance description. */
        appInstanceDescription?: string

        /** Either instance is accessible from portal or not. */
        appInstanceEnabled?: boolean
        
        /** Permission name. */
        permissionSetName?: string
        
        /** Permission description. */
        permissionSetDescription?: string

        /** Either the permission is enabled or not. */
        permissionSetEnabled?: boolean

        /** Permissions associated to this permission set. */
        permissions?: string[]
    }

    export interface JsonContent {
        
        /** JSON string containing the order of Home modules. */
        homeSettings?: {
            [appInstanceName: string]: {
                [id: string]: OrderDataset[]
            };
        };

        /** Language saved on user profile. By default set to browser language. */
        preferredLanguage?: string;
        
        /** Base64 string or absolute url to image file. */
        avatar?: string;
        
        /** Delay of messages list auto-refresh (in seconds). */
        messagesAutoRefresh?: number;

        /** Default transactions view per instance. */
        transactions?: {
            [appInstanceName: string]: string;
        };

        /**
         * Template of form and view content.
         * e.g: Search form from message instance.
         */
        displayTemplates?: {
            [appInstanceName: string]: {
                [viewName: string]: DisplayTemplate;
            };
        };

        /** Saved configuration of each DataGrid on each instance. */
        dataGridTemplates?: DataGridTemplates;

        /** ACE preferred settings. */
        codeEditorSettings?: {
            theme: string;
            fontSize: string;
            showInvisibles: boolean;
            showGutter: boolean;
            showIndent: boolean;
            wrap: boolean;
        }

        /** Portal version. */
        version?: string
    }
}

interface UserModel {
    
    /** User email. */
    userEmail?: string;

    /** Realm the use is associated to. */
    realm?: string;

    /** Allow user to use the portal or not. */
    enabled?: boolean;
    
    /** New password when trying to change it. */
    passwordIn?: string;

    /** Either user has validated the email validation sent to him. */
    emailVerified?: boolean;

    /** True if user has forgotten his pasword and is trying to reseting it. */
    passwordReset?: boolean;

    /** User first name. */
    firstName?: string;

    /** user last name. */
    lastName?: string;

    /** TODO: Add descripiton. */
    contentIndexAttributes?: string[];

    /** Stringified user json content containing his preferred settings. */
    jsonContent?: string;

    /** Displayable array of user access and permissions. */
    policyDetails?: UserModel.Policy[];

    /** Editable array of user access and permissions. */
    policyList?: UserModel.Policy[];

    /** User profil information. */
    propertiesMap?: { [key: string]: string };

    /** Position of user in each organisation he is associated with. */
    orgPositionIdMap?: { [appIntanceName: string]: string[] };

    /** SSO connection ID used to provision the user */
    ssoConnectionId?:string;
}
```