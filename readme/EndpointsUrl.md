```typescript
interface EndpointsUrl {

    /** Get application publisher profile keys. */
    APP_KEYS: () => string,

    ////////////////////////////////////////////////
    //
    // scopes
    //
    ////////////////////////////////////////////////

    /** Get scope tree and permissions for super admin. */
    REQUEST_BASE_SCOPES_TREE: () => string,
    
    /** Get scope tree and permissions for current instance. */
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

    /** Get access history for each token. */
    REQUEST_OAUTH_STATS: () => string,

    /** Deny access to token. */
    REQUEST_REVOKE_TOKEN: () => string,

    /** Get instance by name. */
    REQUEST_APP_INSTANCE: () => string,

    /** Get paged list of instances. */
    REQUEST_APP_INSTANCE_PAGED: () => string,

    /** Get instance client by realm. */
    REQUEST_CLIENT: () => string,

    /** Get permissions sets for instance and by page. */
    REQUEST_PERMISSION_SET: () => string,

    /** Get instance realm. */
    REQUEST_REALM: () => string,

    /** Get user informations. */
    REQUEST_USER: () => string,

    /** Get users by page with filtering options. */
    REQUEST_USER_PAGED: () => string,

    /** Get admin users by page with filtering options. */
    REQUEST_USER_PAGED_ADMIN: () => string,

    /** Get user informations. */
    REQUEST_USER_INFO: () => string,


    /** Change user password. */
    REQUEST_USER_CHANGE_PASSWORD: () => string,

    /** Reset user password. */
    REQUEST_USER_RESET_PASSWORD: () => string,

    /** Check if user exist in database. */
    REQUEST_USER_EXISTS: () => string,

    /** Associate user to an instance. */
    REQUEST_USER_ASSOCIATE: () => string,

    /** Resend mail to associate user to instance. */
    REQUEST_USER_ASSOCIATE_RESEND: () => string,

    /** Disassociate user from instance, meaning that he won't be able to access instance anymore. */
    REQUEST_USER_DISASSOCIATE: () => string,

    //org

    /** Get users associated to organization node. */
    REQUEST_ORG_USERS: () => string,

    /** Get user's organizations is associated to. */
    REQUEST_ORG_PATHS: () => string,

    /** Create an organization node. */
    REQUEST_ORG_ADD_NODE: () => string,

    /** Update organization node. */
    REQUEST_ORG_UPDATE_NODE: () => string,

    /** Delete organization node. */
    REQUEST_ORG_DELETE_NODE: () => string,

    /** Get organization nodes. */
    REQUEST_ORG_NODES: () => string,

    ////////////////////////////////////////////////
    //
    // Bootstrap 
    //
    ////////////////////////////////////////////////

    /** Check for alert messages to display. */
    REQUEST_INFRA_STATUS: () => string,

    /** Get portal configurations. */
    REQUEST_PORTAL_CONFIG: () => string,

    ////////////////////////////////////////////////
    //
    // Registration
    //
    ////////////////////////////////////////////////

    /** Get the membership details associated with a registered user. */
    REQUEST_CTY_MEMBER: () => string,

    /** Using community attribute values, obtain a community status value. */
    REQUEST_CTY_STATUS: () => string,

    ////////////////////////////////////////////////
    //
    // Messages (and documents)
    //
    ////////////////////////////////////////////////

    /** Get messages views type. */
    REQUEST_MESSAGES_VIEWS: () => string,

    /** Get messages filtered by view type. */
    REQUEST_MESSAGES_DESCRIBE_VIEW: () => string,

    /** Get message by id. */
    REQUEST_MESSAGES_GET_MESSAGE: () => string,

    /** Delete message. */
    REQUEST_MESSAGES_DELETE_MESSAGE: () => string,

    /** Upsert a message. */
    REQUEST_MESSAGES_UPSERT_MESSAGE: () => string,

    /** Reprocess message. */
    REQUEST_MESSAGES_REPROCESS_MESSAGE: () => string,

    /** Search messages based on filter options. */
    REQUEST_MESSAGES_SEARCH: () => string,

    /** Export message. */
    REQUEST_MESSAGES_EXPORT: () => string,

    /** Export all messages. */
    REQUEST_MESSAGES_GET_SMART_DOCUMENT: () => string,

    /** Upsert message's smart document. */
    REQUEST_MESSAGES_UPSERT_SMART_DOCUMENT: () => string,

    /** TODO: Add description. */
    REQUEST_MESSAGES_UPSERT_SMART_DOCUMENT_FORM: () => string,

    /** Get messages's source document informations. */
    REQUEST_MESSAGES_GET_DOCUMENT_DETAILS: () => string,

    /** Get messages's source document content. */
    REQUEST_MESSAGES_GET_DOCUMENT_CONTENT: () => string,

    /** Add source document to message. */
    REQUEST_MESSAGES_PUT_DOCUMENT_CONTENT: () => string,

    /** Update messages flags. */
    REQUEST_MESSAGES_FLAGS: () => string,

    /** TODO: Add description. */
    REQUEST_MESSAGES_GET_PORTAL_FORM: () => string,

    ////////////////////////////////////////////////
    //
    // Message Submit
    //
    ////////////////////////////////////////////////


    /**
     * Open a new submission session optionally passing a submission attributes form.
     * A new token will be generated and returned for use in all subsequent submission service calls.
     */
    REQUEST_MESSAGE_SUBMIT_NEW_SESSION: () => string,

    /** The posted content will be added as an entity to the current form submission. */
    REQUEST_MESSAGE_SUBMIT_ADD_ENTITY: () => string,

    /** Closes the current message submission session and returns the result of message creation processing. */
    REQUEST_MESSAGE_SUBMIT_COMPLETE_SESSION: () => string,

    /** List the entities and attributes associated with the current message submission session. */
    REQUEST_MESSAGE_SUBMIT_LIST_ENTITIES: () => string,

    /** The posted content will be removed from the current form submission using the given name as a key. */
    REQUEST_MESSAGE_SUBMIT_DELETE_ENTITY: () => string,


    ////////////////////////////////////////////////
    //
    // Files Submit
    //
    ////////////////////////////////////////////////

    /** These 3 endpoints are mean to be used when uploading any kind of file. */

    /** Use REQUEST_MESSAGE_SUBMIT_NEW_SESSION endpoint to create a submission token. */
    REQUEST_FILES_SUBMIT_NEW_SESSION: () => string,

    /** Use REQUEST_MESSAGE_SUBMIT_ADD_ENTITY endpoint to add an entity. */
    REQUEST_FILES_SUBMIT_ADD_ENTITY: () => string,

    /** Use REQUEST_MESSAGE_SUBMIT_DELETE_ENTITY endpoint to delete an entity. */
    REQUEST_FILES_SUBMIT_DELETE_ENTITY: () => string,


    ////////////////////////////////////////////////
    //
    // Charts
    //
    ////////////////////////////////////////////////

    /** Get all charts. */
    REQUEST_CHARTS_LIST: () => string,

    /** Proxy url allowing you to request charts data combined with REQUEST_CHARTS_SCRIPT endpoint. */
    REQUEST_CHARTS_DATASOURCE: () => string,

    /** Get specific charts and display it. */
    REQUEST_CHARTS_SCRIPT: () => string,


    ////////////////////////////////////////////////
    //
    // Reports datasource (used in HOME endpoints)
    //
    ////////////////////////////////////////////////

    /** Get chart for homepage. */
    REQUEST_HOME_REPORTS_DATASOURCE: () => string,

    ////////////////////////////////////////////////
    //
    // Frames
    //
    ////////////////////////////////////////////////

    /** Upsert a frame. */
    REQUEST_FRAMES_UPSERT: () => string,

    /** Delete frames. */
    REQUEST_FRAMES_DELETE: () => string,

    ////////////////////////////////////////////////
    //
    // HOME
    //
    ////////////////////////////////////////////////

    /** Get the list of modules (counters, reports and frames. */
    REQUEST_HOME_MODULES: () => string,

    /** Get a specific configuration by name. */
    REQUEST_HOME_GET_CONFIGURATION_BY_NAME: () => string,

    /** Get all configurations. */
    REQUEST_HOME_GET_CONFIGURATIONS: () => string,

    /** Upsert all configurations. */
    REQUEST_HOME_UPSERT_CONFIGURATION: () => string,

    /** Delete a configuration. */
    REQUEST_HOME_DELETE_CONFIGURATION: () => string,

    ////////////////////////////////////////////////
    //
    // Workflow
    //
    ////////////////////////////////////////////////

    /** Action workflow step using required parameter values given the workflow work item id. */
    REQUEST_WORKFLOW_ACTION: () => string,

    ////////////////////////////////////////////////
    //
    // Cross Ref
    //
    ////////////////////////////////////////////////

    /** Get tables list. */
    REQUEST_CROSSREF_TABLES_LIST: () => string,

    /** Upload data in a table from an Excel or from a CSV file. */
    REQUEST_CROSSREF_IMPORT: () => string,

    /** Used to upsert, remove and delete crossref data. */
    REQUEST_CROSSREF_DATA: () => string,

    /** Upsert a crossref table. */
    REQUEST_CROSSREF_TABLE_UPSERT: () => string,

    /** Duplicate a crossref table. */
    REQUEST_CROSSREF_TABLE_DUPLICATE: () => string,

    /** Get table's data. */
    REQUEST_CROSSREF_TABLE_RECORDS: () => string,

    /** Get table's schema. */
    REQUEST_CROSSREF_TABLE_DETAILS: () => string,

    /** Delete table's data. */
    REQUEST_CROSSREF_TABLE_DELETE: () => string,

    /** Search data in a table and export the results to an XLSX workbook. */
    REQUEST_CROSSREF_EXPORT: () => string,

    ////////////////////////////////////////////////
    //
    // Long Running Jobs (jobcontrol)
    //
    ////////////////////////////////////////////////

    /** Get list of long running jobs. */
    REQUEST_JOBCONTROL_JOBS_LIST: () => string,

    /** Get the status of a long running job. */
    REQUEST_JOBCONTROL_JOB_STATUS: ( jobId: string | number ) => string,

    /** Download a workspace entity produced by a long running job. */
    REQUEST_JOBCONTROL_JOB_ENTITY_DOWNLOAD: ( id: string ) => string,

    /** Cancel a long running job. */
    REQUEST_JOBCONTROL_JOB_CANCEL: ( jobId: string | number ) => string,

    ////////////////////////////////////////////////
    //
    // Services
    //
    ////////////////////////////////////////////////

    /** Request service by id. */
    REQUEST_SERVICES_GET_UI: ( serviceId: string, baseUrlOverride?: string ) => string,

    /** API endpoint by instance. */
    getUrlOfFeature: ( featureId: string, actionEndpoint: string, baseUrlOverride?: string ) => string,
}
```