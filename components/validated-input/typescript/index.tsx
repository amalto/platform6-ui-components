import * as React from 'react'

//utils & stores
import { compileWordings } from 'helpers'

//components & models
import Help from './components/Help'

//modules
import * as classNames from 'classnames'

module ValidatedInput {
    export interface Props extends React.Props<ValidatedInput> {
        /** Input name. */
        name: string;
        /** Input value. */
        value: string;
        /** Manage input values and validation state. */
        handleFieldChange: ( fieldValue: string, fieldName: string, isInvalid: boolean ) => void;
        /** If given, ValidatedInput will be a select instead of an input. */
        choices?: {
            value: string;
            label?: string;
        }[];
        /** Regex used to validate the input. */
        regex?: RegExp;
        /** Method to validate input value. */
        validate?: ( fieldValue: string ) => boolean;
        /** Error message to be displayed when an error occured. */
        errorMessage?: string;
        /** If true, don't alow update. */
        disabled?: boolean;
        /** If true, value must be defined and can't be cleared. */
        mandatory?: boolean;
        /** Input label. */
        label?: string | JSX.Element;
        /** If provided, check input when component mount. */
        validateOnLoad?: string;
        /** If provided, check input when props is updated. */
        formSubmitted?: boolean;
        /** Input placeholder. */
        placeholder?: string;
        /** Allow autocomplete on input which allow autocomplete from previews value. */
        autoComplete?: string;
        /** Tooltip help displayed when hovering the "?" icon next to label. */
        help?: string;
        /** Input and label parent class. */
        containerClass?: string;
        /** Input class. */
        inputClass?: string;

        /**
         * Hide props from documentation
         */

        /** @ignore */
        children?: React.ReactNode;
        /** @ignore */
        key?: React.ReactText;
        /** @ignore */
        ref?: React.Ref<ValidatedInput>;
    }

    export interface State {
        invalidInput?: boolean;
    }
}

class ValidatedInput extends React.Component<ValidatedInput.Props, ValidatedInput.State> {

    constructor( props: ValidatedInput.Props ) {
        super( props )
        this.state = {
            invalidInput: false
        }
    }

    render() {

        const { label, help, value, disabled, choices, placeholder, autoComplete, mandatory, errorMessage, containerClass, inputClass } = this.props

        const inputDisplay = this.props.choices ? (
            <select className={classNames( 'form-control', inputClass )}
                name={name}
                value={value}
                onChange={this.handleChange}
                disabled={disabled}>

                {
                    choices.map( ( choice, idx ) => {
                        return <option key={idx} value={choice.value}>{choice.label || choice.value}</option>
                    } )
                }

            </select>
        ) : (
                <input type="text" className={classNames( 'form-control', inputClass )}
                    name={name}
                    value={value}
                    onChange={this.handleChange}
                    disabled={disabled}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                />
            )

        return (

            <div className={classNames( 'form-group', containerClass, {
                'invalid': this.state.invalidInput,
                'mandatory': mandatory
            } )}>

                {label ? <label>{label}{help && <Help text={help} />}</label> : null}

                {inputDisplay}

                {this.state.invalidInput && errorMessage ? <p className="validation-error-message">{errorMessage}</p> : null}

            </div>
        )

    }

    componentDidMount() {
        if ( this.props.validateOnLoad ) {
            this.validateField( this.props.value, this.props )
        }
    }

    componentWillReceiveProps( nextProps: ValidatedInput.Props ) {
        if ( this.props.formSubmitted !== nextProps.formSubmitted && nextProps.formSubmitted === true ) {
            this.validateField( nextProps.value, nextProps )
        }
    }

    private handleChange = ( event: any ) => {
        const inputValue = JSON.parse( JSON.stringify( event.target.value ) )
        this.validateField( inputValue, this.props )
    }

    private validateField = ( value: string, props: ValidatedInput.Props ) => {
        const emptyButMandatory = !value && !!props.mandatory
        const noMatchRegex = props.regex ? !props.regex.test( value ) : false
        const invalid = props.validate ? !props.validate( value ) : false

        if ( !props.disabled ) {
            this.setState( {
                invalidInput: emptyButMandatory || noMatchRegex || invalid
            }, () => {
                props.handleFieldChange( value, props.name, this.state.invalidInput )
            } )
        }
    }

}


export default ValidatedInput