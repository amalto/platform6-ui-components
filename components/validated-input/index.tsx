// Modules
import * as React from 'react'
import * as classNames from 'classnames'

// Components
import Help from '@amalto/help'

/**
 * Simple select or input with a validation by regular expression or method check used on a [redux-form](#reduxform).
 */
module ValidatedInput {
    export interface Props {
        /** Input name in the DOM. */
        name: string;
        /** Input value. */
        value: string;
        /** Callback function executed on user input. */
        handleFieldChange: ( fieldValue: string, fieldName: string, isInvalid: boolean ) => void;
        /** If given, ValidatedInput will be a select balise instead of an input balise. */
        choices?: {
            value: string;
            label?: string;
        }[];
        /**
         * Regular expression to validate the user input against.
         * If the user input does not match the regex, it will take an invalid appearance.
         */
        regex?: RegExp;
        /**
         * A callback function to validate the user input against.
         * If the user input (fieldValue) is not valid, this function should return false.
         * It can be used in place or in combination with the regex validation.
         */
        validate?: ( fieldValue: string ) => boolean;
        /** Custom error message displayed when the user input is invalid. */
        errorMessage?: string;
        /**
         * Whether or not the input is disabled.
         * @default false
         */
        disabled?: boolean;
        /**
         * If true, value must be defined and can't be cleared.
         * @default false
         */
        mandatory?: boolean;
        /** Input label. */
        label?: string | JSX.Element;
        /**
         * Forces the input to be validated (regex/mandatory validation) on first load - before the user starts to type anything.
         * @default false
         */
        validateOnLoad?: boolean;
        /**
         * Whether or not the form has been submitted. Will force an input validation if it goes from false to true.
         * @default false
         */
        formSubmitted?: boolean;
        /** Placeholder HTML attribute. */
        placeholder?: string;
        /** Autocomplete HTML attribute. */
        autoComplete?: string;
        /** Tooltip help displayed when hovering the <span className='quote'>?</span> icon next to label. */
        help?: string;
        /** CSS class wrapping the component. */
        containerClass?: string;
        /** Input class. */
        inputClass?: string;
    }
}

function ValidatedInput( props: ValidatedInput.Props ) {

    const { name, label, help, value, disabled, choices, placeholder, autoComplete, mandatory, errorMessage, containerClass, inputClass } = props

    const [invalidInput, setInvalidInput] = React.useState( false )
    const [toggleInvalidInput, setToggleInvalidInput] = React.useState( false )

    /** Component did mount */
    React.useEffect( () => {
        if ( props.validateOnLoad ) { validateField( props.value ) }
    }, [] )

    /** Callback after invalid input has been set */
    React.useEffect( () => {
        if ( toggleInvalidInput ) {
            props.handleFieldChange( value, props.name, invalidInput )
            setToggleInvalidInput( false )
        }
    }, [toggleInvalidInput] )

    /** formSubmitted has been updated */
    React.useEffect( () => {
        if ( props.formSubmitted === true ) { validateField( props.value ) }
    }, [props.formSubmitted] )

    /** Validate input */
    const validateField = ( value: string ) => {
        const emptyButMandatory = !value && !!props.mandatory
        const noMatchRegex = props.regex ? !props.regex.test( value ) : false
        const invalid = props.validate ? !props.validate( value ) : false

        if ( !props.disabled ) {
            setInvalidInput( emptyButMandatory || noMatchRegex || invalid )
            setToggleInvalidInput( true )
        }
    }

    /** onChange event */
    const handleChange = ( event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement> ) => {
        validateField( JSON.parse( JSON.stringify( event.target.value ) ) )
    }

    const inputDisplay = choices ? (
        <select className={classNames( 'form-control', inputClass )}
            key={name}
            name={name}
            value={value}
            onChange={handleChange}
            disabled={disabled}>

            {
                choices.map( ( choice, idx ) => {
                    return <option key={idx} value={choice.value}>{choice.label || choice.value}</option>
                } )
            }

        </select>
    ) : (
            <input type="text" className={classNames( 'form-control', inputClass )}
                key={name}
                name={name}
                defaultValue={value}
                onChange={handleChange}
                disabled={disabled}
                placeholder={placeholder}
                autoComplete={autoComplete}
            />
        )

    return (

        <div className={classNames( 'form-group', containerClass, {
            'invalid': invalidInput,
            'mandatory': mandatory
        } )}>

            {label ? <label>{label}{help && <Help text={help} />}</label> : null}

            {inputDisplay}

            {invalidInput && errorMessage ? <p className="validation-error-message">{errorMessage}</p> : null}

        </div>
    )
}


export default ValidatedInput