/**
 * Created by Christopher VUONG
 */
import * as React from 'react'

// Modules
import { Field, BaseFieldProps, WrappedFieldProps } from 'redux-form'

// Components
import FileInput from './components/FileInput'

import { getWordings } from '@amalto/helpers'

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
         * Language to use on the component. e.g: <span className='quote'>en-US</span>.
         * Locales available at [Locale](#locale).
         * Accessible via [WebStorage](#webstorage).
         */
        locale: string;

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
}

function FileUploadInput( props: FileUploadInput.Props ) {
    const { name, format, normalize, parse, validate, warn } = props

    const [wordings, setWordings] = React.useState( getWordings( {}, props.locale ) )

    React.useEffect( () => {
        setWordings( getWordings( {}, props.locale ) )
    }, [props.locale] )

    const renderFileInput = ( props: FileUploadInput.Props, field: WrappedFieldProps ) => {
        const {
            name,
            filename,
            filesize,
            onFileLoaded,
            label,
            help,
            disabled,
            containerClass,
            inputClass,
            displayPreview,
            collapseErrorSpace
        } = props

        const fileInputProps: FileInput.Props = {
            name,
            filename,
            filesize,
            onFileLoaded,
            label,
            help,
            disabled,
            containerClass,
            inputClass,
            displayPreview,
            collapseErrorSpace,
            field,
            wordings
        }

        return (
            <FileInput {...fileInputProps} />
        )
    }

    const baseFieldProps: BaseFieldProps = {
        name,
        format,
        normalize,
        parse,
        validate,
        warn,
        component: field => renderFileInput( props, field )
    }

    return <Field {...baseFieldProps} />
}

export default FileUploadInput