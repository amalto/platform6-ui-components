// Modules
import * as React from 'react'
import * as classNames from 'classnames'

// Components
import Help from '@amalto/help'

/**
 * Timepicker with few customizations like a minimum and a maximum time range of time available.
 */
module TimePicker {
    export interface Props {
        /** Input name in the DOM. */
        name: string;
        /** Time value. */
        value: string;
        /** Callback function executed on user input. */
        handleFieldChange: ( fieldValue: string, fieldName: string ) => void;
        /**
         * Whether or not the input is disabled.
         * @default false
         */
        disabled?: boolean;
        /** Input label. */
        label?: string | JSX.Element;
        /** Tooltip help displayed when hovering the <span className='quote'>?</span> icon next to label. */
        help?: string;
        /** 
         * Determined the interval in minute between each option from the select input.
         * @default 30
         */
        minutesInterval?: number;
        /** Minimum hour that can be selected. */
        minHour?: number;
        /** Maximum hour that can be selected. */
        maxHour?: number;
        /** CSS class wrapping the component. */
        containerClass?: string;
        /**
         * Will show a mandatory asterisk on the input label.
         * @default false
         */
        mandatory?: boolean;
    }

    export interface State {
        //saved in state to prevent unnecessary loops eachtime a render occurs
        hoursOptions?: string[];
        minutesOptions?: string[];
    }
}

function pad( num: number | string ): string {
    return ( '00' + num.toString() ).slice( -2 )
}

// Get hours options
function getHoursOptions( minHour: number, maxHour: number ): string[] {
    let _minHour = minHour || 0
    let _maxHour = maxHour ? maxHour : 24

    if ( _maxHour > 24 || _maxHour < _minHour ) {
        _maxHour = 24
    }

    let hoursOptions: string[] = []

    for ( let hours = _minHour; hours < _maxHour; hours += 1 ) {
        hoursOptions.push( pad( hours ) )
    }

    return hoursOptions
}

// Get minutes options
function getMinutesOptions( minutesInterval: number ): string[] {
    const interval = minutesInterval || 30

    let minutesOptions: string[] = []

    for ( let mins = 0; mins < 60; mins += interval ) {
        minutesOptions.push( pad( mins ) )
    }

    return minutesOptions
}

function getUpdatedTime( value: string, hours?: string, minutes?: string ): string {
    const parsedTime = value && value.split( ':' )

    let _hours = parsedTime && parsedTime.length === 2 ? parsedTime[0] : '00'
    let _minutes = parsedTime && parsedTime.length === 2 ? parsedTime[1] : '00'

    if ( hours ) {
        _hours = hours
    }

    if ( minutes ) {
        _minutes = minutes
    }

    return pad( _hours ) + ':' + pad( _minutes )
}

function TimePicker( props: TimePicker.Props ) {
    const { name, value, label, minHour, help, containerClass, disabled, mandatory, handleFieldChange } = props

    const _input: React.MutableRefObject<HTMLInputElement> = React.useRef( null )
    const [hoursOptions, setHoursOptions] = React.useState( getHoursOptions( props.minHour, props.maxHour ) )
    const [minutesOptions, setMinutesOptions] = React.useState( getMinutesOptions( props.minutesInterval ) )

    React.useEffect( () => {
        setHoursOptions( getHoursOptions( props.minHour, props.maxHour ) )
        setMinutesOptions( getMinutesOptions( props.minutesInterval ) )
    }, [props.minutesInterval, props.minHour, props.maxHour] )

    // Set hours
    const handleHoursChange = ( event: React.ChangeEvent<HTMLSelectElement>, value: string, name: string ): void => {
        handleFieldChangeWrapper( getUpdatedTime( value, event.target.value ), name )
    }

    // Set minutes
    const handleMinutesChange = ( event: React.ChangeEvent<HTMLSelectElement>, value: string, name: string ): void => {
        handleFieldChangeWrapper( getUpdatedTime( value, undefined, event.target.value ), name )
    }

    const handleFieldChangeWrapper = ( fieldValue: string, fieldName: string ): void => {
        handleFieldChange( fieldValue, fieldName )
        _input.current.value = fieldValue
    }

    // Render input
    const renderTimeInput = ( value: string, disabled: boolean, minHour: number ): JSX.Element => {
        const parsedTime = value && value.split( ':' )

        const hours = parsedTime && parsedTime.length === 2 ? parsedTime[0] : ( minHour ? this.pad( minHour ) : '00' )
        const minutes = parsedTime && parsedTime.length === 2 ? parsedTime[1] : '00'

        return (
            <div className="combined-inputs">

                <select className="form-control input-left"
                    value={hours}
                    onChange={e => handleHoursChange( e, value, name )}
                    disabled={disabled}>

                    {
                        hoursOptions.map( ( choice, idx ) => {
                            return <option key={idx} value={choice}>{choice}</option>
                        } )
                    }
                </select>

                <span className="form-control input-center" style={{ fontWeight: 'bold' }}>:</span>

                <select className="form-control input-right"
                    value={minutes}
                    onChange={e => handleMinutesChange( e, value, name )}
                    disabled={disabled}>

                    {
                        minutesOptions.map( ( choice, idx ) => {
                            return <option key={idx} value={choice}>{choice}</option>
                        } )
                    }
                </select>

            </div>
        )
    }

    return (
        <div className={classNames( 'form-group', containerClass, {
            'mandatory pos-relative': mandatory
        } )}>

            {label ? <label>{label}{help && <Help text={help} />}</label> : null}

            {renderTimeInput( value, disabled, minHour )}

            <input ref={_input} type="hidden" name={name} value={value} />

        </div>
    )
}


export default TimePicker