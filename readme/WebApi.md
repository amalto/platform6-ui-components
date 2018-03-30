
WebApi uses [Auth](#auth) and [EndpointsUrl](#endpointsurl) interfaces.


```typescript
interface WebApi {

    /** Request authentification code. */
    requestAuthorizationCode: (
        code: string,
        uname: string,
        pw: string,
        realm?: string,
        cctx?: string
    ) => Promise<Auth.AuthCodeData>;

    /** Request access token using the authentification code. */
    requestAccessToken: ( authorizationCode: string ) => Promise<Auth.TokenData>;
    requestClientAccessToken: () => Promise<Auth.TokenData>;

    /** Refresh access token and reset token expiration timer. */
    refreshAccessToken: () => Promise<Auth.TokenData>;

    /** Queries that required a client token. */
    getWithClientToken: (
        url: string,
        clientAccessToken: string,
        queryParameters?: any,
        disableTimeout?: boolean
    ) => Promise<any>;

    delWithClientToken: (
        url: string,
        clientAccessToken: string,
        queryParameters?: any,
        disableTimeout?: boolean
    ) => Promise<any>;

    postWithClientToken: (
        url: string,
        clientAccessToken: string,
        bodyParameters?: any,
        queryParameters?: any,
        disableTimeout?: boolean
    ) => Promise<any>;

    putWithClientToken: (
        url: string,
        clientAccessToken: string,
        bodyParameters?: any,
        queryParameters?: any,
        disableTimeout?: boolean
    ) => Promise<any>;

    download: ( url: string, queryParameters?: Object ) => Promise<any>;

    staticGet: (
        url: string,
        queryParameters?: any,
        disableTimeout?: boolean,
        fullResponse?: boolean
    ) => Promise<any>;

    /** Queries */
    get: (
        url: string,
        queryParameters?: any,
        disableTimeout?: boolean,
        fullResponse?: boolean
    ) => Promise<any>;
    
    del: (
        url: string,
        queryParameters?: any,
        disableTimeout?: boolean,
        bodyParameters?: any
    ) => Promise<any>;
    
    post: (
        url: string,
        bodyParameters?: any,
        queryParameters?: any,
        disableTimeout?: boolean,
        formUrlEncoded?: boolean
    ) => Promise<any>;
    
    postWithFile: (
        url: string,
        fieldName: string,
        file: any,
        fieldsParameters?: { [fieldName: string]: string },
        queryParameters?: any
    ) => Promise<any>;
    
    put: (
        url: string,
        bodyParameters?: any,
        queryParameters?: any,
        disableTimeout?: boolean
    ) => Promise<any>;
    
    putWithFile: (
        url: string,
        fieldName: string,
        file: any,
        fieldsParameters?: { [fieldName: string]: string },
        queryParameters?: any
    ) => Promise<any>;

    /** Endpoint url to be used when making a query. */
    endpoints: EndpointsUrl;
}
```