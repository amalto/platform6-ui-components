// Modules
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as uuid from 'uuid'
import * as Radium from 'radium'

// Components
import Help from '@amalto/help'
import { loadTooltips, unloadTooltips } from '@amalto/helpers'

// Models
import { Option } from '@amalto/typings'
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
        options: Option[];
        /**
         * Focus the input after being loaded.
         * @default false
         */
        autofocus?: boolean;

        /** Selected value. */
        defaultDisplayValue?: string | number;

        /** Options are visible or not. */
        selectOpen?: boolean;

        /** Handle input changes. */
        handleOnChange?: ( displayValue: string | number ) => void;

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
        displayLabel?: string | number;
        displayValue?: string | number;
        currentLabel?: string | number;
        currentValue?: string | number;
        focused?: string;
        lockFocus?: boolean;
        options?: Option[];
        hasLeftIcon?: boolean;
        hasRightIcon?: boolean;
    }
}

class SelectText extends React.Component<SelectText.Props, SelectText.State> {

    private _input: HTMLInputElement = null

    constructor( props: SelectText.Props ) {
        super( props )

        const opt = this.getOptionFromValue( props.defaultDisplayValue, props.options )

        this.state = {
            selectOpen: false,
            displayLabel: opt && opt.label || '',
            displayValue: opt && opt.value || '',
            currentLabel: opt && opt.label || '',
            currentValue: opt && opt.value || '',
            focused: null,
            lockFocus: false,
            options: props.options,
            hasLeftIcon: false,
            hasRightIcon: false
        }
    }

    componentDidMount() {
        loadTooltips( ReactDOM.findDOMNode( this ) )
        this.initnializeConfig()
        if ( this._input ) {
            this._input.value = this.state.displayLabel.toString() || ''
            this.setState( { options: this.autocompleteOptions( this._input.value ) } as SelectText.State )
        }
    }

    componentDidUpdate( prevProps: SelectText.Props, prevState: SelectText.State ) {
        loadTooltips( ReactDOM.findDOMNode( this ) )
        if ( prevState.selectOpen !== this.state.selectOpen && !this.state.selectOpen && this._input ) {
            this._input.value = this.state.displayLabel.toString()
        }

        if ( prevState.selectOpen !== this.state.selectOpen ) {
            if ( this.state.selectOpen ) document.addEventListener( 'keydown', this.handleKeyboardShortcut )
            else document.removeEventListener( 'keydown', this.handleKeyboardShortcut )
        }

        if ( prevProps.options !== this.props.options ) {
            this.initnializeConfig()
        }
    }

    componentWillUnmount() {
        unloadTooltips( ReactDOM.findDOMNode( this ) )
        document.removeEventListener( 'keydown', this.handleKeyboardShortcut )
    }

