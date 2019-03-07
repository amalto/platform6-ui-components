// Modules
import * as React from 'react'
import * as classNames from 'classnames'

// Utils
import { formatFileSize } from '@amalto/helpers'

module FileWrapper {
    export interface Props {
        fileName: string;
        fileSize: number;
        deleteUploadedFile: ( fileName: string ) => void;
        uploaded: boolean
        progress?: number;
        processSuccess?: boolean;
        processState?: string;
        message?: string;
        successMessage?: string
    }
}

function FileWrapper( props: FileWrapper.Props ): JSX.Element {

    const deleteUploadedFile = ( event: any ): void => {
        const fileName = event.currentTarget.getAttribute( 'data-file-name' )
        props.deleteUploadedFile( fileName )
    }

    let progressDisplay = props.progress ? (
        <div className="file-upload-progress" style={{ width: props.progress + '%' }}></div>
    ) : !props.uploaded ? <div className="bar-load" /> : null

    let deleteBtn = ( props.uploaded && !props.processSuccess ) ? (
        <div data-file-name={props.fileName} className="file-icon-cell file-delete-btn" onClick={deleteUploadedFile}>
            <span className="fas fa-fw fa-trash-alt"></span>
        </div>
    ) : null

    let successIcon = props.processSuccess ? (
        <div className="file-icon-cell">
            <span className="fas fa-fw fa-check"></span>
        </div>
    ) : null

    let createdMessageText = props.successMessage || null

    let errorMessage = ( props.processSuccess === false && props.message ) ? (
        <div className="file-error-row">
            <div className="file-error-message">
                <span className="fas fa-exclamation-triangle right-spaced" />
                <span dangerouslySetInnerHTML={{ __html: props.message }} />
            </div>
            {/* this div matches the number of cell of the previous table-row, it allows proper alignment of borders */}
            <div>&nbsp;</div>
        </div>
    ) : null

    return (
        <li className={classNames( {
            'success-color': props.processSuccess,
            'warning-color': props.processState === 'WARNING',
            'danger-color': props.processState === 'ERROR',
            'bar-loading-wrapper': !props.uploaded
        } )}>
            {progressDisplay}
            <div className="file-details">
                <span className="file-name" data-toggle="tooltip" data-original-title={createdMessageText}>{props.fileName}</span>
                <span className="file-size">{formatFileSize( props.fileSize )}</span>
            </div>
            {deleteBtn}
            {successIcon}
            {errorMessage}
        </li>
    )
}

export default FileWrapper