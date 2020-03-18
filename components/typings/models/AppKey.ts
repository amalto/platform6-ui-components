export interface AppKey {

    /** Value. */
    appKey: string;

    /** Icon associated. */
    appLogo: string;

    /** Description on any languages. */
    appDescriptionMap: {
        [lang: string]: string;
    },

    /** Name on any languages. */
    appNameMap: {
        [lang: string]: string;
    };

    /** Publisher name. */
    publisherName: string;

    /** Publisher postal address */
    publisherAddress: string;

    /** Custom properties. */
    properties: {
        [key: string]: string;
    },

    /** Usable or not. */
    active: boolean;
}