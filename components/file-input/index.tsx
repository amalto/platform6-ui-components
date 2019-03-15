// Modules
import * as React from 'react'
// import Dropzone from 'react-dropzone'

// Utils
import { getWordings, formatFileSize } from '@amalto/helpers'

// Components
import FileWrapperDisplay from './components/FileWrapper'
import DropzoneInput from './components/DropzoneInput'
import InvalidFiles from './components/InvalidFiles'

// Models
import { FileWrapper } from '@amalto/typings'

/**
 * Component allowing you to import multiple files.
 * 
 * FileInput uses [FileWrapper](#filewrapper)'s interface and [WebStorage](#webstorage)'s properties which are accessible at the root component of your service.
 */
module FileInput {

    export interface Props {
        /**
         * Uploaded files list.
         */
        filesQueue: {
            [fileName: string]: FileWrapper
        };

        /**
         * Callback function executed when the user drops some files in the uploader.
         */
        addFilesToQueue: ( files: File[] ) => void;

        /**
         * Callback function executed when the user clicks on the <span className='quote'>Delete</span> button of a specific uploaded file.
         */
        deleteUploadedFile: ( fileName: string ) => void;

        /**
         * Callback function executed when the user clicks on the <span className='quote'>Cancel</span> button.
         */
        cancelSubmit: () => void;

        /** Allowed mime types. */
        mimeTypeAccepted?: string;

        /** Max size in bytes (by file). */
        maxBytesSize?: number;

        /**
         * Language to use on the component. e.g: <span className='quote'>en-US</span>.
         * Locales available at [Locale](#locale).
         * Accessible via [WebStorage](#webstorage).
         */
        locale: string;
    }
}

/**
 * FileInput allow you to upload several files.
 * You can click or drag and drop inside the block to do so.
 */
function FileInput( props: FileInput.Props ) {
    const { addFilesToQueue, deleteUploadedFile, cancelSubmit, mimeTypeAccepted, maxBytesSize, filesQueue, locale } = props

    const [wordings, setWordings] = React.useState( getWordings( {}, props.locale ) )
    const [invalidFiles, setInvalidFiles] = React.useState( [] )

    const files: FileWrapper[] = $.map( filesQueue, file => file )

    // Set wordings
    React.useEffect( () => setWordings( getWordings( {}, props.locale ) ), [] )

    const filesDisplay = files.map( ( file, idx ) => {
        return (
            <FileWrapperDisplay key={idx} fileName={file.sourceFile.name}
                fileSize={file.sourceFile.size}
                deleteUploadedFile={deleteUploadedFile}
                uploaded={file.uploadEnded}
                progress={file.uploadProgress}
                processSuccess={file.processSuccess}
                processState={file.processState}
            />
        )
    } )

    let cancelBtn = (
        <div className="top-margin">
            <button type="button" className="btn btn-sm btn-danger btn-trans" onClick={cancelSubmit}>
                {wordings.cancel}
            </button>
        </div>
    )

    const errors = invalidFiles.map( ( file, idx ) => (
        <div key={idx}>
            <span><strong>{file.name}</strong> - </span><em>{formatFileSize( file.size )}, {file.type || wordings.unknownFormat}</em>
        </div>
    ) )

    return (
        <div className="file-input">

            <div className="row">

                <div className="col-xs-12 col-sm-5">
                    <DropzoneInput onDrop={( files, rejectedFiles ) => onDrop( files, rejectedFiles, addFilesToQueue, invalidFiles, setInvalidFiles )}
                        disabled={false}
                        mimeTypeAccepted={mimeTypeAccepted}
                        maxBytesSize={maxBytesSize}
                        locale={locale}
                    />
                </div>

                <div className="col-xs-12 col-sm-7">
                    <div className="file-list">
                        <ul style={{ margin: 0 }}>
                            {filesDisplay}
                        </ul>

                        {
                            invalidFiles.length ? (
                                <InvalidFiles mimeTypeAccepted={mimeTypeAccepted}
                                    maxBytesSize={maxBytesSize}
                                    errors={errors}
                                    closeInvalidFilesAlert={() => setInvalidFiles( [] )}
                                    wordings={wordings}
                                />
                            ) : null
                        }
                    </div>
                </div>

            </div>

            {cancelBtn}

        </div>
    )
}

function onDrop(
    files: File[],
    rejectedFiles: File[],
    addFilesToQueue: ( files: File[] ) => void,
    invalidFiles: File[],
    setInvalidFiles: ( files: File[] ) => void
): void {
    if ( files.length ) { addFilesToQueue( files ) }
    if ( rejectedFiles.length ) { setInvalidFiles( invalidFiles.concat( rejectedFiles ) ) }
}

export default FileInput