    render() {

        const { name, label, help, type, placeholder, disabled, autofocus, containerClass, inputClass } = this.props

        const { hasLeftIcon, hasRightIcon } = this.state

        const autocompleteInput = ( value: string ) => {
            this.setState( { options: this.autocompleteOptions( value ) } as SelectText.State )
        }

        const inputDisabled: boolean = disabled || this.props.options.length === 0

        return (
            <div id={`wrapper-${ name }`} tabIndex={1} className={classNames( 'form-group', containerClass )} style={{ outline: 'none' }} onFocus={this.onFocusWrapper} onBlur={this.onBlur}>

                <Radium.Style scopeSelector='.select-text-input' rules={Styles.selectTextInput} />
                <Radium.Style scopeSelector='.select-text-input.btn-prefix' rules={Styles.selectTextInputBtnPreffix} />
                <Radium.Style scopeSelector='.selector' rules={Styles.caret} />
                <Radium.Style scopeSelector='.options-list' rules={Styles['options-list']} />
                <Radium.Style scopeSelector='.option-item' rules={Styles['option-item']} />
                <Radium.Style scopeSelector='.option-item-selected' rules={Styles['option-item-selected']} />
                <Radium.Style scopeSelector='.option-item-disabled' rules={Styles['option-item-disabled']} />

                {label ? <label>{label}{help && <Help text={help} />}</label> : null}

                <div className='select-text-input'>
                    <input id={`input-${ name }`}
                        name={name}
                        onFocus={this.onFocusInput}
                        ref={dom => this._input = dom}
                        onChange={e => autocompleteInput( e.currentTarget.value.toString() )}
                        type={type || 'text'}
                        placeholder={placeholder}
                        disabled={inputDisabled}
                        autoComplete='off'
                        autoFocus={autofocus}
                        className={classNames( 'form-control padr-20', inputClass, { 'default-color': disabled } )}
                    />
                    <i className={classNames( 'selector', {
                        'fas fa-caret-down': !this.state.selectOpen,
                        'fas fa-caret-up': this.state.selectOpen,
                        'default-color': inputDisabled
                    } )} onClick={inputDisabled ? null : () => this.toggleSelectList()}
                    />
                    {
                        this.state.selectOpen && this.state.options
                            ? <div className='options-list text-medium fade in'>
                                {
                                    this.state.options.map( ( { leftIcon, leftIconTooltip, rightIcon, rightIconTooltip, iconAlignment, value, label, disabled } ) => (
                                        <div key={value}
                                            id={`opt-${ value }`}
                                            className={classNames( 'option-item', {
                                                'option-item-selected': this.state.displayValue.toString() === value.toString(),
                                                'option-item-disabled': disabled
                                            } )}
                                            onClick={disabled ? null : () => this.selectOption( value.toString(), label.toString() )}>
                                            <div className='flex flex-row' style={{ alignItems: iconAlignment || 'baseline' }}>
                                                <i className={`${ leftIcon } mgr-10`}
                                                    style={{ paddingRight: leftIcon || !hasLeftIcon ? 0 : 13 }}
                                                    data-toggle='tooltip'
                                                    data-original-title={leftIconTooltip}
                                                />
                                                <div className='flex-1' style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} data-toggle='tooltip' data-original-title={label}>{label}</div>
                                                <i className={`${ rightIcon } mgl-10`}
                                                    style={{ paddingLeft: rightIcon || !hasRightIcon ? 0 : 13 }}
                                                    data-toggle='tooltip'
                                                    data-original-title={rightIconTooltip}
                                                />
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

    private onFocusWrapper = ( e ): void => {
        e.stopPropagation()
        this.setState( {
            focused: e.currentTarget.id,
            lockFocus: !!this.state.focused
        } )
    }

    private onFocusInput = ( e ): void => {
        e.stopPropagation()
        this._input.value = ''
        this.setState( {
            focused: e.currentTarget.id,
            lockFocus: !!this.state.focused,
            selectOpen: true,
            options: this.autocompleteOptions( '' )
        } )
    }

    private onBlur = ( e ): void => {
        if ( this.state.focused ) {
            setTimeout( () => {
                this.reset()
            }, 0 )
        }
    }

    private reset = () => {
        this.setState( {
            selectOpen: this.state.lockFocus ? this.state.selectOpen : false,
            options: this.state.lockFocus ? this.state.options : this.autocompleteOptions( this.state.displayLabel.toString() ),
            focused: this.state.lockFocus ? this.state.focused : null,
            displayLabel: this.state.currentLabel,
            displayValue: this.state.currentValue,
            lockFocus: false
        } as SelectText.State, () => this._input.blur() )
    }

    private autocompleteOptions = ( value: string ) => {
        const escapedValue: string = value.replace( /[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&' )
        const regExp: RegExp = new RegExp( `^${ escapedValue }` )

        // Escape special charaters from instance name.
        return this.props.options.filter( o => !value || regExp.test( o.label ) )
    }

    private toggleSelectList = (): void => {
        this._input.value = this.state.selectOpen ? this.state.displayLabel.toString() : ''
        this.setState( {
            selectOpen: !this.state.selectOpen,
            options: this.autocompleteOptions( this._input.value )
        } as SelectText.State )
    }

    private selectOption = ( value: string, label: string ): void => {
        this._input.value = value as string
        this._input.blur()
        this.scrollToTop()

        this.setState( {
            selectOpen: false,
            displayValue: value,
            displayLabel: label,
            currentValue: value,
            currentLabel: label,
            focused: null,
            lockFocus: false,
            options: this.autocompleteOptions( value as string )
        } as SelectText.State, () => this.props.handleOnChange && this.props.handleOnChange( this.state.displayValue ) )
    }

    private initnializeConfig = (): void => {
        let hasLeftIcon: boolean = this.state.hasLeftIcon
        let hasRightIcon: boolean = this.state.hasRightIcon

        this.state.options.forEach( o => {
            hasLeftIcon = !o.leftIcon ? hasLeftIcon : true
            hasRightIcon = !o.rightIcon ? hasRightIcon : true
        } )

        this.setState( { hasLeftIcon, hasRightIcon } )
    }

    private handleKeyboardShortcut = ( event ) => {

        switch ( event.keyCode ) {

            // ESC
            case 27: {

                // Close select text
                this.reset()
                break
            }

            // Enter
            case 13: {

                // Select option
                this.selectOption( this.state.displayValue.toString(), this.state.displayLabel.toString() )
                break
            }

            // Up arrow
            case 38: {
                const { options, displayValue, displayLabel } = this.state
                const selectedOption: number = options.findIndex( opt => opt.value.toString() === displayValue.toString() )
                let prevOption: number = selectedOption

                for ( let i = prevOption; prevOption === selectedOption && i > 0; --i ) {
                    prevOption = !options[i].disabled ? i : prevOption
                }

                this.setState( {
                    displayValue: options[prevOption].value.toString(),
                    displayLabel: options[prevOption].label.toString()
                }, () => this.scrollToOption( this.state.displayValue.toString() ) )
                break
            }

            // Down arrow
            case 40: {
                const { options, displayValue, displayLabel } = this.state
                const selectedOption: number = options.findIndex( opt => opt.value.toString() === displayValue.toString() )
                let nextOption: number = selectedOption

                for ( let i = nextOption; nextOption === selectedOption && i < options.length; ++i ) {
                    nextOption = !options[i].disabled ? i : nextOption
                }

                this.setState( {
                    displayValue: options[nextOption].value.toString(),
                    displayLabel: options[nextOption].label.toString()
                }, () => this.scrollToOption( this.state.displayValue.toString() ) )
                break
            }
            default: { }
        }
    }

    private scrollToTop = () => {
        const el = ReactDOM.findDOMNode( document.getElementById( `input-${ this.props.name }` ) )

        el.scrollIntoView( { behavior: 'smooth', block: 'center' } )
    }

    private scrollToOption = ( value: string ) => {
        const el = ReactDOM.findDOMNode( document.getElementById( `opt-${ value }` ) )

        el.scrollIntoView( { behavior: 'smooth', block: 'center' } )
    }

    private getOptionFromValue = ( value: string | number, options: Option[] ) => {
        const opt = options.find( opt => opt.value.toString() === value.toString() )

        return opt
    }

}


export default SelectText