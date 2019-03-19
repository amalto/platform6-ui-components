// Modules
import * as React from 'react'
import { WrappedFieldProps, Field, BaseFieldProps } from 'redux-form'
import * as classNames from 'classnames'

// Components
import Help from '@amalto/help'
import Select from './components/Select'

/**
 * Select input used on a [redux-form](#reduxform).
 */
module SelectInput {
    export interface Props extends BaseFieldProps {
        /** Input's name used when submitting form. */
        name: string;
        /** Input's label. */
        label: string | JSX.Element;
        /** Input's list. */
        options: {
            value: string | number;
            label?: string;
            disabled?: boolean;
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
         * If set to true, it removes the empty option (option without label and value is an empty string) from the select dropdown.
         * @default false
         */
        hideEmptyOption?: boolean;
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

    export interface State {

    }
}

function SelectInput( props: SelectInput.Props ) {
    const { options, name, disabled, format, hideEmptyOption, collapseErrorSpace, normalize, parse, validate, warn, containerClass, help, label, inputClass } = props

    let baseFieldProps: BaseFieldProps = {
        name,
        format,
        normalize,
        parse,
        validate,
        warn
    }

    const renderSelect = ( field: WrappedFieldProps ) => {
        const selectProps: Select.Props = {
            name,
            label,
            options,
            disabled,
            help,
            containerClass,
            inputClass,
            hideEmptyOption,
            collapseErrorSpace,
            field
        }

        return <Select {...selectProps} />
    }

    return options && options.length ? (
        <Field {...baseFieldProps} component={renderSelect} />
    ) : (
            <div className={classNames( 'form-group', containerClass )}>
                {label ? <label>{label}{help && <Help text={help} />}</label> : null}
                <select className={classNames( 'form-control', inputClass )}
                    disabled={true}>
                </select>
            </div>
        )
}

export default SelectInput