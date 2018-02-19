```typescript
export interface RemoteConfig {

    /** The URL remote data should be loaded from. */
    url: string;

    /** 
     * A function that provides a hook to allow you to prepare the settings object passed to transport when a request is about to be made.
     * The function signature should be prepare(query, settings), where query is the query #search was called with and settings is the default settings object created internally by the Bloodhound instance.
     * The prepare function should return a settings object
     */
    prepare?: ( query: string, settings: JQueryAjaxSettings ) => JQueryAjaxSettings;
    
    /** 
     * A convenience option for prepare. If set, prepare will be a function that replaces the value of this option in url with the URI encoded query
     */
    wildcard?: string;

    /** The method used to rate-limit network requests. Can be either debounce or throttle. Defaults to debounce. */
    rateLimitby?: string;

    /** The time interval in milliseconds that will be used by rateLimitBy. Defaults to 300. */
    rateLimitWait?: number;

    /**
     * A function with the signature transform(response) that allows you to transform the remote response before the Bloodhound instance operates on it.
     */
    transform?: ( response: any ) => any;
}
```