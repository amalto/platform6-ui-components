// Modules
import * as React from 'react'
import { WrappedFieldProps, Field, BaseFieldProps } from 'redux-form'

// Components
import Text from './components/Text'

/**
 * Readonly input used on a [redux-form](#reduxform).
 */
module ReadOnlyInput {
    export interface Props extends BaseFieldProps {
        /** Input's name used when submitting form. */
        name: string;
        /** Input's label. */
        label?: string | JSX.Element;
        /** Tooltip text displayed when hovering <span className='quote'>?</span> icon. */
        help?: string;
        /** CSS class wrapping the component. */
        containerClass?: string;
        /** CSS class applied to input. */
        inputClass?: string;
        /**
         * Remove the bottom margin which is the default height of the error message
         * displayed when input is invalid.
         * @default false
         */
        collapseErrorSpace?: boolean;

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

function ReadOnlyInput( props: ReadOnlyInput.Props ) {
    const { name, label, help, containerClass, inputClass, collapseErrorSpace, format, normalize, parse, validate, warn } = props

    let baseFieldProps: BaseFieldProps = {
        name,
        format,
        normalize,
        parse,
        validate,
        warn
    }

    const renderText = ( field: WrappedFieldProps ) => {
        const textProps: Text.Props = {
            name,
            label,
            help,
            containerClass,
            inputClass,
            collapseErrorSpace,
            field
        }

        return <Text {...textProps} />
    }

    return <Field {...baseFieldProps} component={renderText} />

}

export default ReadOnlyInput