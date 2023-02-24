// Modules
import * as React from 'react';
import { default as classNames } from 'classnames';

// Components
import Help from '@amalto/help';

/**
 * Timepicker with few customizations like a minimum and a maximum time range of time available.
 */
module TimePicker {
  export interface Props extends React.ClassAttributes<TimePicker> {
    /** Input name in the DOM. */
    name: string;
    /** Time value. */
    value: string;
    /** Callback function executed on user input. */
    handleFieldChange: (fieldValue: string, fieldName: string) => void;
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

    /** Hide props from documentation */

    /** @ignore */
    children?: React.ReactNode;
    /** @ignore */
    key?: React.ReactText;
    /** @ignore */
    ref?: React.Ref<TimePicker>;
  }

  export interface State {
    //saved in state to prevent unnecessary loops eachtime a render occurs
    hoursOptions?: string[];
    minutesOptions?: string[];
  }
}

class TimePicker extends React.Component<TimePicker.Props, TimePicker.State> {
  constructor(props: TimePicker.Props) {
    super(props);
    this.state = {
      hoursOptions: this.getHoursOptions(),
      minutesOptions: this.getMinutesOptions(),
    };
  }

  render() {
    const { name, value, label, help, containerClass, mandatory } = this.props;

    return (
      <div
        className={classNames('form-group', containerClass, {
          'mandatory pos-relative': mandatory,
        })}
      >
        {label ? (
          <label>
            {label}
            {help && <Help text={help} />}
          </label>
        ) : null}

        {this.renderTimeInput()}

        <input type="hidden" name={name} value={value} />
      </div>
    );
  }

  componentDidUpdate(prevProps: TimePicker.Props) {
    if (
      this.props.minutesInterval !== prevProps.minutesInterval ||
      this.props.minHour !== prevProps.minHour ||
      this.props.maxHour !== prevProps.maxHour
    ) {
      this.setState({
        hoursOptions: this.getHoursOptions(),
        minutesOptions: this.getMinutesOptions(),
      });
    }
  }

  private renderTimeInput = () => {
    const { value, disabled, minHour } = this.props;

    const parsedTime = value && value.split(':');

    const hours =
      parsedTime && parsedTime.length === 2
        ? parsedTime[0]
        : minHour
        ? this.pad(minHour)
        : '00';
    const minutes =
      parsedTime && parsedTime.length === 2 ? parsedTime[1] : '00';

    return (
      <div className="combined-inputs">
        <select
          className="form-control input-left"
          value={hours}
          onChange={this.handleHoursChange}
          disabled={disabled}
        >
          {this.state.hoursOptions.map((choice, idx) => {
            return (
              <option key={idx} value={choice}>
                {choice}
              </option>
            );
          })}
        </select>

        <span
          className="form-control input-center"
          style={{ fontWeight: 'bold' }}
        >
          :
        </span>

        <select
          className="form-control input-right"
          value={minutes}
          onChange={this.handleMinutesChange}
          disabled={disabled}
        >
          {this.state.minutesOptions.map((choice, idx) => {
            return (
              <option key={idx} value={choice}>
                {choice}
              </option>
            );
          })}
        </select>
      </div>
    );
  };

  private handleHoursChange = (event: any) => {
    this.props.handleFieldChange(
      this.getUpdatedTime(event.target.value),
      this.props.name,
    );
  };

  private handleMinutesChange = (event: any) => {
    this.props.handleFieldChange(
      this.getUpdatedTime(undefined, event.target.value),
      this.props.name,
    );
  };

  private getHoursOptions = (): string[] => {
    const { minutesInterval, minHour, maxHour } = this.props;

    let _minHour = minHour || 0;
    let _maxHour = maxHour ? maxHour : 24;

    if (_maxHour > 24 || _maxHour < _minHour) {
      _maxHour = 24;
    }

    let hoursOptions: string[] = [];

    for (let hours = _minHour; hours < _maxHour; hours += 1) {
      hoursOptions.push(this.pad(hours));
    }

    return hoursOptions;
  };

  private getMinutesOptions = (): string[] => {
    const { minutesInterval } = this.props;

    const interval = minutesInterval || 30;

    let minutesOptions: string[] = [];

    for (let mins = 0; mins < 60; mins += interval) {
      minutesOptions.push(this.pad(mins));
    }

    return minutesOptions;
  };

  private pad = (num: number | string) => {
    return ('00' + num.toString()).slice(-2);
  };

  private getUpdatedTime = (hours?: string, minutes?: string): string => {
    const { value } = this.props;
    const parsedTime = value && value.split(':');

    let _hours = parsedTime && parsedTime.length === 2 ? parsedTime[0] : '00';
    let _minutes = parsedTime && parsedTime.length === 2 ? parsedTime[1] : '00';

    if (hours) {
      _hours = hours;
    }

    if (minutes) {
      _minutes = minutes;
    }

    return this.pad(_hours) + ':' + this.pad(_minutes);
  };
}

export default TimePicker;
