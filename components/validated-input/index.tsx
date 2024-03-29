// Modules
import * as React from 'react';
import { default as classNames } from 'classnames';

// Utils
import { isNotEmpty } from '@amalto/helpers';

// Components
import Help from '@amalto/help';

/**
 * Simple select or input with a validation by regular expression or method check used on a [redux-form](#reduxform).
 */
module ValidatedInput {
  export interface Props extends React.ClassAttributes<ValidatedInput> {
    /** Input name in the DOM. */
    name: string;
    /** Input value. */
    value: string;
    /** Callback function executed on user input. */
    handleFieldChange: (
      fieldValue: string,
      fieldName: string,
      isInvalid: boolean,
    ) => void;
    /** If given, ValidatedInput will be a select balise instead of an input balise. */
    choices?: {
      value: string;
      label?: string;
    }[];
    /** Instead of a text input, use a textarea input. */
    multiline?: boolean;
    /**
     * Regular expression to validate the user input against.
     * If the user input does not match the regex, it will take an invalid appearance.
     */
    regex?: RegExp;
    /**
     * A callback function to validate the user input against.
     * If the user input (fieldValue) is not valid, this function should return false.
     * It can be used in place or in combination with the regex validation.
     */
    validate?: (fieldValue: string) => boolean;
    /** Custom error message displayed when the user input is invalid. */
    errorMessage?: string;
    /**
     * Whether or not the input is disabled.
     * @default false
     */
    disabled?: boolean;
    /**
     * If true, value must be defined and can't be cleared.
     * @default false
     */
    mandatory?: boolean;
    /** Input label. */
    label?: string | JSX.Element;
    /**
     * Forces the input to be validated (regex/mandatory validation) on first load - before the user starts to type anything.
     * @default false
     */
    validateOnLoad?: boolean;
    /**
     * Whether or not the form has been submitted. Will force an input validation if it goes from false to true.
     * @default false
     */
    formSubmitted?: boolean;
    /** Placeholder HTML attribute. */
    placeholder?: string;
    /** Autocomplete HTML attribute. */
    autoComplete?: string;
    /** Tooltip help displayed when hovering the <span className='quote'>?</span> icon next to label. */
    help?: string;
    /** CSS class wrapping the component. */
    containerClass?: string;
    /** Input class. */
    inputClass?: string;

    /** Hide props from documentation */

    /** @ignore */
    children?: React.ReactNode;
    /** @ignore */
    key?: React.ReactText;
    /** @ignore */
    ref?: React.Ref<ValidatedInput>;
  }

  export interface State {
    invalidInput?: boolean;
  }
}

class ValidatedInput extends React.Component<
  ValidatedInput.Props,
  ValidatedInput.State
> {
  constructor(props: ValidatedInput.Props) {
    super(props);
    this.state = {
      invalidInput: false,
    };
  }

  render() {
    const {
      name,
      label,
      help,
      value,
      disabled,
      choices,
      multiline,
      placeholder,
      autoComplete,
      mandatory,
      errorMessage,
      containerClass,
      inputClass,
    } = this.props;

    const inputProps = {
      className: classNames('form-control', inputClass),
      key: name,
      name: name,
      value: value,
      onChange: this.handleChange,
      disabled: disabled,
    };

    const selectDisplay = choices ? (
      <select {...inputProps}>
        {choices.map((choice, idx) => {
          return (
            <option key={idx} value={choice.value}>
              {choice.label || choice.value}
            </option>
          );
        })}
      </select>
    ) : null;

    const textProps = {
      ...inputProps,
      placeholder: placeholder,
      autoComplete: autoComplete,
    };

    const inputDisplay =
      !choices && !multiline ? <input type="text" {...textProps} /> : null;

    const textareaDisplay = multiline ? <textarea {...textProps} /> : null;

    return (
      <div
        className={classNames('form-group', containerClass, {
          invalid: this.state.invalidInput,
          mandatory: mandatory,
        })}
      >
        {label ? (
          <label>
            {label}
            {help && <Help text={help} />}
          </label>
        ) : null}

        {selectDisplay}

        {inputDisplay}

        {textareaDisplay}

        {this.state.invalidInput && errorMessage ? (
          <p className="validation-error-message">{errorMessage}</p>
        ) : null}
      </div>
    );
  }

  componentDidMount() {
    if (this.props.validateOnLoad) {
      this.validateField(this.props.value, this.props);
    }
  }

  componentWillReceiveProps(nextProps: ValidatedInput.Props) {
    if (
      this.props.formSubmitted !== nextProps.formSubmitted &&
      nextProps.formSubmitted === true
    ) {
      this.validateField(nextProps.value, nextProps);
    }
  }

  private handleChange = (event: any) => {
    const inputValue = JSON.parse(JSON.stringify(event.target.value));
    this.validateField(inputValue, this.props);
  };

  private validateField = (value: string, props: ValidatedInput.Props) => {
    const emptyButMandatory = !isNotEmpty(value) && !!props.mandatory;
    const noMatchRegex = props.regex ? !props.regex.test(value) : false;
    const invalid = props.validate ? !props.validate(value) : false;

    if (!props.disabled) {
      this.setState(
        {
          invalidInput: emptyButMandatory || noMatchRegex || invalid,
        },
        () => {
          props.handleFieldChange(value, props.name, this.state.invalidInput);
        },
      );
    }
  };
}

export default ValidatedInput;
