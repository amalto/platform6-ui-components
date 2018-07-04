/**
 * Created by franckmontaigne on 22/01/16.
 */

interface FileWrapper {
    sourceFile: File;
    uploadStarted: boolean;
    uploadProgress: number;
    uploadEnded: boolean;
    processSuccess?: boolean;
    processState?: string;
    message?: string;
    createdMessagesIds?: string;
}

export default FileWrapper