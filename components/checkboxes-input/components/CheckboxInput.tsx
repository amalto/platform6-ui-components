import * as React from 'react'
import { WrappedFieldProps, WrappedFieldInputProps } from 'redux-form'
import * as uuid from 'uuid'
import * as classNames from 'classnames'

module CheckBoxInput {
    export interface Props {
        inputIdx?: number;
        option: {
            value: string;
            label?: string | JSX.Element;

        };
        inputClass?: string;
        disabled?: boolean;
        handleChange: ( event: any, input: WrappedFieldInputProps ) => void;
        field: WrappedFieldProps;
    }
}

function CheckBoxInput( props: CheckBoxInput.Props ) {

    const { option, disabled, inputClass, inputIdx, handleChange } = props

    const { input } = props.field

    const inputId: string = uuid.v4()

    return (
        <span className={classNames( 'form-checkbox-wrapper', inputClass )} key={inputId}>
            <input
                type="checkbox"
                className="form-checkbox"
                disabled={disabled}
                id={`${ inputId }_${ input.name }_${ inputIdx }`}
                value={option.value}
                onChange={( e ) => handleChange( e, input )}
                checked={input.value.indexOf( option.value ) !== -1} />

            <label className="form-checkbox-label" htmlFor={`${ inputId }_${ input.name }_${ inputIdx }`}>{option.label || option.value}</label>
        </span>
    )
}

export default CheckBoxInput