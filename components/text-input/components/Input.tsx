import * as React from 'react'
import * as uuid from 'uuid'
import * as classNames from 'classnames'

import Help from '@amalto/help'

import { WrappedFieldProps } from 'redux-form'

module Input {
    export interface Props {
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
        field: WrappedFieldProps
    }
}

function Input( props: Input.Props ) {

    const refInput: React.MutableRefObject<HTMLInputElement> = React.useRef( null )

    const {
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
        collapseErrorSpace,
        field
    } = props

    const { input, meta } = field

    // Randomize input value with an uuid v4
    const generateClientSecret = ( field: WrappedFieldProps ) => {
        field.input.onChange( uuid.v1() as any, undefined )
    }

    // Focus input again after chagement in input status
    React.useEffect( () => {
        refInput.current.focus()
    }, [meta.dirty] )

    return (
        <div className={classNames( 'form-group', containerClass, {
            'invalid': meta.touched && !!meta.error
        } )}
            style={containerStyle}>

            {label ? <label>{label}{help && <Help text={help} />}</label> : null}

            <input
                ref={refInput}
                {...input}
                key={input.name}
                type={type || 'text'}
                step={!type || type !== 'number' ? undefined : step}
                placeholder={placeholder}
                disabled={disabled}
                autoFocus={autofocus}
                className={classNames( 'form-control input-block', inputClass, {
                    'btn-prefix': randomGenerator
                } )}
                style={inputStyle} />

            {
                randomGenerator ? (
                    <button type="button" className="btn btn-info input-suffix" onClick={() => generateClientSecret( field )}>
                        <span className="fas fa-random"></span>
                    </button>
                ) : null
            }

            {( meta.touched && !!meta.error ) ? <p className="validation-error-message">{meta.error}</p> : ( collapseErrorSpace ? null : <p className="validation-error-message">&nbsp;</p> )}

        </div>
    )
}

export default Input