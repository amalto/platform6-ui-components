// Modules
import * as React from 'react'
import * as moment from 'moment'
import * as Pikaday from 'pikaday'
import * as classNames from 'classnames'

// Components
import Help from '@amalto/help'

/**
 * Choose a date from a calendar.
 */
module DatePicker {
    export interface DateInputEvent {
        target: {
            value: any;
            name: string;
        }
    }

    export interface Props {
        /** Input name in the DOM. */
        name: string;
        /**
         * Default value of the date picker. Must be readable by [moment](https://momentjs.com).
         * You can put the current value in here, usually stored in the state of the parent component.
         */
        defaultValue: string;
        /**
         * Date <span className='quote'>onChange</span> event. More details on [DateInputEvent](#dateinputevent).
         */
        handleDateChangeEvent?: ( event: DateInputEvent ) => void;
        /** Callback function executed on user input. */
        handleDateChange?: ( date: string ) => void;
        /** All dates before this one will be disabled in the date picker. Must be readable by [moment](https://momentjs.com). */
        minDate?: string;
        /** All dates after this one will be disabled in the date picker. Must be readable by [moment](https://momentjs.com). */
        maxDate?: string;
        /**
         * Will show a mandatory asterisk on the input label. Will disable the <span className='quote'>clear selected date</span> button.
         * Warning: a default value for the date will be required otherwise the input will not be displayed.
         * @default false
         */
        mandatory?: boolean;
        /** Input's label. */
        label?: string | JSX.Element;
        /** Tooltip help displayed when hovering the <span className='quote'>?</span> icon next to label. */
        help?: string;
        /** CSS class wrapping the component. */
        containerClass?: string;

        /** Hide props from documentation */

        /** redux-form props */

        /** @ignore */
        component?: any,
        /** @ignore */
        format?: any,
        /** @ignore */
        normalize?: any,
        /** @ignore */
        props?: any,
        /** @ignore */
        parse?: any,
        /** @ignore */
        validate?: any,
        /** @ignore */
        warn?: any,
        /** @ignore */
        withRef?: any
    }
}

/**
 * Datepicker which display a calendar when being click on.
 * There is a few customizations like a minimum and a maximum date range
 * of date available.
 */

function setUpDatePicker( nameInput: React.MutableRefObject<HTMLDivElement>, props: DatePicker.Props ): Pikaday {
    let config: Pikaday.PikadayOptions = {
        field: nameInput.current,
        format: 'YYYY-MM-DD',
        position: 'bottom left',
        onSelect: function () {

            if ( props.handleDateChange ) {
                props.handleDateChange( picker.toString() )
            }

            if ( props.handleDateChangeEvent ) {
                let event: DatePicker.DateInputEvent = {
                    target: {
                        value: picker.toString(),
                        name: props.name
                    }
                }
                props.handleDateChangeEvent( event )
            }
        }
    }

    if ( props.minDate ) {
        config.minDate = moment( props.minDate ).toDate()
    }

    if ( props.maxDate ) {
        config.maxDate = moment( props.maxDate ).toDate()
    }

    let picker = new Pikaday( config )

    return picker
}

function clearDate( name: string, datePickerInstance: Pikaday, handleDateChangeEvent: ( event: DatePicker.DateInputEvent ) => void, handleDateChange: ( date: string ) => void ) {
    datePickerInstance.setDate( '', true )

    if ( handleDateChange ) { handleDateChange( '' ) }

    if ( handleDateChangeEvent ) {
        let clearEvent: DatePicker.DateInputEvent = { target: { value: '', name } }

        handleDateChangeEvent( clearEvent )
    }
}

function DatePicker( props: DatePicker.Props ) {

    const nameInput = React.useRef( null )
    const [datePickerInstance, setDatePickerInstance] = React.useState( null )

    // Component did mount
    React.useEffect( () => {
        setDatePickerInstance( setUpDatePicker( nameInput, props ) )

        return !!datePickerInstance ? datePickerInstance.destroy() : () => { }
    }, [] )

    // Component did update
    React.useEffect( () => {
        if ( !!datePickerInstance ) {
            if ( props.defaultValue ) {
                datePickerInstance.setDate( moment( props.defaultValue ).format(), true )
            }
            else {
                datePickerInstance.setDate( '', true )
            }
        }
    } )

    let disableClearBtn = true

    if ( datePickerInstance ) {
        if ( props.defaultValue && !props.mandatory ) {
            disableClearBtn = false
        }
    }

    return (
        <div className={classNames( props.containerClass, {
            'form-group': props.mandatory || !!props.label,
            'mandatory pos-relative': props.mandatory
        } )}>

            {props.label ? <label>{props.label}{props.help && <Help text={props.help} />}</label> : null}

            <div style={{ paddingTop: 1, paddingBottom: 1 }} className="input-group input-group-sm">
                <input type="text" className="form-control datepicker" ref={nameInput}
                    readOnly name={props.name}
                />
                <span className="input-group-btn">
                    <button disabled={disableClearBtn || props.mandatory}
                        className="btn btn-default" type="button"
                        onClick={
                            ( _e: React.MouseEvent<HTMLButtonElement, MouseEvent> ) =>
                                clearDate( props.name, datePickerInstance, props.handleDateChangeEvent, props.handleDateChange )
                        }>
                        <span className="fas fa-fw fa-times"></span>
                    </button>
                </span>
            </div>

        </div>
    )
}

export default DatePicker
