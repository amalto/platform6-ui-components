// Modules
import * as React from 'react'
import { WrappedFieldProps, Field, BaseFieldProps } from 'redux-form'

// Components
import Radio from './components/Radio'

/**
 * Radio input used on a [redux-form](#reduxform).
 */
namespace RadioInput {
    export interface Props extends BaseFieldProps {
        /** Input's name used when submitting form. */
        name: string;
        /** Input's label. */
        label?: string | JSX.Element;
        /** Input's list. */
        options: {
            value: string;
            label?: string;
        }[];
        /**
         * Whether or not the input is disabled.
         * @default false
         */
        disabled?: boolean;
        /** Tooltip text displayed when hovering <span className='quote'>?</span> icon. */
        help?: string;
        /** CSS class wrapping the component. */
        containerClass?: string;
        /** CSS class applied to every input from the list. */
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

function RadioInput( props: RadioInput.Props ) {
    const { options, disabled, help, containerClass, inputClass, collapseErrorSpace, name, label, format, normalize, parse, validate, warn } = props

    let baseFieldProps: BaseFieldProps = {
        name,
        format,
        normalize,
        parse,
        validate,
        warn
    }

    const renderRadioWithProps = ( field: WrappedFieldProps ) => {
        const radioProps: Radio.Props = {
            name,
            label,
            options,
            disabled,
            help,
            containerClass,
            inputClass,
            collapseErrorSpace,
            field
        }

        return <Radio {...radioProps} />
    }

    return options && options.length ? (

        <Field {...baseFieldProps} component={renderRadioWithProps} />

    ) : null
}

export default RadioInput