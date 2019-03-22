// Modules
import * as React from 'react'
import * as uuid from 'uuid'
import { WrappedFieldProps, Field, BaseFieldProps } from 'redux-form'

// Components
import Input from './components/Input'

/**
 * Text input used on a [redux-form](#reduxform).
 */
namespace TextInput {
    export interface Props extends BaseFieldProps {
        /** Input's name used when submitting form. */
        name: string;
        /** Input's label. */
        label?: string | JSX.Element;
        /** Input's placeholder. */
        placeholder?: string;
        /**
         * Whether or not the input is disabled.
         * @default false
         */
        disabled?: boolean;
        /** Tooltip text displayed when hovering <span className='quote'>?</span> icon. */
        help?: string;
        /** CSS class wrapping the component. */
        containerClass?: string;
        /** Style wrapping the component. */
        containerStyle?: React.CSSProperties;
        /** CSS class applied to every input from the list. */
        inputClass?: string;
        /** Styles applied to every input from the list. */
        inputStyle?: React.CSSProperties;
        /** Input's type. */
        type?: string;
        /** Step between each number if input is of type <span className='quote'>number</span>. */
        step?: number;
        /**
         * Focus the input after being loaded.
         * @default false
         */
        autofocus?: boolean;
        /**
         * Randomize input value as a <span className='quote'>uuid.v1()</span> string.
         * @default false
         */
        randomGenerator?: boolean;
        /**
         * Remove the bottom margin which is the default height of the error message
         * displayed when input is invalid.
         * @default false
         */
        collapseErrorSpace?: boolean;
    }

}

function TextInput( props: TextInput.Props ) {
    const { name, format, normalize, parse, validate, warn } = props

    let baseFieldProps: BaseFieldProps = {
        name,
        format,
        normalize,
        parse,
        validate,
        warn
    }

    const renderText = ( field: WrappedFieldProps ) => {

        const {
            name,
            label,
            disabled,
            autofocus,
            help,
            containerClass,
            containerStyle,
            inputClass,
            inputStyle,
            type,
            step,
            randomGenerator,
            placeholder,
            collapseErrorSpace
        } = props

        return <Input name={name}
            label={label}
            disabled={disabled}
            autofocus={autofocus}
            help={help}
            containerClass={containerClass}
            containerStyle={containerStyle}
            inputClass={inputClass}
            inputStyle={inputStyle}
            type={type}
            step={step}
            randomGenerator={randomGenerator}
            placeholder={placeholder}
            collapseErrorSpace={collapseErrorSpace}
            field={field}
        />
    }

    return <Field {...baseFieldProps} component={field => renderText( field )} />
}

export default TextInput