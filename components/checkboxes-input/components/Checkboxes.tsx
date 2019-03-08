import * as React from 'react'
import { WrappedFieldProps, WrappedFieldInputProps } from 'redux-form'
import * as classNames from 'classnames'

// Helpers
import { addValToArrayNoDup, removeValFromArrayNoDup } from '@amalto/helpers'

// Components
import Help from '@amalto/help'
import CheckboxeInput from './CheckboxInput'

module CheckBoxes {
    export interface Props {
        options: {
            value: string;
            label?: string | JSX.Element;
        }[];
        label?: string | JSX.Element;
        help?: string;
        containerClass?: string;
        inputClass?: string;
        collapseErrorSpace?: boolean;
        disabled?: boolean;
        field: WrappedFieldProps;
    }
}

function handleChange( event: any, input: WrappedFieldInputProps ) {

    const selectedValues = input.value ? input.value.filter( ( item: string ) => !!item ) : []

    if ( event.target.checked ) {
        input.onChange( addValToArrayNoDup( selectedValues, event.target.value ) as any, undefined )
    }
    else {
        input.onChange( removeValFromArrayNoDup( selectedValues, event.target.value ) as any, undefined )
    }
}

function CheckBoxes( props: CheckBoxes.Props ) {

    const { options, label, disabled, help, containerClass, inputClass, collapseErrorSpace, field } = props

    const { input, meta } = props.field

    return (
        <div className={classNames( 'form-group', containerClass, {
            'invalid': meta.touched && !!meta.error
        } )}>

            {label ? <label>{label}{help && <Help text={help} />}</label> : null}

            <div className={classNames( 'fieldset', {
                'invalid': meta.touched && !!meta.error
            } )}>
                {
                    options.filter( opt => !!opt.value ).map( ( opt, idx ) => (
                        <CheckboxeInput key={idx}
                            inputIdx={idx}
                            option={opt}
                            inputClass={inputClass}
                            disabled={disabled}
                            handleChange={handleChange}
                            field={field}
                        />
                    ) )
                }
            </div>

            {( meta.touched && !!meta.error ) ? <p className="validation-error-message">{meta.error}</p> : ( collapseErrorSpace ? null : <p className="validation-error-message">&nbsp;</p> )}

            <input type="hidden" {...input as any} />

        </div>
    )
}

export default CheckBoxes