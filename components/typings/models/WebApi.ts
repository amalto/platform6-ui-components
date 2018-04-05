import { EndpointsUrl } from './EndpointsUrl'

interface WebApi {

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