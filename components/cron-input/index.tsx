// Modules
import * as React from 'react'
import * as classNames from 'classnames'

// Wordings
import { MULTILANGUAGE_WORDINGS } from '@amalto/wordings'

// Utils
import { compileWordings } from '@amalto/helpers'

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

/**
 * Cron input scheduler used on a [redux-form](https://redux-form.com/6.0.0-rc.1/docs/api/reduxform.md/).
 */
module CronInput {
    export interface Props extends React.Props<CronInput> {
        /** Input's name. */
        name: string;
        /** Date value part. More details on [CronValue](http://localhost:6060/#!/CronValue). */
        value: CronValue;
        /** Cron value onchange event. */
        handleChange: ( fieldValue: CronValue ) => void;
        /** Input's label. */
        label?: string | JSX.Element;
        /** Set input to invalid state and display error message. */
        invalid?: boolean;
        /** Input's CSS class. */
        containerClass?: string;
        /** Check cron value on component mount. */
        forceValidation?: boolean;
        /** Locale used. */
        locale: string;

        /** Hide props from documentation */

        /** @ignore */
        children?: React.ReactNode;
        /** @ignore */
        key?: React.ReactText;
        /** @ignore */
        ref?: React.Ref<CronInput>;
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

class CronInput extends React.Component<CronInput.Props, CronInput.State> {

    constructor( props: CronInput.Props ) {
        super( props )
        this.state = {
            wordings: compileWordings( MULTILANGUAGE_WORDINGS, props.locale )
        }

        $.extend( this.state, props.value )
    }

    render() {

        const { name, invalid, containerClass, forceValidation } = this.props
        const { wordings, enabled, second, minute, hour, dayOfMonth, month, dayOfWeek, year } = this.state

        return (
            <div className={classNames( 'fieldset', containerClass )}>

                {this.props.label ? <label>{this.props.label}</label> : null}

                <div className="cron-input-wrapper clearfix">

                    <div className="cron-input-element">
                        <ValidatedInput
                            label={wordings['croninput.second']}
                            name="second"
                            value={second}
                            handleFieldChange={this.handleFieldChange}
                            help="0-59 / * - ,"
                            validate={( value: string ) => !CRON_VALIDATION.SECOND.test( value )}
                            formSubmitted={forceValidation}
                            disabled={!enabled}
                        />
                    </div>

                    <div className="cron-input-element">
                        <ValidatedInput
                            label={wordings['croninput.minute']}
                            name="minute"
                            value={minute}
                            handleFieldChange={this.handleFieldChange}
                            help="0-59 / * - ,"
                            validate={( value: string ) => !CRON_VALIDATION.MINUTE.test( value )}
                            formSubmitted={forceValidation}
                            disabled={!enabled}
                        />
                    </div>

                    <div className="cron-input-element">
                        <ValidatedInput
                            label={wordings['croninput.hour']}
                            name="hour"
                            value={hour}
                            handleFieldChange={this.handleFieldChange}
                            help="0-23 / * - ,"
                            validate={( value: string ) => !CRON_VALIDATION.HOUR.test( value )}
                            formSubmitted={forceValidation}
                            disabled={!enabled}
                        />
                    </div>

                    <div className="cron-input-element">
                        <ValidatedInput
                            label={wordings['croninput.day.of.month']}
                            name="dayOfMonth"
                            value={dayOfMonth}
                            handleFieldChange={this.handleFieldChange}
                            help="1-31 W L / ? * - ,"
                            validate={( value: string ) => !CRON_VALIDATION.DAY_OF_MONTH.test( value )}
                            formSubmitted={forceValidation}
                            disabled={!enabled}
                        />
                    </div>

                    <div className="cron-input-element">
                        <ValidatedInput
                            label={wordings['croninput.month']}
                            name="month"
                            value={month}
                            handleFieldChange={this.handleFieldChange}
                            help="1-12 JAN-DEC / * - ,"
                            validate={( value: string ) => !CRON_VALIDATION.MONTH.test( value )}
                            formSubmitted={forceValidation}
                            disabled={!enabled}
                        />
                    </div>

                    <div className="cron-input-element">
                        <ValidatedInput
                            label={wordings['croninput.day.of.week']}
                            name="dayOfWeek"
                            value={dayOfWeek}
                            handleFieldChange={this.handleFieldChange}
                            help="1-7 SUN-SAT # L / ? * - ,"
                            validate={( value: string ) => !CRON_VALIDATION.DAY_OF_WEEK.test( value )}
                            formSubmitted={forceValidation}
                            disabled={!enabled}
                        />
                    </div>

                    <div className="cron-input-element">
                        <ValidatedInput
                            label={wordings['croninput.year']}
                            name="year"
                            value={year}
                            handleFieldChange={this.handleFieldChange}
                            help="empty 1970-2099 / * - ,"
                            validate={( value: string ) => !CRON_VALIDATION.YEAR.test( value )}
                            formSubmitted={forceValidation}
                            disabled={!enabled}
                        />
                    </div>

                    <div className="cron-input-element text-center">
                        <label>{wordings['croninput.enabled']}</label>
                        <Switch
                            id={`cron_enabled_control_${ name }`}
                            value={enabled}
                            changeHandler={( value: boolean ) => { this.setState( { enabled: value }, () => { this.props.handleChange( this.getCronValue() ) } ) }}
                        />
                    </div>

                </div>

                {invalid && <p className="validation-error-message">{wordings['croninput.invalid']}</p>}

            </div>
        )
    }

    private handleFieldChange = ( fieldValue: string, fieldName: string, isInvalid: boolean ) => {
        this.setState( {
            [fieldName]: fieldValue
        }, () => {
            this.props.handleChange( this.getCronValue() )
        } )
    }

    private getCronValue = (): CronInput.CronValue => {

        const stateCopy: CronInput.State = JSON.parse( JSON.stringify( this.state ) )

        return {
            enabled: stateCopy.enabled,
            second: stateCopy.second,
            minute: stateCopy.minute,
            hour: stateCopy.hour,
            dayOfMonth: stateCopy.dayOfMonth,
            month: stateCopy.month,
            dayOfWeek: stateCopy.dayOfWeek,
            year: stateCopy.year
        }

    }

}


export default CronInput