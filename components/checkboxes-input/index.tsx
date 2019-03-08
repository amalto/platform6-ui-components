// Modules
import * as React from 'react'
import { WrappedFieldProps, Field, BaseFieldProps } from 'redux-form'

// Components
import Checkboxes from './components/Checkboxes'

/**
 * Checkboxes inputs used on a [redux-form](#reduxform).
 */
namespace CheckboxesInput {
    export interface Props {
        /** Input's name used when submitting form. */
        name: string;
        /** Input's list. */
        options: {
            value: string;
            label?: string | JSX.Element;
        }[];
        /** Input's label. */
        label?: string | JSX.Element;
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

        /** Hide props from documentation */

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

function CheckboxesInput( props: CheckboxesInput.Props ) {

    const {
        name,
        format,
        normalize,
        parse,
        validate,
        warn,
        label,
        options,
        disabled,
        help,
        containerClass,
        inputClass,
        collapseErrorSpace
    } = props

    const baseFieldProps: BaseFieldProps = {
        name,
        format,
        normalize,
        parse,
        validate,
        warn
    }

    const renderCheckboxesInput = ( field: WrappedFieldProps ): JSX.Element => {
        return (
            <Checkboxes label={label}
                help={help} options={options}
                containerClass={containerClass} inputClass={inputClass}
                collapseErrorSpace={collapseErrorSpace}
                disabled={disabled}
                field={field}
            />
        )
    }

    return options && options.length ? (

        <Field {...baseFieldProps} component={renderCheckboxesInput} />

    ) : null
}

export default CheckboxesInput