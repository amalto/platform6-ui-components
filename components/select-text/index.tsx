// Modules
import * as React from 'react'
import * as ReactDOM from 'react-dom'
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
module SelectText {
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
    }
}

function SelectText( props: SelectText.Props ) {
    const {
        name,
        label,
        help,
        type,
        placeholder,
        disabled,
        autofocus,
        containerClass,
        inputClass,
        options
    } = props

    // Refs
    const _body: React.MutableRefObject<HTMLDivElement> = React.useRef( null )
    const _input: React.MutableRefObject<HTMLInputElement> = React.useRef( null )

    // Initialize state
    const [selectOpen, setSelectOpen] = React.useState( false )
    const [displayLabel, setDisplayLabel] = React.useState( '' )
    const [displayValue, setDisplayValue] = React.useState( '' )
    const [currentLabel, setCurrentLabel] = React.useState( '' )
    const [currentValue, setCurrentValue] = React.useState( '' )
    const [focused, setFocused] = React.useState( null )
    const [lockFocus, setLockFocus] = React.useState( false )
    const [currentOptions, setCurrentOptions] = React.useState( props.options || [] )
    const [hasLeftIcon, setHasLeftIcon] = React.useState( false )
    const [hasRightIcon, setHasRightIcon] = React.useState( false )
    const [shouldReset, setShouldReset] = React.useState( false )
    const [optionOnClick, setOptionOnClick] = React.useState( false )

    // Key pushed handler
    const [downArrowPushed, setDownArrowPushed] = React.useState( false )
    const [upArrowPushed, setUpArrowPushed] = React.useState( false )
    const [enterPushed, setEnterPushed] = React.useState( false )

    // Initialize
    React.useEffect( () => {
        const opt = getOptionFromValue( props.defaultDisplayValue, props.options || [] )

        setDisplayLabel( opt && opt.label || '' )
        setDisplayValue( opt && opt.value ? opt.value.toString() : '' )
        setCurrentLabel( opt && opt.label ? opt.label : '' )
        setCurrentValue( opt && opt.value ? opt.value.toString() : '' )

        loadTooltips( _body.current )
        initializeConfig()

        if ( _input.current ) {
            _input.current.value = displayLabel ? displayLabel.toString() : ''
            setCurrentOptions( autocompleteOptions( _input.current.value, options ) )
        }

        document.addEventListener( 'keydown', handleKeyboardShortcut )

        return () => {
            unloadTooltips( _body.current )
            document.removeEventListener( 'keydown', handleKeyboardShortcut )
        }
    }, [] )

    // Component did update
    React.useEffect( () => {
        loadTooltips( _body.current )

        document.addEventListener( 'keydown', handleKeyboardShortcut )

        if ( !selectOpen && _input.current ) {
            _input.current.value = displayLabel ? displayLabel.toString() : ''
        }

        return () => document.removeEventListener( 'keydown', handleKeyboardShortcut )
    }, [selectOpen] )

    // Initialize configurations
    React.useEffect( () => {
        initializeConfig()
    }, [options] )

    // Scroll to selection
    React.useEffect( () => { scrollToOption( displayValue.toString() ) }, [displayValue] )
    React.useEffect( () => { scrollToOption( currentValue.toString() ) }, [currentValue] )

    // Down arrow event
    React.useEffect( () => {
        if ( downArrowPushed ) {
            const selectedOption: number = options.findIndex( opt =>
                opt.value.toString() === displayValue.toString()
            )
            let nextOption: number = selectedOption

            for ( let i = nextOption; nextOption === selectedOption && i < options.length; ++i ) {
                nextOption = options[i] && !options[i].disabled ? i : nextOption
            }

            setDisplayValue( !!options[nextOption] ? options[nextOption].value.toString() : displayValue )
            setDisplayLabel( !!options[nextOption] ? options[nextOption].label.toString() : displayLabel )
            setDownArrowPushed( false )
        }
    }, [downArrowPushed] )

    // Up arrow event
    React.useEffect( () => {
        if ( upArrowPushed ) {
            const selectedOption: number = options.findIndex( opt =>
                opt.value.toString() === displayValue.toString()
            )
            let prevOption: number = selectedOption

            for ( let i = prevOption; prevOption === selectedOption && i >= 0; --i ) {
                prevOption = options[i] && !options[i].disabled ? i : prevOption
            }

            setDisplayValue( !!options[prevOption] ? options[prevOption].value.toString() : displayValue )
            setDisplayLabel( !!options[prevOption] ? options[prevOption].label.toString() : displayLabel )
            setUpArrowPushed( false )
        }
    }, [upArrowPushed] )

    // Enter arrow event
    React.useEffect( () => {
        if ( enterPushed ) {
            setCurrentValue( displayValue )
            setCurrentLabel( displayLabel )
            selectOption( displayValue, displayLabel )
            setEnterPushed( false )
        }
        return () => {
            unloadTooltips( _body.current )
            document.removeEventListener( 'keydown', handleKeyboardShortcut )
        }
    }, [enterPushed] )

    React.useEffect( () => {
        if ( shouldReset ) {
            setSelectOpen( lockFocus ? selectOpen : false )
            setCurrentOptions( lockFocus ? options : autocompleteOptions( displayLabel.toString(), options ) )
            setFocused( lockFocus ? focused : null )
            setDisplayLabel( currentLabel )
            setDisplayValue( currentValue )
            setLockFocus( false )

            _input.current.blur()

            setShouldReset( false )
        }
    }, [shouldReset] )

    React.useEffect( () => {
        if ( optionOnClick ) {
            setCurrentValue( displayValue )
            setCurrentLabel( displayLabel )
            setOptionOnClick( false )
        }
    }, [optionOnClick] )

    //  Methods

    const initializeConfig = (): void => {
        let newHasLeftIcon: boolean = hasLeftIcon
        let newHasRightIcon: boolean = hasRightIcon

        options.forEach( o => {
            newHasLeftIcon = !o.leftIcon ? hasLeftIcon : true
            newHasRightIcon = !o.rightIcon ? hasRightIcon : true
        } )

        setHasLeftIcon( newHasLeftIcon )
        setHasRightIcon( newHasRightIcon )
    }

    // Display options containing value
    const autocompleteInput = ( value: string ): void => {
        setCurrentOptions( autocompleteOptions( value, options ) )
    }

    // Set current selected option
    const onFocusInput = ( e: React.FocusEvent<HTMLInputElement> ): void => {
        e.stopPropagation()
        _input.current.value = ''

        setFocused( e.currentTarget.id )
        setLockFocus( !!focused )
        setSelectOpen( true )
        setCurrentOptions( autocompleteOptions( '', currentOptions ) )
    }

    // Reset select
    const reset = (): void => {
        setShouldReset( true )
    }

    const onBlur = (): void => {
        if ( focused ) {
            setTimeout( () => { reset() }, 0 )
        }
    }

    // Focus event on wrapper
    const onFocusWrapper = ( e: React.FocusEvent<HTMLDivElement> ): void => {
        e.stopPropagation()
        setFocused( e.currentTarget.id )
        setLockFocus( !!focused )
    }

    // Toggle select list and display options
    const toggleSelectList = (): void => {
        _input.current.value = selectOpen ? displayLabel.toString() : ''
        setSelectOpen( !selectOpen )
        setCurrentOptions( autocompleteOptions( _input.current.value, options ) )
    }

    // Select option and close list
    const selectOption = ( value: string, label: string ): void => {
        _input.current.value = value as string
        _input.current.blur()
        scrollToTop()

        setSelectOpen( false )
        setCurrentValue( value )
        setCurrentLabel( label )
        setFocused( null )
        setLockFocus( false )
        setCurrentOptions( autocompleteOptions( value as string, options ) )

        props.handleOnChange && props.handleOnChange( value )
    }

    const handleKeyboardShortcut = ( event ) => {

        switch ( event.keyCode ) {

            // ESC
            case 27: {

                // Close select text
                reset()
                break
            }

            // Enter
            case 13: {
                setEnterPushed( true )
                break
            }

            // Up arrow
            case 38: {
                setUpArrowPushed( true )
                break
            }

            // Down arrow
            case 40: {
                setDownArrowPushed( true )
                break
            }
            default: { }
        }
    }

    // Scroll to option
    const scrollToOption = ( value: string ) => {
        if ( document.getElementById( `opt-${ value }` ) ) {
            const el = ReactDOM.findDOMNode( document.getElementById( `opt-${ value }` ) ) as HTMLDivElement

            el.scrollIntoView( { behavior: 'smooth', block: 'end' } )
        }
    }

    // Scroll to the item selected.
    const scrollToTop = () => {
        const el = ReactDOM.findDOMNode( document.getElementById( `input-${ props.name }` ) ) as HTMLInputElement

        window.scrollTo( 0, el[0] )

        el.scrollIntoView( { behavior: 'smooth', block: 'end' } )
    }

    const inputDisabled: boolean = disabled || options && options.length === 0

    return (
        <div id={`wrapper-${ name }`} ref={_body} tabIndex={1} className={classNames( 'form-group', containerClass )} style={{ outline: 'none' }} onFocus={onFocusWrapper} onBlur={onBlur}>

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
                    onFocus={onFocusInput}
                    ref={_input}
                    onChange={e => autocompleteInput( e.currentTarget.value.toString() )}
                    type={type || 'text'}
                    placeholder={placeholder}
                    disabled={inputDisabled}
                    autoComplete='off'
                    autoCorrect='off'
                    autoCapitalize='off'
                    autoFocus={autofocus}
                    className={classNames( 'form-control padr-20', inputClass, { 'default-color': disabled } )}
                />
                <i className={classNames( 'selector', {
                    'fas fa-caret-down': !selectOpen,
                    'fas fa-caret-up': selectOpen,
                    'default-color': inputDisabled
                } )} onClick={inputDisabled ? null : () => toggleSelectList()}
                />
                {
                    selectOpen && options
                        ? <div className='options-list text-medium fade in'>
                            {
                                options.map( ( {
                                    leftIcon,
                                    leftIconTooltip,
                                    rightIcon,
                                    rightIconTooltip,
                                    iconAlignment,
                                    value,
                                    label,
                                    disabled
                                } ) => (
                                        <div key={value}
                                            id={`opt-${ value }`}
                                            className={classNames( 'option-item', {
                                                'option-item-selected': currentValue.toString() === value.toString() || displayValue.toString() === value.toString(),
                                                'option-item-disabled': disabled
                                            } )}
                                            onClick={disabled
                                                ? undefined
                                                : () => {
                                                    setDisplayValue( value.toString() )
                                                    setDisplayLabel( label.toString() )
                                                    selectOption( value.toString(), label.toString() )
                                                    setOptionOnClick( true )
                                                }}>
                                            <div className='flex flex-row' style={{ alignItems: iconAlignment || 'baseline' }}>
                                                <i className={`${ leftIcon } mgr-10`}
                                                    style={{ paddingRight: leftIcon || !hasLeftIcon ? 0 : 13 }}
                                                    data-toggle='tooltip'
                                                    data-original-title={leftIconTooltip}
                                                />
                                                <div className='flex-1'
                                                    style={{
                                                        whiteSpace: 'nowrap',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis'
                                                    }}
                                                    data-toggle='tooltip' data-original-title={label}>
                                                    {label}
                                                </div>
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

function getOptionFromValue( value: string | number, options: Option[] ) {
    const opt = options.find( opt => {
        if ( !opt.value || !value ) return null
        else return opt.value.toString() === value.toString()
    } )

    return opt
}

function autocompleteOptions( value: string, options: Option[] ) {
    // Escape special charaters from instance name.
    return options.filter( o => {
        return !value || o.label.toString().toLocaleLowerCase().indexOf( value.toLocaleLowerCase() ) === 0 ? o : null
    } )
}

export default SelectText