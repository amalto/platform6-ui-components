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
        name: string;
        label?: string | JSX.Element;
        disabled?: boolean;
        help?: string;
        containerClass?: string;
        inputClass?: string;
        displayPreview?: boolean;
        collapseErrorSpace?: boolean;
        locale: string;
    }

    export interface State {
        wordings?: { [id: string]: string };
        loadingError?: boolean;
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
            filename: null,
            filesize: null
        }
    }

    render() {

        const { filename, filesize, wordings } = this.state

        const { label, disabled, help, containerClass, inputClass, name, displayPreview, collapseErrorSpace, input, meta } = this.props

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
                    <span className='fa fa-upload primary-color mgr-10' />
                    {
                        !!filename && !!filesize
                            ? <span className='italic'>
                                <span>
                                    <span className='black-color bold'>{wordings['name']}:</span> {filename}</span>, <span><span className='black-color bold'>{wordings['size']}:</span> {formatFileSize( filesize )}</span>
                            </span>
                            : !fileUploaded ? <span className='italic'>{wordings['noFileChosen']}</span> : <span className='italic'>{wordings['fileUploaded']}</span>
                    }

                </div>

                {( meta.touched && !!meta.error ) ? <p className="validation-error-message">{meta.error}</p> : ( collapseErrorSpace || this.state.loadingError ? null : <p className="validation-error-message">&nbsp;</p> )}

                {
                    ( input.value && displayPreview ) ?
                        <div className="hidden-xs top-spaced">
                            <em><small>{label && <span className="right-spaced">{label}</span>}{wordings['previewLowerCase']}</small></em>
                            <pre className="code-preview-sm">{input.value}</pre>
                        </div> : null
                }

                {this.state.loadingError ? <p className="validation-error-message">{wordings['fileUploadFailed']}</p> : null}

            </div>
        )
    }

    private setValue = ( event: any, field: WrappedFieldProps<any> ): void => {
        this.setState( { loadingError: false } )

        const { input, meta } = field
        const file = event.target.files[0]

        if ( file ) {
            this.setState( { filename: file.name, filesize: file.size } as FileUploadInput.State, () => input.onChange( file, undefined, undefined ) )
        }
    }
}

namespace FileUploadInput {
    export interface Props extends BaseFieldProps {
        name: string;
        label?: string;
        disabled?: boolean;
        help?: string;
        containerClass?: string;
        inputClass?: string;
        displayPreview?: boolean;
        collapseErrorSpace?: boolean;
        locale: string;
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