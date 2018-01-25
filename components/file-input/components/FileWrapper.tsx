import * as React from 'react'

//utils & stores
import { formatFileSize } from 'helpers'

//modules
import * as classNames from 'classnames'

module FileWrapper {
    export interface Props extends React.ClassAttributes<FileWrapper> {
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

    export interface State {

    }
}

class FileWrapper extends React.Component<FileWrapper.Props, FileWrapper.State> {

    constructor( props: FileWrapper.Props ) {
        super( props )
    }

    render() {

        let progressDisplay = this.props.progress ? (
            <div className="file-upload-progress" style={{ width: this.props.progress + '%' }}></div>
        ) : !this.props.uploaded ? <div className="bar-load" /> : null

        let deleteBtn = ( this.props.uploaded && !this.props.processSuccess ) ? (
            <div data-file-name={this.props.fileName} className="file-icon-cell file-delete-btn" onClick={this.deleteUploadedFile}>
                <span className="fa fa-fw fa-trash"></span>
            </div>
        ) : null

        let successIcon = this.props.processSuccess ? (
            <div className="file-icon-cell">
                <span className="fa fa-fw fa-check"></span>
            </div>
        ) : null

        let createdMessageText = this.props.successMessage || null

        let errorMessage = ( this.props.processSuccess === false && this.props.message ) ? (
            <div className="file-error-row">
                <div className="file-error-message">
                    <span className="fa fa-exclamation-triangle right-spaced" />
                    <span dangerouslySetInnerHTML={{ __html: this.props.message }} />
                </div>
                {/* this div matches the number of cell of the previous table-row, it allows proper alignment of borders */}
                <div>&nbsp;</div>
            </div>
        ) : null

        return (
            <li className={classNames( {
                'success-color': this.props.processSuccess,
                'warning-color': this.props.processState === 'WARNING',
                'danger-color': this.props.processState === 'ERROR',
                'bar-loading-wrapper': !this.props.uploaded
            } )}>
                {progressDisplay}
                <div className="file-details">
                    <span className="file-name" data-toggle="tooltip" data-original-title={createdMessageText}>{this.props.fileName}</span>
                    <span className="file-size">{formatFileSize( this.props.fileSize )}</span>
                </div>
                {deleteBtn}
                {successIcon}
                {errorMessage}
            </li>
        )

    }

    private deleteUploadedFile = ( event: any ): void => {
        const fileName = event.currentTarget.getAttribute( 'data-file-name' )
        this.props.deleteUploadedFile( fileName )
    }

}


export default FileWrapper