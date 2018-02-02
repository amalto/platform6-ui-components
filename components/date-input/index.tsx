import * as React from 'react'
import * as ReactDOM from 'react-dom'

//modules
import { WrappedFieldProps, Field, BaseFieldProps } from 'redux-form'

//components
import Help from '@amalto/help'
import DatePicker from '@amalto/date-picker'

//utils
import * as classNames from 'classnames'

namespace DateInput {
    export interface Props extends BaseFieldProps {
        /** Input's name used when submitting form. */
        name: string;
        /** Input's label. */
        label?: string | JSX.Element;
        /** Tooltip text displayed when hovering "?" icon. */
        help?: string;
        /** CheckboxInput group CSS class. */
        containerClass?: string;
        /** All dates before this one will be disabled in the date picker. */
        minDate?: string;
        /** All dates after this one will be disabled in the date picker. */
        maxDate?: string;
        /**
         * Will show a mandatory asterisk on the input label. Will disable the "clear selected date" button.
         * Warning: a default value for the date will be required otherwise the input will not be displayed.
         */
        mandatory?: boolean;
    }

    export interface State {

    }
}

class DateInput extends React.Component<DateInput.Props, DateInput.State> {

    constructor( props: DateInput.Props ) {
        super( props )
        this.state = {

        }
    }

    private renderDatePicker = ( field: WrappedFieldProps<any> ) => {

        const { input, meta } = field

        return (
            <DatePicker
                {...this.props}
                defaultValue={input.value}
                handleDateChange={input.onChange as any}
                mandatory={this.props.mandatory}
            />
        )
    }

    render() {

        const { name } = this.props

        return name ? (

            <Field name={name} component={this.renderDatePicker} />

        ) : null

    }

}


export default DateInput