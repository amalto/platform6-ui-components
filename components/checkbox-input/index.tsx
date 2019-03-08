// Modules
import * as React from 'react'
import { WrappedFieldProps, Field, BaseFieldProps } from 'redux-form'
// import * as classNames from 'classnames'
// import * as uuid from 'uuid'

// Components
// import Help from '@amalto/help'
import CheckBox from './components/CheckBox'

/**
 * Checkbox input used on a [redux-form](#reduxform).
 */
namespace CheckboxInput {
    export interface Props extends BaseFieldProps {
        /** Input's name used when submitting form. */
        name: string;
        /** Input's label. */
        label: string | JSX.Element;
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

function CheckboxInput( props: CheckboxInput.Props ) {
    const {
        name,
        label,
        help,
        containerClass,
        inputClass,
        collapseErrorSpace,
        disabled,
        format,
        normalize,
        parse,
        validate,
        warn
    } = props

    let baseFieldProps: BaseFieldProps = {
        name,
        format,
        normalize,
        parse,
        validate,
        warn
    }

    const renderCheckboxInput = ( field: WrappedFieldProps ): JSX.Element => {
        return (
            <CheckBox label={label}
                help={help}
                containerClass={containerClass} inputClass={inputClass}
                collapseErrorSpace={collapseErrorSpace} disabled={disabled}
                field={field}
            />
        )
    }

    return label ? (

        <Field {...baseFieldProps} component={renderCheckboxInput} />

    ) : null
}


export default CheckboxInput