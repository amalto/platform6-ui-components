// Modules
import * as React from 'react'
import * as uuid from 'uuid'
import { WrappedFieldProps, Field, BaseFieldProps } from 'redux-form'
import * as Radium from 'radium'

// Components
import Help from '@amalto/help'

// Utils
import * as classNames from 'classnames'

// Styles
import { Styles } from './styles'

/**
 * Select Text input used on a [redux-form](#reduxform).
 * It allow you to select an option from a list or type your own text.
 */
namespace SelectTextInput {
    export interface Props extends BaseFieldProps {
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
        /** CSS class applied to every input from the list. */
        inputClass?: string;
        /** Input's type. */
        type?: string;
        /** Input's list. */
        options: {
            leftIcon: string;
            rightIcon: string;
            iconAlignment?: 'center' | 'baseline';
            value: string | number;
            label?: string;
            disabled?: boolean;
        }[];
        /** Step between each number if input is of type <span className='quote'>number</span>. */
        step?: number;
        /**
         * Focus the input after being loaded.
         * @default false
         */
        autofocus?: boolean;
        /**
         * Remove the bottom margin which is the default height of the error message
         * displayed when input is invalid.
         * @default false
         */
        collapseErrorSpace?: boolean;

        selectOpen?: boolean;

        /** Hide props from documentation */

        /** @ignore */
        children?: React.ReactNode;
        /** @ignore */
        key?: React.ReactText;
        /** @ignore */
        ref?: React.Ref<SelectTextInput>;
    }

    export interface State {
        selectOpen?: boolean;
        options?: {
            leftIcon: string;
            rightIcon: string;
            iconAlignment?: 'center' | 'baseline';
            value: string | number;
            label?: string;
            disabled?: boolean;
        }[];
    }
}

class SelectTextInput extends React.Component<SelectTextInput.Props, SelectTextInput.State> {

    constructor( props: SelectTextInput.Props ) {
        super( props )
        this.state = {
            selectOpen: false,
            options: props.options
        }
    }

    private renderText = ( field: WrappedFieldProps ) => {

        const { label, disabled, autofocus, help, containerClass, inputClass, type, step, placeholder, collapseErrorSpace } = this.props

        const { input, meta } = field

        return (
            <div className={classNames( 'form-group', containerClass, {
                'invalid': meta.touched && !!meta.error
            } )}>

                <Radium.Style scopeSelector='.select-text-input' rules={Styles.selectTextInput} />
                <Radium.Style scopeSelector='.select-text-input.btn-prefix' rules={Styles.selectTextInputBtnPreffix} />
                <Radium.Style scopeSelector='.selector' rules={Styles.caret} />
                <Radium.Style scopeSelector='.options-list' rules={Styles['options-list']} />
                <Radium.Style scopeSelector='.option-item' rules={Styles['option-item']} />

                {label ? <label>{label}{help && <Help text={help} />}</label> : null}

                <div className={classNames( 'select-text-input', inputClass )}>
                    <input
                        {...input as any}
                        key={input.name}
                        type={type || 'text'}
                        step={!type || type !== 'number' ? undefined : step}
                        placeholder={placeholder}
                        disabled={disabled}
                        autoFocus={autofocus}
                        className='form-control padr-20'
                    />
                    <i className={classNames( 'selector', {
                        'fas fa-caret-down': !this.state.selectOpen,
                        'fas fa-caret-up': this.state.selectOpen
                    } )} onClick={() => this.toggleSelectList( field )} />
                    {
                        this.state.selectOpen && this.state.options
                            ? <div className='options-list text-medium'>
                                {
                                    this.state.options.map( ( { leftIcon, rightIcon, iconAlignment, value, label } ) => (
                                        <div key={value} className='option-item' onClick={() => this.selectOption( label, field )} >
                                            <div className='flex flex-row' style={{ alignItems: iconAlignment || 'baseline' }}>
                                                {leftIcon ? <i className={`${ leftIcon } mgr-10`} /> : null}
                                                <div className='flex-1'>{label}</div>
                                                {rightIcon ? <i className={`${ rightIcon } mgl-10`} /> : null}
                                            </div>
                                        </div>
                                    ) )
                                }
                            </div>
                            : null
                    }
                </div>

                {( meta.touched && !!meta.error ) ? <p className="validation-error-message">{meta.error}</p> : ( collapseErrorSpace ? null : <p className="validation-error-message">&nbsp;</p> )}

            </div>
        )
    }

    render() {

        const { name, format, normalize, parse, validate, warn } = this.props
        const autocompleteInput = ( value: string ) => {
            this.setState( { options: this.autocompleteOptions( value ) } as SelectTextInput.State )
            return !normalize ? value : normalize( value )
        }

        let baseFieldProps: BaseFieldProps = {
            name,
            format,
            normalize: autocompleteInput,
            parse,
            validate,
            warn
        }

        return <Field {...baseFieldProps} component={this.renderText} />

    }

    private autocompleteOptions = ( value: string ) => {
        const regExp: RegExp = new RegExp( value )

        return this.props.options.filter( o => regExp.test( o.label ) )
    }

    private toggleSelectList = ( field: WrappedFieldProps ): void => {
        const value = field.input.value

        field.input.onChange( uuid.v1() as any, undefined )
        this.setState( { selectOpen: !this.state.selectOpen } as SelectTextInput.State, () => field.input.onChange( value, undefined ) )
    }

    private selectOption = ( value: React.ReactText, field: WrappedFieldProps ): void => {
        this.setState( { selectOpen: false } as SelectTextInput.State, () => field.input.onChange( value as any, undefined ) )
    }

}


export default SelectTextInput