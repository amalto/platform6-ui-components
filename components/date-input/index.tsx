// Modules
import * as React from 'react';
import { WrappedFieldProps, Field, BaseFieldProps } from 'redux-form';

// Components
import DatePicker from '@amalto/date-picker';

/**
 * Date input used on a [redux-form](#reduxform).
 */
namespace DateInput {
  export interface Props extends BaseFieldProps {
    /** Input's name used when submitting form. */
    name: string;
    /** Input's label. */
    label?: string | JSX.Element;
    /** Tooltip text displayed when hovering <span className='quote'>?</span> icon. */
    help?: string;
    /** CSS class wrapping the component. */
    containerClass?: string;
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

    /** Hide props from documentation */

    /** @ignore */
    children?: React.ReactNode;
    /** @ignore */
    key?: React.ReactText;
    /** @ignore */
    ref?: React.Ref<any>;

    /** redux-form props */

    /** @ignore */
    component?: any;
    /** @ignore */
    format?: any;
    /** @ignore */
    normalize?: any;
    /** @ignore */
    props?: any;
    /** @ignore */
    parse?: any;
    /** @ignore */
    validate?: any;
    /** @ignore */
    warn?: any;
    /** @ignore */
    withRef?: any;
  }

  export interface State {}
}

class DateInput extends React.Component<DateInput.Props, DateInput.State> {
  constructor(props: DateInput.Props) {
    super(props);
    this.state = {};
  }

  private renderDatePicker = (field: WrappedFieldProps<any>) => {
    const { input } = field;

    return (
      <DatePicker
        {...this.props}
        defaultValue={input.value}
        handleDateChange={input.onChange as any}
        mandatory={this.props.mandatory}
      />
    );
  };

  render() {
    const { name } = this.props;

    return name ? (
      <Field name={name} component={this.renderDatePicker} />
    ) : null;
  }
}

export default DateInput;
