export interface BatchOperationReport {
    
    /** Number of items processed. */
    processed: number;

    /** Populated if some of the processed items have failed. */
    errors: {
        [itemId: string]: {

            /** Cause of the error. */
            cause: string;

            /** Error stacktrace. */
            stackTrace: {

                /** In which method error occurred. */
                methodName: string;

                /** In which file error occurred. */
                fileName: string;

                /** At which line error occurred. */
                lineNumber: number;

                /** Java class. */
                className: string;

                /** Is native method or not. */
                nativeMethod: boolean
            }[];

            /** HTML status code. */
            status: number | string;

            /** Internal error code. */
            code: number | string;
            
            link: string;

            /** Complete error message. */
            developerMessage: string;
            
            /** Readable message status. */
            message: string;

            /** If not empty, conflicts happened during process. */
            conflictInformation: any[];

            /** Error message depending on user browser language. */
            localizedMessage: string;

            /** Items suppressed. */
            suppressed: any[];
        }
    }

    /** General error message. */
    message: string;
}