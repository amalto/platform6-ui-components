export declare type B2ResourceException = any

export interface MultiProcessingErrors {
    // The number of items processed
    processed: number;

    // The errors generated during a process
    errors: { [id: string]: B2ResourceException };
    
    // The message which describes the process executed
    message: string;
}