/**
 * Created by Christopher VUONG
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'

// Modules
import { WrappedFieldInputProps, WrappedFieldProps, Field, BaseFieldProps } from 'redux-form'

// Components
import Help from '@amalto/help'

// Utils
import * as classNames from 'classnames'
import {
    formatFileSize,
    compileWordings
} from '@amalto/helpers'

// Wordings
import { MULTILANGUAGE_WORDINGS } from '@amalto/wordings'

namespace FileInput {
    export interface Props extends WrappedFieldProps<any> {
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
        /**
         * Reads the file as data URL and sets the value to a base64 string (can be used as a basic image uploader with the displayPreview set to true)
         * @default false
         */
        getAsDataUrl?: boolean;
        /**
         * Language to use on the component. e.g: <span className='quote'>en-US</span>.
         * Locales available at [Locale](#locale).
         * Accessible via [WebStorage](#webstorage).
         */
        locale: string;
    }

    export interface State {
        wordings?: { [id: string]: string };
        loadingError?: boolean;
        fileContent?: string;
        filename?: string;
        filesize?: number;
    }
}

class FileInput extends React.Component<FileInput.Props, FileInput.State> {
    constructor( props: FileInput.Props ) {
        super( props )
        this.state = {
            wordings: compileWordings( MULTILANGUAGE_WORDINGS, props.locale ),
            loadingError: false,
            fileContent: props.displayPreview && props.input && props.input.value ? props.input.value : null,
            filename: props.filename || null,
            filesize: props.filesize || null
        }
    }

    componentDidUpdate( prevProps: FileInput.Props ) {
        if ( prevProps.filename !== this.props.filename ) this.setState( { filename: this.props.filename } as FileInput.State )
        if ( prevProps.filesize !== this.props.filesize ) this.setState( { filesize: this.props.filesize } as FileInput.State )
    }

    render() {

        const { filename, filesize, fileContent, wordings } = this.state
        const { label, disabled, help, containerClass, inputClass, name, displayPreview, collapseErrorSpace, input, meta, getAsDataUrl } = this.props
        const fileUploaded: boolean = !!input.value

        return (
            <div className={classNames( 'form-group', containerClass, {
                'invalid': meta.touched && !!meta.error || this.state.loadingError
            } )}>

                {label ? <label>{label}{help && <Help text={help} />}</label> : null}

                <div className='form-control pos-relative'>
                    <input
                        name={name}
                        type="file"
                        disabled={disabled}
                        className={classNames( 'pos-absolute upload-input default-pointer', inputClass )}
                        onChange={( e ) => { this.setValue( e, { input, meta } ) }} />
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

                {( meta.touched && !!meta.error ) ? <p className="validation-error-message">{meta.error}</p> : ( collapseErrorSpace || this.state.loadingError ? null : <p className="validation-error-message">&nbsp;</p> )}

                {
                    ( input.value && displayPreview && fileContent ) ?
                        <div className="hidden-xs top-spaced">
                            <em><small>{label && <span className="right-spaced">{label}</span>}{wordings.previewLowerCase}</small></em>
                            {
                                getAsDataUrl ? (
                                    <div><img style={{ maxHeight: 150 }} src={fileContent} /></div>
                                ) : <pre className="code-preview-sm">{fileContent}</pre>
                            }
                        </div> : null
                }

                {this.state.loadingError ? <p className="validation-error-message">{wordings.fileUploadFailed}</p> : null}

            </div>
        )
    }

    private setValue = ( event: any, field: WrappedFieldProps<any> ): void => {
        this.setState( { loadingError: false } )

        const { getAsDataUrl } = this.props
        const { input, meta } = field
        const file = event.target.files[0]
        const reader = new FileReader()

        if ( file ) {
            reader.onload = () => {
                this.setState( { fileContent: reader.result } as FileUploadInput.State )
                if ( getAsDataUrl ) {
                    input.onChange( reader.result, undefined, undefined )
                }
            }

            reader.onerror = () => {
                this.setState( { loadingError: true } )
            }

            if ( getAsDataUrl ) {
                reader.readAsDataURL( file )
            } else {
                reader.readAsText( file )
            }

            this.setState( { filename: file.name, filesize: file.size } as FileUploadInput.State, () => {
                if ( !getAsDataUrl ) {
                    input.onChange( file, undefined, undefined )
                }
                this.props.onFileLoaded && this.props.onFileLoaded( this.state.filename, this.state.filesize )
            } )
        }
    }
}

/**
 * FileInput uses [WebStorage](#webstorage)'s properties
 * which are accessible at the root component of your service.
 */
namespace FileUploadInput {
    export interface Props extends BaseFieldProps {
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
        /** Tooltip text displayed when hovering <span className='quote'>?</span> icon. */
        help?: string;
        /** Either input is disable or not. */
        disabled?: boolean;
        /** CheckboxInput group CSS class. */
        containerClass?: string;
        /** CSS class applied to every input from the list. */
        inputClass?: string;
        /** Display file preview. */
        displayPreview?: boolean;
        /**
         * Remove the bottom margin which is the default height of the error message
         * displayed when input is invalid.
         */
        collapseErrorSpace?: boolean;
        /**
         * Reads the file as data URL and sets the value to a base64 string (can be used as a basic image uploader with the displayPreview set to true)
         * @default false
         */
        getAsDataUrl?: boolean;
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
        ref?: React.Ref<any>;

        /** redux-form props */

        /** @ignore */
        component?: any,
        /** @ignore */
        format?: any,
        /** @ignore */
        normalize?: any,
        /** @ignore */
        props?: any,
        /** @ignore */
        parse?: any,
        /** @ignore */
        validate?: any,
        /** @ignore */
        warn?: any,
        /** @ignore */
        withRef?: any
    }

    export interface State { }
}

class FileUploadInput extends React.Component<FileUploadInput.Props, FileUploadInput.State> {

    constructor( props: FileUploadInput.Props ) {
        super( props )
        this.state = {}
    }

    render() {
        const { name, label, format, normalize, parse, validate, warn } = this.props
        const baseFieldProps: BaseFieldProps = {
            name,
            format,
            normalize,
            parse,
            validate,
            warn,
            component: FileInput
        }

        return <Field {...baseFieldProps} {...this.props} />

    }

}

export default FileUploadInput