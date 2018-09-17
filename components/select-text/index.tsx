// Modules
import * as React from 'react'
import * as uuid from 'uuid'
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
namespace SelectText {
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
        /** CSS class applied to every input from the list. */
        inputClass?: string;
        /** Input's type. */
        type?: string;
        /** Input's list. */
        options: {
            leftIcon?: string;
            rightIcon?: string;
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

        /** Selected value. */
        defaultDisplayValue?: string;

        /** Options are visible or not. */
        selectOpen?: boolean;

        /** Handle input changes. */
        handleOnChange?: ( displayValue: string ) => void;

        /** Hide props from documentation */

        /** @ignore */
        children?: React.ReactNode;
        /** @ignore */
        key?: React.ReactText;
        /** @ignore */
        ref?: React.Ref<SelectText>;
    }

    export interface State {
        selectOpen?: boolean;
        displayValue?: string;
        options?: {
            leftIcon?: string;
            rightIcon?: string;
            iconAlignment?: 'center' | 'baseline';
            value: string | number;
            label?: string;
            disabled?: boolean;
        }[];
    }
}

class SelectText extends React.Component<SelectText.Props, SelectText.State> {

    private _input: HTMLInputElement = null

    constructor( props: SelectText.Props ) {
        super( props )
        this.state = {
            selectOpen: false,
            displayValue: props.defaultDisplayValue || '',
            options: props.options
        }
    }

    componentDidMount() {
        if ( this._input ) {
            this._input.value = this.props.defaultDisplayValue || ''
        }
    }

    componentDidUpdate( prevProps: SelectText.Props, prevState: SelectText.State ) {
        if ( prevState.selectOpen !== this.state.selectOpen && !this.state.selectOpen && this._input ) {
            this._input.value = this.state.displayValue
        }
    }

    render() {

        const { name, label, help, type, step, placeholder, disabled, autofocus, containerClass, inputClass } = this.props

        const autocompleteInput = ( value: string ) => {
            this.setState( { options: this.autocompleteOptions( value ) } as SelectText.State )
        }

        return (
            <div className={classNames( 'form-group', containerClass )}>

                <Radium.Style scopeSelector='.select-text-input' rules={Styles.selectTextInput} />
                <Radium.Style scopeSelector='.select-text-input.btn-prefix' rules={Styles.selectTextInputBtnPreffix} />
                <Radium.Style scopeSelector='.selector' rules={Styles.caret} />
                <Radium.Style scopeSelector='.options-list' rules={Styles['options-list']} />
                <Radium.Style scopeSelector='.option-item' rules={Styles['option-item']} />
                <Radium.Style scopeSelector='.option-item-selected' rules={Styles['option-item-selected']} />
                <Radium.Style scopeSelector='.option-item-disabled' rules={Styles['option-item-disabled']} />

                {label ? <label>{label}{help && <Help text={help} />}</label> : null}

                <div className={classNames( 'select-text-input', inputClass )}>
                    <input name={name}
                        ref={dom => this._input = dom}
                        onChange={e => autocompleteInput( e.currentTarget.value )}
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
                    } )} onClick={() => this.toggleSelectList()} />
                    {
                        this.state.selectOpen && this.state.options
                            ? <div className='options-list text-medium'>
                                {
                                    this.state.options.map( ( { leftIcon, rightIcon, iconAlignment, value, label, disabled } ) => (
                                        <div key={value} className={classNames( 'option-item', {
                                            'option-item-selected': this.state.displayValue === label,
                                            'option-item-disabled': disabled
                                        } )} onClick={() => this.selectOption( label )}>
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

            </div>
        )

    }

    private autocompleteOptions = ( value: string ) => {
        const regExp: RegExp = new RegExp( value )

        return this.props.options.filter( o => regExp.test( o.label ) )
    }

    private toggleSelectList = (): void => {
        this.setState( { selectOpen: !this.state.selectOpen } as SelectText.State )
    }

    private selectOption = ( value: React.ReactText ): void => {
        this._input.value = value as string

        this.setState( {
            selectOpen: false,
            displayValue: value,
            options: this.autocompleteOptions( value as string )
        } as SelectText.State, () => this.props.handleOnChange && this.props.handleOnChange( this.state.displayValue ) )
    }

}


export default SelectText