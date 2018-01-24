import * as React from 'react'

//utils & stores
import { compileWordings, formatFileSize } from '@amalto/helpers'

//components & models
import FileWrapper from './models/FileWrapper'
import FileWrapperDisplay from './components/FileWrapper'

//modules
import Dropzone from 'react-dropzone'
import * as classNames from 'classnames'

const WORDINGS = {

    'fileinput.drop.zone.title': {
        'en-US': 'Drop files here to upload them',
        'fr-FR': 'Déposer les fichiers à envoyer ici'
    },
    'fileinput.drop.zone.subtitle': {
        'en-US': '(or click)',
        'fr-FR': '(ou cliquer)'
    },
    'fileinput.button.cancel': {
        'en-US': 'Cancel',
        'fr-FR': 'Annuler'
    },
    'fileinput.invalid.file': {
        'en-US': 'Invalid file(s)',
        'fr-FR': 'Fichier(s) invalide(s)'
    },
    'fileinput.content.type': {
        'en-US': 'Accepted Content-types:',
        'fr-FR': 'Content-types acceptés :'
    },
    'fileinput.max.size': {
        'en-US': 'Max size:',
        'fr-FR': 'Taille max :'
    },
    'fileinput.unknown.format': {
        'en-US': 'unknown format',
        'fr-FR': 'unknown size'
    }

}

module FileInput {

    export interface Props extends React.ClassAttributes<FileInput> {
        /**
         * Uploaded files list.
         * See below for the required data model behind the FileWrapper interface.
         */
        filesQueue: {
            [fileName: string]: FileWrapper
        };

        /**
         * Callback function executed when the user drops some files in the uploader.
         */
        addFilesToQueue: ( files: File[] ) => void;

        /**
         * Callback function executed when the user clicks on the "Delete" button of a specific uploaded file.
         */
        deleteUploadedFile: ( fileName: string ) => void;

        /**
         * Callback function executed when the user clicks on the "Cancel" button.
         */
        cancelSubmit: () => void;

        /** Allowed mime types. */
        mimeTypeAccepted?: string;

        /** Max size in bytes (by file). */
        maxBytesSize?: number;

        /** Locale to be used by component. */
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
            wordings: compileWordings( WORDINGS, props.locale ),
            submitDisabled: false,
            invalidFiles: []
        }
    }

    render() {

        let files: FileWrapper[] = $.map( this.props.filesQueue, function ( file, idx ) {
            return file
        } )

        let filesDisplay = files.map( ( file, idx ) => {
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
                    <span>{this.state.wordings['fileinput.drop.zone.title']}</span><br />
                    <span className="subtitle">{this.state.wordings['fileinput.drop.zone.subtitle']}</span>
                </div>

            </Dropzone>
        )

        let cancelBtn = (
            <div className="top-margin">
                <button type="button" className="btn btn-sm btn-danger btn-trans" onClick={this.props.cancelSubmit}>
                    {this.state.wordings['fileinput.button.cancel']}
                </button>
            </div>
        )

        let errors = this.state.invalidFiles.map( ( file, idx ) => {
            return (
                <div key={idx}>
                    <span><strong>{file.name}</strong> - </span><em>{formatFileSize( file.size )}, {file.type || this.state.wordings['fileinput.unknown.format']}</em>
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
                                            <strong className="right-spaced">{this.state.wordings['fileinput.invalid.file']}</strong>
                                            <span className="fa fa-info-circle click-pointer" data-toggle="collapse" data-target="#inputFormatInfo" />
                                            <div id="inputFormatInfo" className="collapse top-spaced font-color" style={{ paddingLeft: 20 }}>
                                                {this.props.mimeTypeAccepted ? <div><strong className="right-spaced">{this.state.wordings['fileinput.content.type']}</strong><span>{this.props.mimeTypeAccepted}</span></div> : null}
                                                {this.props.maxBytesSize ? <div><strong className="right-spaced">{this.state.wordings['fileinput.max.size']}</strong><span>{formatFileSize( this.props.maxBytesSize )}</span></div> : null}
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