import * as React from 'react'
import { ThunkAction } from 'redux-thunk'

export declare type Endpoints = any;
export declare type Action = any;
export declare type GlobalState = any;
export declare type UserModel = any;

export module Auth {
    export declare type AuthCodeData = any;
    export declare type TokenData = any;
}

export interface Auth {
    AuthCodeData: any;
    TokenData: any;
}

export module NotificationModel {
    export declare type Type = any;
}

export interface NotificationModel {
    Type: any;
}

const requestAuthorizationCode = ( code: string, uname: string, pw: string, realm?: string, cctx?: string ): Promise<Auth.AuthCodeData> => { return null }
const requestAccessToken = ( authorizationCode: string ): Promise<Auth.TokenData> => { return null }
const requestClientAccessToken = (): Promise<Auth.TokenData> => { return null }
const refreshAccessToken = (): Promise<Auth.TokenData> => { return null }
const getWithClientToken = ( url: string, clientAccessToken: string, queryParameters?: any, disableTimeout?: boolean ): Promise<any> => { return null }
const delWithClientToken = ( url: string, clientAccessToken: string, queryParameters?: any, disableTimeout?: boolean ): Promise<any> => { return null }
const postWithClientToken = ( url: string, clientAccessToken: string, bodyParameters?: any, queryParameters?: any, disableTimeout?: boolean ): Promise<any> => { return null }
const putWithClientToken = ( url: string, clientAccessToken: string, bodyParameters?: any, queryParameters?: any, disableTimeout?: boolean ): Promise<any> => { return null }
const download = ( url: string, queryParameters?: Object ): Promise<any> => { return null }
const staticGet = ( url: string, queryParameters?: any, disableTimeout?: boolean, fullResponse?: boolean ): Promise<any> => { return null }
const get = ( url: string, queryParameters?: any, disableTimeout?: boolean, fullResponse?: boolean ): Promise<any> => { return null }
const del = ( url: string, queryParameters?: any, disableTimeout?: boolean, bodyParameters?: any ): Promise<any> => { return null }
const post = ( url: string, bodyParameters?: any, queryParameters?: any, disableTimeout?: boolean, formUrlEncoded?: boolean ): Promise<any> => { return null }
const postWithFile = ( url: string, fieldName: string, file: any, fieldsParameters?: { [fieldName: string]: string }, queryParameters?: any ): Promise<any> => { return null }
const put = (  url: string, bodyParameters?: any, queryParameters?: any, disableTimeout?: boolean ): Promise<any> => { return null }
const putWithFile = ( url: string, fieldName: string, file: any, fieldsParameters?: { [fieldName: string]: string }, queryParameters?: any ): Promise<any> => { return null }

export const api = {
    requestAuthorizationCode,

    requestAccessToken,
    requestClientAccessToken,

    refreshAccessToken,

    getWithClientToken,
    delWithClientToken,
    postWithClientToken,
    putWithClientToken,

    download,
    staticGet,

    get,
    del,
    post,
    postWithFile,
    put,
    putWithFile,

    endpoints: {}
}

export function displayContextMenu( content: any, positionX?: number, positionY?: number ): Action { return null };

export function hideContextMenu(): Action { return null };

export function receiveUserInfo( userInfo: UserModel ): Action { return null };

export function displayNotification( notificationType?: NotificationModel.Type, notificationOptions?: NotificationModel, displayParameter?: any ): Action { return null };

export function handleErrorDisplay( error: any ): Action { return null };

export function showDialog( title: string, body: React.ReactElement<any> | string, confirmAction?: Action | ThunkAction<void, GlobalState, any>, cancelAction?: Action | ThunkAction<void, GlobalState, any>, confirmLevel?: string, itemsList?: string[], modalReadyCallback?: () => void ): Action { return null };

export function hideDialog(): Action { return null };