import { EndpointsUrl } from './EndpointsUrl'

export namespace Auth {
    export interface AuthCodeBodyParameters {
        code: string;
        uname: string;
        pw: string;
        realm?: string;
    }
    export interface AuthCodeData {
        code: string;
        scope: string;
        redirect_uri: string;
        state?: string;
    }
    export interface TokenData {
        access_token: string;
        token_type: string;
        expires_in: number;
        refresh_token?: string;
        scope?: string;
        audience?: string;
        user_id?: string;
    }
    export interface TokenBodyParameters {
        redirect_uri: string;
        client_id: string;
        client_secret: string;
        grant_type: string;
        code?: string;
        refresh_token?: string;
    }
}

interface WebApi {

    requestAuthorizationCode: ( code: string, uname: string, pw: string, realm?: string, cctx?: string ) => Promise<Auth.AuthCodeData>;
    requestAccessToken: ( authorizationCode: string ) => Promise<Auth.TokenData>;
    requestClientAccessToken: () => Promise<Auth.TokenData>;
    refreshAccessToken: () => Promise<Auth.TokenData>;

    getWithClientToken: ( url: string, clientAccessToken: string, queryParameters?: any, disableTimeout?: boolean ) => Promise<any>
    delWithClientToken: ( url: string, clientAccessToken: string, queryParameters?: any, disableTimeout?: boolean ) => Promise<any>
    postWithClientToken: ( url: string, clientAccessToken: string, bodyParameters?: any, queryParameters?: any, disableTimeout?: boolean ) => Promise<any>
    putWithClientToken: ( url: string, clientAccessToken: string, bodyParameters?: any, queryParameters?: any, disableTimeout?: boolean ) => Promise<any>

    download: ( url: string, queryParameters?: Object ) => Promise<any>
    staticGet: ( url: string, queryParameters?: any, disableTimeout?: boolean, fullResponse?: boolean ) => Promise<any>

    get: ( url: string, queryParameters?: any, disableTimeout?: boolean, fullResponse?: boolean ) => Promise<any>
    del: ( url: string, queryParameters?: any, disableTimeout?: boolean, bodyParameters?: any ) => Promise<any>
    post: ( url: string, bodyParameters?: any, queryParameters?: any, disableTimeout?: boolean, formUrlEncoded?: boolean ) => Promise<any>
    postWithFile: ( url: string, fieldName: string, file: any, fieldsParameters?: { [fieldName: string]: string }, queryParameters?: any ) => Promise<any>
    put: ( url: string, bodyParameters?: any, queryParameters?: any, disableTimeout?: boolean ) => Promise<any>
    putWithFile: ( url: string, fieldName: string, file: any, fieldsParameters?: { [fieldName: string]: string }, queryParameters?: any ) => Promise<any>


    endpoints: EndpointsUrl
}

export { WebApi }