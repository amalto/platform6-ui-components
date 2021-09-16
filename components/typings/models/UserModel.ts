/**
 * Created by Bruno Grieder on 09 April 2015.
 */

import { DisplayTemplate } from './DisplayTemplate'
import { DataGridTemplates } from './DataGrid'
import { ConfigurationItems } from './Home'

module UserModel {

  export interface Policy {
    appInstanceName: string
    permissionSetId: string
    appInstanceDescription?: string
    appInstanceEnabled?: boolean
    permissionSetName?: string
    appInstanceType?: string;
    permissionSetDescription?: string
    permissionSetEnabled?: boolean
    permissions?: string[]
  }

  export interface MainJsonContent {
    preferredLanguage?: string;
    // base64 string or absolute url to image file
    avatar?: string;

    // base64 uri of electronical signature
    signature?: string;

    // Delay of messages list auto-refresh (in seconds)
    // Use transactions if core version > 5.20.0, otherwise use messages
    messagesAutoRefresh?: number;
    transactionsAutoRefresh?: number;

    // Store default view
    transactions?: {
      [appInstanceName: string]: string;
    };
    workflowTasks?: {
      [appInstanceName: string]: string;
    };

    // JSON string containing the order of Home modules
    homeSettings?: {
      [appInstanceName: string]: {
        [id: string]: ConfigurationItems | string;
      };
    };
    displayTemplates?: {
      [appInstanceName: string]: {
        [viewName: string]: DisplayTemplate;
      };
    };

    //ACE preferred settings
    codeEditorSettings?: {
      theme: string;
      fontSize: string;
      showInvisibles: boolean;
      showGutter: boolean;
      showIndent: boolean;
      wrap: boolean;
    }
    dataGridTemplates?: DataGridTemplates;
    version?: string
  }

  export interface JsonContent extends MainJsonContent {

    // Usable to add data related to user preferrences.
    [featureId: string]: unknown;
  }

}

interface UserModel {
  contentIndexAttributes?: string[];
  emailVerified?: boolean;
  enabled?: boolean;
  firstName?: string;
  jsonContent?: string;
  lastName?: string;
  oldpassword?: string;
  orgPositionDisplayNameLookup?: {
    [instanceName: string]: string;
  };
  orgPositionIdMap?: {
    [appIntanceName: string]: string[]
  };
  passwordIn?: string;
  passwordReset?: boolean;
  policyDetails?: UserModel.Policy[];
  policyList?: UserModel.Policy[];
  propertiesMap?: {
    [key: string]: string
  };
  ssoConnectionId?: string;
  readOnly?: boolean;
  realm?: string;
  userEmail?: string;
  userSignature?: string;
}

interface UserSearch {
  pageSize?: number;
  pageContext?: string;
  searchColumn?: 'EMAIL' | 'LAST_NAME' | 'PERM_SET_ID';
  searchTerm?: string;
  orderDesc?: boolean;
  orderColumn?: 'EMAIL' | 'LAST_NAME';
}

function getUserJson(user: UserModel | null): UserModel.JsonContent {
  let json = {}

  if (user && user.jsonContent) {
    try {
      json = JSON.parse(user.jsonContent)
    }
    catch (error) {
      console.log('JSON content parsing error: ', error)
    }
  }

  return json
}

export { UserModel, getUserJson, UserSearch }
