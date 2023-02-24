// Modules
import * as React from 'react';
import { default as moment } from 'moment';
import { default as Pikaday } from 'pikaday';
import { default as classNames } from 'classnames';

// Components
import Help from '@amalto/help';

/**
 * Choose a date from a calendar.
 */
module DatePicker {
  export interface DateInputEvent {
    target: {
      value: any;
      name: string;
    };
  }

  export interface Props extends React.ClassAttributes<DatePicker> {
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
    handleDateChangeEvent?: (event: DateInputEvent) => void;
    /** Callback function executed on user input. */
    handleDateChange?: (date: string) => void;
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

    /** @ignore */
    children?: React.ReactNode;
    /** @ignore */
    key?: React.ReactText;
    /** @ignore */
    ref?: React.Ref<DatePicker>;

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

  export interface State {
    datePickerInstance?: Pikaday;
  }
}

/**
 * Datepicker which display a calendar when being click on.
 * There is a few customizations like a minimum and a maximum date range
 * of date available.
 */
class DatePicker extends React.Component<DatePicker.Props, DatePicker.State> {
  private _nameInput = (HTMLInputElement = null);

  constructor(props: DatePicker.Props) {
    super(props);
    this.state = {
      datePickerInstance: null,
    };
  }

  render() {
    // if ( this.props.mandatory && !this.props.defaultValue ) {
    //     console.error( 'Mandatory DatePicker must have a defaultValue property (YYYY-MM-DD formatted string)' )
    //     return null
    // }

    let disableClearBtn = true;
    if (this.state.datePickerInstance) {
      let picker = this.state.datePickerInstance;
      if (this.props.defaultValue && !this.props.mandatory) {
        disableClearBtn = false;
      }
    }

    return (
      <div
        className={classNames(this.props.containerClass, {
          'form-group': this.props.mandatory || !!this.props.label,
          'mandatory pos-relative': this.props.mandatory,
        })}
      >
        {this.props.label ? (
          <label>
            {this.props.label}
            {this.props.help && <Help text={this.props.help} />}
          </label>
        ) : null}

        <div
          style={{ paddingTop: 1, paddingBottom: 1 }}
          className="input-group input-group-sm"
        >
          <input
            type="text"
            className="form-control datepicker"
            ref={(dom) => (this._nameInput = dom)}
            readOnly
            name={this.props.name}
          />
          <span className="input-group-btn">
            <button
              disabled={disableClearBtn || this.props.mandatory}
              className="btn btn-default"
              type="button"
              onClick={this.clearDate}
            >
              <span className="fas fa-fw fa-times"></span>
            </button>
          </span>
        </div>
      </div>
    );
  }

  componentDidMount() {
    let picker = this.setUpDatePicker();

    this.setState({
      datePickerInstance: picker,
    });
  }

  componentDidUpdate() {
    if (this.state.datePickerInstance) {
      let picker = this.state.datePickerInstance;

      if (this.props.defaultValue) {
        picker.setDate(moment(this.props.defaultValue).format(), true);
      } else {
        picker.setDate('', true);
      }
    }
  }

  componentWillUnmount() {
    if (this.state.datePickerInstance) {
      this.state.datePickerInstance.destroy();
    }
  }

  private setUpDatePicker = (): Pikaday => {
    let el = this._nameInput;

    let component = this;

    let config: Pikaday.PikadayOptions = {
      field: el,
      format: 'YYYY-MM-DD',
      position: 'bottom left',
      onSelect: function () {
        if (component.props.handleDateChange) {
          component.props.handleDateChange(picker.toString());
        }

        if (component.props.handleDateChangeEvent) {
          let event: DatePicker.DateInputEvent = {
            target: {
              value: picker.toString(),
              name: component.props.name,
            },
          };
          component.props.handleDateChangeEvent(event);
        }
      },
    };

    if (component.props.minDate) {
      config.minDate = moment(component.props.minDate).toDate();
    }

    if (component.props.maxDate) {
      config.maxDate = moment(component.props.maxDate).toDate();
    }

    let picker = new Pikaday(config);

    return picker;
  };

  private clearDate = () => {
    this.state.datePickerInstance.setDate('', true);

    if (this.props.handleDateChange) {
      this.props.handleDateChange('');
    }

    if (this.props.handleDateChangeEvent) {
      let clearEvent: DatePicker.DateInputEvent = {
        target: {
          value: '',
          name: this.props.name,
        },
      };
      this.props.handleDateChangeEvent(clearEvent);
    }
  };
}

export default DatePicker;
