import * as React from 'react'
import { WrappedFieldProps } from 'redux-form'
import * as classNames from 'classnames'

import Help from '@amalto/help'

module Select {
    export interface Props {
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
        field: WrappedFieldProps;
    }
}

function Select( props: Select.Props ) {

    const { label, options, disabled, help, containerClass, inputClass, hideEmptyOption, collapseErrorSpace, field } = props

    const { input, meta } = field

    return (
        <div className={classNames( 'form-group', containerClass, {
            'invalid': meta.touched && !!meta.error
        } )}>
            {label ? <label>{label}{help && <Help text={help} />}</label> : null}

            <select {...input as any}
                className={classNames( 'form-control', inputClass )}
                disabled={disabled}>

                {hideEmptyOption ? null : <option value=""></option>}

                {options.map( ( opt, idx ) => <option key={idx} value={opt.value} disabled={opt.disabled}>{opt.label || opt.value}</option> )}

            </select>

            {( meta.touched && !!meta.error ) ? <p className="validation-error-message">{meta.error}</p> : ( collapseErrorSpace ? null : <p className="validation-error-message">&nbsp;</p> )}
        </div>
    )
}

export default Select