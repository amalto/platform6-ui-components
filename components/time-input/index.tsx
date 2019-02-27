// Modules
import * as React from 'react'
import { WrappedFieldProps, Field, BaseFieldProps } from 'redux-form'
import * as classNames from 'classnames'

// Components
import Help from '@amalto/help'
import TimePicker from '@amalto/time-picker'

// Utils
import { required } from '@amalto/input-validation'

/**
 * Time input used on a [redux-form](#reduxform).
 */
namespace TimeInput {
    export interface Props extends BaseFieldProps {
        /** Input name in the DOM. */
        name: string;
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

        locale: string;

        /** Hide props from documentation */

        /** @ignore */
        children?: React.ReactNode;
        /** @ignore */
        key?: React.ReactText;
        /** @ignore */
        ref?: React.Ref<TimePicker>;

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

    export interface State {
        //saved in state to prevent unnecessary loops eachtime a render occurs
        hoursOptions?: string[];
        minutesOptions?: string[];
    }
}

class TimeInput extends React.Component<TimeInput.Props, TimeInput.State> {

    constructor( props: TimeInput.Props ) {
        super( props )
        this.state = {

        }
    }

    private renderTimeInput = ( field: WrappedFieldProps ) => {

        const { containerClass, mandatory } = this.props
        const { input, meta } = field

        let _containerClass = classNames( containerClass, {
            'invalid': meta.touched && !!meta.error
        } )

        return (
            <TimePicker
                {...this.props}
                containerClass={_containerClass}
                value={input.value}
                handleFieldChange={input.onChange as any}
                mandatory={mandatory}
            />
        )
    }

    render() {

        const { name, mandatory, locale } = this.props

        let additionalProps = mandatory ? {
            validate: value => required( value, locale )
        } as BaseFieldProps : {}

        return name ? (

            <Field name={name} component={this.renderTimeInput} {...additionalProps } />

        ) : null

    }

}


export default TimeInput