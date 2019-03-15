import * as React from 'react'
import classNames from 'classnames'
import { WrappedFieldProps, WrappedFieldInputProps } from 'redux-form'

// Utils
import { formatFileSize, deepCopy } from '@amalto/helpers'

// Components
import Help from '@amalto/help'

module FileInput {
    export interface Props {
        /** Input's name used when submitting form. */
        name: string;
        /** File name to display. */
        filename?: string;
        /** File size to display. */
        filesize?: number;
        /** Callback with filename and filesize after load. */
        onFileLoaded?: ( filename: string, filesize: number ) => void;
        /** Input's label. */
        label?: string | JSX.Element;
        /** Tooltip text displayed when hovering "?" icon. */
        help?: string;
        /**
         * Whether or not the input is disabled.
         * @default false
         */
        disabled?: boolean;
        /** CSS class wrapping the component. */
        containerClass?: string;
        /** CSS class applied to every input from the list. */
        inputClass?: string;
        /**
         * Display file preview.
         * @default false
         */
        displayPreview?: boolean;
        /**
         * Remove the bottom margin which is the default height of the error message
         * displayed when input is invalid.
         * @default false
         */
        collapseErrorSpace?: boolean;
        field: WrappedFieldProps;
        wordings: { [id: string]: string };
    }
}

function FileInput( props: FileInput.Props ) {

    // boolean
    const [loadingError, setLoadingError] = React.useState( false )
    // string
    const [fileContent, setFileContent] = React.useState( null )
    // string
    const [filename, setFilename] = React.useState( props.filename || null )
    // number
    const [filesize, setFilesize] = React.useState( props.filesize || null )

    // Component did update
    React.useEffect( () => { setFilename( props.filename ) }, [props.filename] )
    React.useEffect( () => { setFilesize( props.filesize ) }, [props.filesize] )

    const { label, disabled, help, containerClass, inputClass, name, displayPreview, onFileLoaded, collapseErrorSpace, field, wordings } = props
    const { input, meta } = field
    const fileUploaded: boolean = !!input.value

    return (
        <div className={classNames( 'form-group', containerClass, {
            'invalid': meta.touched && !!meta.error || loadingError
        } )}>

            {label ? <label>{label}{help && <Help text={help} />}</label> : null}

            <div className='form-control pos-relative'>
                <input
                    name={name}
                    type="file"
                    disabled={disabled}
                    className={classNames( 'pos-absolute upload-input default-pointer', inputClass )}
                    onChange={( e ) => { setValue( e, field.input, onFileLoaded, setFileContent, setLoadingError, setFilename, setFilesize ) }} />
                <span className='fas fa-upload primary-color mgr-10' />
                {
                    !!filename && !!filesize
                        ? <span className='italic'>
                            <span>
                                <span className='black-color bold'>{wordings.name}:</span> {filename}</span>, <span><span className='black-color bold'>{wordings.size}:</span> {formatFileSize( filesize )}</span>
                        </span>
                        : !fileUploaded ? <span className='italic'>{wordings.noFileChosen}</span> : <span className='italic'>{wordings.fileUploaded}</span>
                }

            </div>

            {( meta.touched && !!meta.error ) ? <p className="validation-error-message">{meta.error}</p> : ( collapseErrorSpace || loadingError ? null : <p className="validation-error-message">&nbsp;</p> )}

            {
                ( input.value && displayPreview && fileContent ) ?
                    <div className="hidden-xs top-spaced">
                        <em><small>{label && <span className="right-spaced">{label}</span>}{wordings.previewLowerCase}</small></em>
                        <pre className="code-preview-sm">{fileContent}</pre>
                    </div> : null
            }

            {loadingError ? <p className="validation-error-message">{wordings.fileUploadFailed}</p> : null}

        </div>
    )
}

function setValue(
    event: any,
    input: WrappedFieldInputProps,
    onFileLoaded: ( filename: string, filesize: number ) => void,
    setFileContent: ( fileContent: string | ArrayBuffer ) => void,
    setLoadingError: ( value: boolean ) => void,
    setFilename: ( name: string ) => void,
    setFilesize: ( size: number ) => void
): void {
    setLoadingError( false )

    const reader = new FileReader()
    const file = event.target.files[0]

    reader.onload = () => { setFileContent( reader.result ) }
    reader.onerror = () => { setLoadingError( true ) }
    reader.readAsText( file )

    if ( file ) {
        input.onChange( file, undefined )
        onFileLoaded && onFileLoaded( file.filename, file.size )
        setFilename( file.filename )
        setFilesize( file.size )
    }
}

export default FileInput