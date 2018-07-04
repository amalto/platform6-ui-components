// Modules
import * as React from 'react'
import Dropzone from 'react-dropzone'
import * as classNames from 'classnames'

// Utils
import { compileWordings, formatFileSize } from '@amalto/helpers'

// Wordings
import { MULTILANGUAGE_WORDINGS } from '@amalto/wordings'

// Components
import FileWrapperDisplay from './components/FileWrapper'

// Models
import { FileWrapper } from '@amalto/typings'

/**
 * Component allowing you to import multiple files.
 * 
 * FileInput uses [FileWrapper](#filewrapper)'s interface and [WebStorage](#webstorage)'s properties which are accessible at the root component of your service.
 */
module FileInput {

    export interface Props extends React.ClassAttributes<FileInput> {
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

        /** Hide props from documentation */

        /** @ignore */
        children?: React.ReactNode;
        /** @ignore */
        key?: React.ReactText;
        /** @ignore */
        ref?: React.Ref<FileInput>;
    }

    export interface State {
        wordings?: { [key: string]: string };
        submitDisabled?: boolean;
        invalidFiles?: File[];
    }
}

/**
 * FileInput allow you to upload several files.
 * You can click or drag and drop inside the block to do so.
 */
class FileInput extends React.Component<FileInput.Props, FileInput.State> {

    constructor( props: FileInput.Props ) {
        super( props )
        this.state = {
            wordings: compileWordings( MULTILANGUAGE_WORDINGS, props.locale ),
            submitDisabled: false,
            invalidFiles: []
        }
    }

    render() {
        const { filesQueue } = this.props

        const files: FileWrapper[] = $.map( filesQueue, ( file, key ) => file )

        const filesDisplay = files.map( ( file, idx ) => {
            return (
                <FileWrapperDisplay key={idx} fileName={file.sourceFile.name}
                    fileSize={file.sourceFile.size}
                    deleteUploadedFile={this.deleteUploadedFile}
                    uploaded={file.uploadEnded}
                    progress={file.uploadProgress}
                    processSuccess={file.processSuccess}
                    processState={file.processState}
                />
            )
        } )

        let dropzone = (
            <Dropzone className="col-xs-12 file-drop-zone" onDrop={this.onDrop}
                disableClick={this.state.submitDisabled}
                accept={this.props.mimeTypeAccepted} maxSize={this.props.maxBytesSize}>

                <div className="drop-zone-title">
                    <span>{this.state.wordings['dropZoneTitle']}</span><br />
                    <span className="subtitle">{this.state.wordings['dropZoneSubtitle']}</span>
                </div>

            </Dropzone>
        )

        let cancelBtn = (
            <div className="top-margin">
                <button type="button" className="btn btn-sm btn-danger btn-trans" onClick={this.props.cancelSubmit}>
                    {this.state.wordings['cancel']}
                </button>
            </div>
        )

        let errors = this.state.invalidFiles.map( ( file, idx ) => {
            return (
                <div key={idx}>
                    <span><strong>{file.name}</strong> - </span><em>{formatFileSize( file.size )}, {file.type || this.state.wordings['unknownFormat']}</em>
                </div>
            )
        } )

        return (
            <div className="file-input">

                <div className="row">

                    <div className="col-xs-12 col-sm-5">
                        {dropzone}
                    </div>

                    <div className="col-xs-12 col-sm-7">
                        <div className="file-list">
                            <ul style={{ margin: 0 }}>
                                {filesDisplay}
                            </ul>

                            {
                                this.state.invalidFiles.length ? (
                                    <div className="alert alert-danger alert-dismissable top-margin text-medium">
                                        <button type="button" className="close" onClick={this.closeInvalidFilesAlert}>&times;</button>
                                        <div className="bottom-spaced">
                                            <strong className="right-spaced">{this.state.wordings['invalidFile']}</strong>
                                            <span className="fas fa-info-circle click-pointer" data-toggle="collapse" data-target="#inputFormatInfo" />
                                            <div id="inputFormatInfo" className="collapse top-spaced font-color" style={{ paddingLeft: 20 }}>
                                                {this.props.mimeTypeAccepted ? <div><strong className="right-spaced">{this.state.wordings['contentType']}</strong><span>{this.props.mimeTypeAccepted}</span></div> : null}
                                                {this.props.maxBytesSize ? <div><strong className="right-spaced">{this.state.wordings['maxSize']}</strong><span>{formatFileSize( this.props.maxBytesSize )}</span></div> : null}
                                            </div>
                                        </div>
                                        {errors}
                                    </div>
                                ) : null
                            }
                        </div>
                    </div>

                </div>

                {cancelBtn}

            </div>
        )

    }

    private onDrop = ( files: File[], rejectedFiles: File[] ): void => {
        if ( files.length ) {
            this.props.addFilesToQueue( files )
        }

        if ( rejectedFiles.length ) {
            this.setState( {
                invalidFiles: this.state.invalidFiles.concat( rejectedFiles )
            } )
        }
    }

    private closeInvalidFilesAlert = (): void => {
        this.setState( {
            invalidFiles: []
        } )
    }

    private deleteUploadedFile = ( fileName: string ): void => {
        this.props.deleteUploadedFile( fileName )
    }

}


export default FileInput