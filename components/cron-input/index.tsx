// Modules
import * as React from 'react'
import * as classNames from 'classnames'

// Utils
import { getWordings } from '@amalto/helpers'

// Components
import Switch from '@amalto/switch'
import ValidatedInput from '@amalto/validated-input'

// Constants
export const CRON_VALIDATION = {
    SECOND: /[^0-9\,\-\*\/]/,
    MINUTE: /[^0-9\,\-\*\/]/,
    HOUR: /[^0-9\,\-\*\/]/,
    DAY_OF_MONTH: /[^0-9WL\,\-\*\/\?]/,
    MONTH: /[^0-9\,\-\*\/JANFEBMRPRYJUNLGOCTVD]/,
    DAY_OF_WEEK: /[^1-7\,\-\*\/\?#SUNMOTEWDHFRIAL]/,
    YEAR: /[^\,\-\*\/0-9]/
}

export const DEFAULT_VALUE = '*'

/**
 * Cron input scheduler used on a [redux-form](#reduxform).
 * 
 * CronInput uses [WebStorage](#webstorage)'s properties which are accessible at the root component of your service.
 */
module CronInput {
    export interface Props {
        /** Input's name. */
        name: string;
        /** Date value part. More details on [CronValue](#cronvalue). */
        value: CronValue;
        /** Cron value <span className='quote'>onChange</span> event. */
        handleChange: ( fieldValue: CronValue ) => void;
        /** Input's label. */
        label?: string | JSX.Element;
        /**
         * Set input to invalid state and display error message.
         * @default false
         */
        invalid?: boolean;
        /** CSS class wrapping the component. */
        containerClass?: string;
        /** Check cron value on component mount. */
        forceValidation?: boolean;
        /**
         * Language to use on the component. e.g: <span className='quote'>en-US</span>.
         * Locales available at [Locale](#locale).
         * Accessible via [WebStorage](#webstorage).
         */
        locale: string;
    }

    export interface State {

        wordings?: { [id: string]: string };
        enabled?: boolean;
        second?: string;
        minute?: string;
        hour?: string;
        dayOfMonth?: string;
        month?: string;
        dayOfWeek?: string;
        year?: string;
    }

    export interface CronValue {
        enabled?: boolean;
        second?: string;
        minute?: string;
        hour?: string;
        dayOfMonth?: string;
        month?: string;
        dayOfWeek?: string;
        year?: string;
    }
}

function CronInput( props: CronInput.Props ) {
    const { name, invalid, containerClass, forceValidation } = props

    const [wordings, setWordings] = React.useState( {} as any )
    const [value, setValue] = React.useState( {
        enabled: true
    } as CronInput.CronValue )

    const { enabled, second, minute, hour, dayOfMonth, month, dayOfWeek, year } = value

    const handleFieldChange = ( fieldValue: string | boolean, fieldName: string ) => {
        setValue( $.extend( {}, value, { [fieldName]: fieldValue } ) as CronInput.CronValue )
    }

    // Initialize cron input value
    React.useEffect( () => {
        setValue( $.extend( {
            second: DEFAULT_VALUE,
            minute: DEFAULT_VALUE,
            hour: DEFAULT_VALUE,
            dayOfMonth: DEFAULT_VALUE,
            month: DEFAULT_VALUE,
            dayOfWeek: DEFAULT_VALUE,
            year: DEFAULT_VALUE
        }, props.value ) )
    }, [] )

    // Set wordings
    React.useEffect( () => {
        setWordings( getWordings( {}, props.locale ) )
    }, [props.locale] )

    // Trigger props handleChanged method only when value has been updated
    React.useCallback( () => {
        props.handleChange( value )
    }, [value] )

    return (
        <div className={classNames( 'fieldset', containerClass )}>

            {props.label ? <label>{props.label}</label> : null}

            <div className="cron-input-wrapper clearfix">

                <div className="cron-input-element">
                    <ValidatedInput
                        label={wordings.second}
                        name="second"
                        value={second}
                        handleFieldChange={handleFieldChange}
                        help="0-59 / * - ,"
                        validate={( newSecond: string ) => !CRON_VALIDATION.SECOND.test( newSecond )}
                        formSubmitted={forceValidation}
                        disabled={!enabled}
                    />
                </div>

                <div className="cron-input-element">
                    <ValidatedInput
                        label={wordings.minute}
                        name="minute"
                        value={minute}
                        handleFieldChange={handleFieldChange}
                        help="0-59 / * - ,"
                        validate={( newMinute: string ) => !CRON_VALIDATION.MINUTE.test( newMinute )}
                        formSubmitted={forceValidation}
                        disabled={!enabled}
                    />
                </div>

                <div className="cron-input-element">
                    <ValidatedInput
                        label={wordings.hour}
                        name="hour"
                        value={hour}
                        handleFieldChange={handleFieldChange}
                        help="0-23 / * - ,"
                        validate={( newHour: string ) => !CRON_VALIDATION.HOUR.test( newHour )}
                        formSubmitted={forceValidation}
                        disabled={!enabled}
                    />
                </div>

                <div className="cron-input-element">
                    <ValidatedInput
                        label={wordings.dayOfMonth}
                        name="dayOfMonth"
                        value={dayOfMonth}
                        handleFieldChange={handleFieldChange}
                        help="1-31 W L / ? * - ,"
                        validate={( newDayOfMonth: string ) => !CRON_VALIDATION.DAY_OF_MONTH.test( newDayOfMonth )}
                        formSubmitted={forceValidation}
                        disabled={!enabled}
                    />
                </div>

                <div className="cron-input-element">
                    <ValidatedInput
                        label={wordings.month}
                        name="month"
                        value={month}
                        handleFieldChange={handleFieldChange}
                        help="1-12 JAN-DEC / * - ,"
                        validate={( newMonth: string ) => !CRON_VALIDATION.MONTH.test( newMonth )}
                        formSubmitted={forceValidation}
                        disabled={!enabled}
                    />
                </div>

                <div className="cron-input-element">
                    <ValidatedInput
                        label={wordings.dayOfWeek}
                        name="dayOfWeek"
                        value={dayOfWeek}
                        handleFieldChange={handleFieldChange}
                        help="1-7 SUN-SAT # L / ? * - ,"
                        validate={( newDayOfWeek: string ) => !CRON_VALIDATION.DAY_OF_WEEK.test( newDayOfWeek )}
                        formSubmitted={forceValidation}
                        disabled={!enabled}
                    />
                </div>

                <div className="cron-input-element">
                    <ValidatedInput
                        label={wordings.year}
                        name="year"
                        value={year}
                        handleFieldChange={handleFieldChange}
                        help="empty 1970-2099 / * - ,"
                        validate={( newYear: string ) => !CRON_VALIDATION.YEAR.test( newYear )}
                        formSubmitted={forceValidation}
                        disabled={!enabled}
                    />
                </div>

                <div className="cron-input-element text-center">
                    <label>{wordings.enabled}</label>
                    <Switch
                        id={`cron_enabled_control_${ name }`}
                        value={enabled}
                        changeHandler={( isEnabled: boolean ) => { handleFieldChange( isEnabled, 'enabled' ) }}
                    />
                </div>

            </div>

            {invalid && <p className="validation-error-message">{wordings.inputInvalid}</p>}

        </div>
    )
}

export default CronInput