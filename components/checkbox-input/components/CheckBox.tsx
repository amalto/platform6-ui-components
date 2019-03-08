import * as React from 'react'
import { WrappedFieldProps } from 'redux-form'
import * as uuid from 'uuid'
import * as classNames from 'classnames'

// Components
import Help from '@amalto/help'

module CheckBox {
    export interface Props {
        label?: string | JSX.Element;
        help?: string;
        containerClass?: string;
        inputClass?: string;
        collapseErrorSpace?: boolean;
        disabled?: boolean;
        field: WrappedFieldProps;
    }
}

function CheckBox( props: CheckBox.Props ) {

    const { label, disabled, help, containerClass, inputClass, collapseErrorSpace } = props

    const { input, meta } = props.field

    const inputId: string = uuid.v4()

    return (
        <div className={classNames( 'form-group', containerClass, {
            'invalid': meta.touched && !!meta.error
        } )}>

            <span className={classNames( 'form-checkbox-wrapper', inputClass )}>
                <input {...input as any}
                    key={input.name}
                    type="checkbox"
                    disabled={disabled}
                    id={`${ inputId }_${ input.name }`}
                    className="form-checkbox"
                    checked={input.value} />

                <label className="form-checkbox-label" htmlFor={`${ inputId }_${ input.name }`}>{label}</label>

                {help && <Help text={help} containerClass='pos-absolute' />}
            </span>

            {( meta.touched && !!meta.error ) ? <p className="validation-error-message">{meta.error}</p> : ( collapseErrorSpace ? null : <p className="validation-error-message">&nbsp;</p> )}

        </div>
    )
}

export default CheckBox