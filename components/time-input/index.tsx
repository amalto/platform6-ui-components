import * as React from 'react'
import * as ReactDOM from 'react-dom'

//modules
import { WrappedFieldProps, Field, BaseFieldProps } from 'redux-form'

//components
import Help from '@amalto/help'
import TimePicker from '@amalto/time-picker'

//input validation
import { required } from '@amalto/input-validation'

//utils
import * as classNames from 'classnames'

namespace TimeInput {
    export interface Props extends BaseFieldProps {
        name: string;
        disabled?: boolean;
        label?: string | JSX.Element;
        help?: string;
        minutesInterval?: number;
        minHour?: number;
        maxHour?: number;
        containerClass?: string;
        mandatory?: boolean;
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

    private renderTimeInput = ( field: WrappedFieldProps<any> ) => {

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

        const { name, mandatory } = this.props

        let additionalProps = mandatory ? {
            validate: required
        } as BaseFieldProps : {}

        return name ? (

            <Field name={name} component={this.renderTimeInput} {...additionalProps } />

        ) : null

    }

}


export default TimeInput