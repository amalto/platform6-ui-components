import * as React from 'react'
import * as uuid from 'uuid'
import classNames from 'classnames'
import { WrappedFieldProps } from 'redux-form'

import Help from '@amalto/help'

module Radio {
    export interface Props {
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
        field: WrappedFieldProps;
    }
}

function Radio( props: Radio.Props ) {

    const { label, options, disabled, help, containerClass, inputClass, collapseErrorSpace, field } = props

    const { input, meta } = field

    const inputId: string = uuid.v4()

    return (
        <div className={classNames( 'form-group', containerClass, {
            'invalid': meta.touched && !!meta.error
        } )}>
            {label ? <label>{label}{help && <Help text={help} />}</label> : null}

            {
                options.map( ( opt, idx ) => (
                    <span key={idx} className="form-radio-wrapper right-margin">
                        <input {...input as any}
                            key={input.name}
                            disabled={disabled}
                            type="radio"
                            id={`${ inputId }_${ input.name }_${ idx }`}
                            value={opt.value}
                            className={classNames( 'form-radio', inputClass )}
                            checked={input.value === opt.value} />

                        <label htmlFor={`${ inputId }_${ input.name }_${ idx }`}
                            className="form-radio-label">
                            {opt.label || opt.value}
                        </label>
                    </span>
                ) )
            }

            {( meta.touched && !!meta.error ) ? <p className="validation-error-message">{meta.error}</p> : ( collapseErrorSpace ? null : <p className="validation-error-message">&nbsp;</p> )}
        </div>
    )
}

export default Radio