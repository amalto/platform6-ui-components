```typescript
interface Endpoints {

    /** Get Application Publisher Profile keys. */
    APP_KEYS: () => string,

    ////////////////////////////////////////////////
    //
    // scopes
    //
    ////////////////////////////////////////////////

    /** Get scope tree and permissions for super admin. */
    REQUEST_BASE_SCOPES_TREE: () => string,
    
    /** Get cope tree and permissions for current instance. */
    REQUEST_APP_SCOPES_TREE: () => string,

    ////////////////////////////////////////////////
    //
    // b2auth
    //
    ////////////////////////////////////////////////

    /** Get authentification code. */
    REQUEST_AUTH_CODE: () => string,

    /** Get user access token. */
    REQUEST_ACCESS_TOKEN: () => string,

    /** Get user info token. */
    REQUEST_TOKEN_INFO: () => string,

    /** Get access history by each token. */
    REQUEST_OAUTH_STATS: () => string,

    /** Deny access to token. */
    REQUEST_REVOKE_TOKEN: () => string,

    /** Get instance by name. */
    REQUEST_APP_INSTANCE: () => string,

    /** Get paged list of instances. */
    REQUEST_APP_INSTANCE_PAGED: () => string,

    /** Get instance client by realm. */
    REQUEST_CLIENT: () => string,

    /** Get premissions set for instance and by page. */
    REQUEST_PERMISSION_SET: () => string,

    /** Get instance realm. */
    REQUEST_REALM: () => string,

    /** Get user informations. */
    REQUEST_USER: () => string,

    /**  */
    REQUEST_USER_PAGED: () => string,
    REQUEST_USER_PAGED_ADMIN: () => string,
    REQUEST_USER_INFO: () => string,

    REQUEST_USER_CHANGE_PASSWORD: () => string,
    REQUEST_USER_RESET_PASSWORD: () => string,

    REQUEST_USER_EXISTS: () => string,

    REQUEST_USER_ASSOCIATE: () => string,

    REQUEST_USER_ASSOCIATE_RESEND: () => string,
    REQUEST_USER_DISASSOCIATE: () => string,

    //org

    REQUEST_ORG_EXPORT: () => string,

    REQUEST_ORG_USERS: () => string,

    REQUEST_ORG_PATHS: () => string,

    REQUEST_ORG_ADD_NODE: () => string,

    REQUEST_ORG_UPDATE_NODE: () => string,

    REQUEST_ORG_IMPORT: () => string,

    REQUEST_ORG_DELETE_NODE: () => string,

    REQUEST_ORG_NODES: () => string,

    REQUEST_ORG_PROPERTIES: () => string,

    ////////////////////////////////////////////////
    //
    // Bootstrap 
    //
    ////////////////////////////////////////////////

    //(check for alert messages to display)
    REQUEST_INFRA_STATUS: () => string,
    REQUEST_PORTAL_CONFIG: () => string,
    ////////////////////////////////////////////////
    //
    // Registration
    //
    ////////////////////////////////////////////////

    REQUEST_CTY_MEMBER: () => string,

    REQUEST_CTY_STATUS: () => string,

    ////////////////////////////////////////////////
    //
    // Messages (and documents)
    //
    ////////////////////////////////////////////////


    REQUEST_MESSAGES_IS_ADMIN: () => string,

    REQUEST_MESSAGES_VIEWS: () => string,

    REQUEST_MESSAGES_DESCRIBE_VIEW: () => string,

    REQUEST_MESSAGES_GET_MESSAGE: () => string,

    REQUEST_MESSAGES_DELETE_MESSAGE: () => string,

    REQUEST_MESSAGES_UPSERT_MESSAGE: () => string,

    REQUEST_MESSAGES_REPROCESS_MESSAGE: () => string,

    REQUEST_MESSAGES_SEARCH: () => string,

    REQUEST_MESSAGES_EXPORT: () => string,

    REQUEST_MESSAGES_GET_SMART_DOCUMENT: () => string,

    REQUEST_MESSAGES_UPSERT_SMART_DOCUMENT: () => string,

    REQUEST_MESSAGES_UPSERT_SMART_DOCUMENT_FORM: () => string,

    REQUEST_MESSAGES_GET_DOCUMENT_DETAILS: () => string,

    REQUEST_MESSAGES_GET_DOCUMENT_CONTENT: () => string,

    REQUEST_MESSAGES_PUT_DOCUMENT_CONTENT: () => string,

    REQUEST_MESSAGES_FLAGS: () => string,

    REQUEST_MESSAGES_GET_PORTAL_FORM: () => string,

    ////////////////////////////////////////////////
    //
    // Message Submit
    //
    ////////////////////////////////////////////////


    REQUEST_MESSAGE_SUBMIT_NEW_SESSION: () => string,

    REQUEST_MESSAGE_SUBMIT_ADD_ENTITY: () => string,

    REQUEST_MESSAGE_SUBMIT_COMPLETE_SESSION: () => string,

    REQUEST_MESSAGE_SUBMIT_LIST_ENTITIES: () => string,

    REQUEST_MESSAGE_SUBMIT_DELETE_ENTITY: () => string,


    ////////////////////////////////////////////////
    //
    // Files Submit
    //
    ////////////////////////////////////////////////


    REQUEST_FILES_SUBMIT_NEW_SESSION: () => string,

    REQUEST_FILES_SUBMIT_ADD_ENTITY: () => string,

    REQUEST_FILES_SUBMIT_DELETE_ENTITY: () => string,


    ////////////////////////////////////////////////
    //
    // Charts
    //
    ////////////////////////////////////////////////


    REQUEST_CHARTS_LIST: () => string,

    REQUEST_CHARTS_DATASOURCE: () => string,

    REQUEST_CHARTS_SCRIPT: () => string,


    ////////////////////////////////////////////////
    //
    // Reports datasource (used in HOME endpoints)
    //
    ////////////////////////////////////////////////

    REQUEST_HOME_REPORTS_DATASOURCE: () => string,

    ////////////////////////////////////////////////
    //
    // Frames
    //
    ////////////////////////////////////////////////



    REQUEST_FRAMES_UPSERT: () => string,

    REQUEST_FRAMES_DELETE: () => string,

    ////////////////////////////////////////////////
    //
    // HOME
    //
    ////////////////////////////////////////////////

    REQUEST_HOME_MODULES: () => string,

    REQUEST_HOME_GET_CONFIGURATION_BY_NAME: () => string,

    REQUEST_HOME_GET_CONFIGURATIONS: () => string,

    REQUEST_HOME_UPSERT_CONFIGURATION: () => string,

    REQUEST_HOME_DELETE_CONFIGURATION: () => string,

    ////////////////////////////////////////////////
    //
    // Workflow
    //
    ////////////////////////////////////////////////

    REQUEST_WORKFLOW_ACTION: () => string,


    ////////////////////////////////////////////////
    //
    // Cross Ref
    //
    ////////////////////////////////////////////////


    REQUEST_CROSSREF_TABLES_LIST: () => string,

    REQUEST_CROSSREF_IMPORT: () => string,

    REQUEST_CROSSREF_DATA: () => string,

    REQUEST_CROSSREF_TABLE_UPSERT: () => string,

    REQUEST_CROSSREF_TABLE_DUPLICATE: () => string,

    REQUEST_CROSSREF_TABLE_RECORDS: () => string,

    REQUEST_CROSSREF_TABLE_DETAILS: () => string,

    REQUEST_CROSSREF_TABLE_DELETE: () => string,

    REQUEST_CROSSREF_EXPORT: () => string,


    ////////////////////////////////////////////////
    //
    // Long Running Jobs (jobcontrol)
    //
    ////////////////////////////////////////////////


    REQUEST_JOBCONTROL_JOBS_LIST: () => string,

    REQUEST_JOBCONTROL_JOB_STATUS: ( jobId: string | number ) => string,

    REQUEST_JOBCONTROL_JOB_ENTITY_DOWNLOAD: ( id: string ) => string,

    REQUEST_JOBCONTROL_JOB_CANCEL: ( jobId: string | number ) => string,


    ////////////////////////////////////////////////
    //
    // Groovy Script Execution
    //
    ////////////////////////////////////////////////


    REQUEST_SCRIPT_EXECUTE: () => string,


    ////////////////////////////////////////////////
    //
    // Services
    //
    ////////////////////////////////////////////////


    REQUEST_SERVICES_GET_UI: ( serviceId: string, baseUrlOverride?: string ) => string,

    /*
    * API endpoint by instance
    */
    getUrlOfFeature: ( featureId: string, actionEndpoint: string, baseUrlOverride?: string ) => string,

    getScopesTreeUrl: ( scopesPath: string ) => string,

    getAppKeysUrl: () => string
}

export { Endpoints }
```