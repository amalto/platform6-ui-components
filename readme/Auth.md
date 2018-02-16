```typescript
namespace Auth {
    export interface AuthCodeBodyParameters {
        
        /** Login session. */
        code: string;
        
        /** User authentificator (email). */
        uname: string;
        
        /** User password. */
        pw: string;
        
        /** Realm user is connected to. */
        realm?: string;
    }

    export interface AuthCodeData {

        /** Login session. */
        code: string;

        /** Permission scope string. */
        scope: string;

        /** Uri to login page. */
        redirect_uri: string;

        /** Login session. */
        state?: string;
    }

    export interface TokenData {
        access_token: string

        /** Access token type. */
        token_type: string

        /** Token expiration time. */
        expires_in: number

        /** Refresh token used after expiration of the token. */
        refresh_token?: string

        /** Permission scope string. */
        scope?: string


        audience?: string

        /** User id associated to the token. */
        user_id?: string
    }

    export interface TokenBodyParameters {

        /** Uri to login page. */
        redirect_uri: string

        /** Client id the user is connected to. */
        client_id: string
        
        /** Client token secret. */
        client_secret: string
        
        /** Query header authorization_code */
        grant_type: string
        
        /** Login session. */
        code?: string
        
        /** Refresh token used after expiration of the token. */
        refresh_token?: string
    }
}
```