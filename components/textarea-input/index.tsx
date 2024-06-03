// Modules
import * as React from 'react';
import { WrappedFieldProps, Field, BaseFieldProps } from 'redux-form';
import { default as classNames } from 'classnames';

// Components
import Help from '@amalto/help';

/**
 * Textarea input used on a [redux-form](#reduxform).
 */
namespace TextareaInput {
  export interface Props extends BaseFieldProps {
    /** Input's name used when submitting form. */
    name: string;
    /** Input's label. */
    label?: string | JSX.Element;
    /**
     * Input rows numbers.
     * @default 2
     */
    rows?: number;
    /**
     * Whether or not the input is disabled.
     * @default false
     */
    disabled?: boolean;
    /** Tooltip text displayed when hovering <span className='quote'>?</span> icon. */
    help?: string;
    /** CSS class wrapping the component. */
    containerClass?: string;
    /** CSS class applied to every input from the list. */
    inputClass?: string;
    /**
     * Remove the bottom margin which is the default height of the error message
     * displayed when input is invalid.
     * @default false
     */
    collapseErrorSpace?: boolean;

    /** Hide props from documentation */

    /** @ignore */
    children?: React.ReactNode;
    /** @ignore */
    key?: React.ReactText;
    /** @ignore */
    ref?: React.Ref<TextareaInput>;

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

class TextareaInput extends React.Component<TextareaInput.Props, TextareaInput.State> {
  constructor(props: TextareaInput.Props) {
    super(props);
    this.state = {};
  }

  private renderTextarea = (field: WrappedFieldProps<any>) => {
    const { label, disabled, help, containerClass, inputClass, collapseErrorSpace, rows } =
      this.props;

    const { input, meta } = field;

    return (
      <div
        className={classNames('form-group', containerClass, {
          invalid: meta.touched && !!meta.error,
        })}
      >
        {label ? (
          <label>
            {label}
            {help && <Help text={help} />}
          </label>
        ) : null}

        <textarea
          {...(input as any)}
          rows={rows || 2}
          key={input.name}
          disabled={disabled}
          className={classNames('form-control input-block', inputClass)}
        />

        {meta.touched && !!meta.error ? (
          <p className="validation-error-message">{meta.error}</p>
        ) : collapseErrorSpace ? null : (
          <p className="validation-error-message">&nbsp;</p>
        )}
      </div>
    );
  };

  render() {
    const { name, label, format, normalize, parse, validate, warn } = this.props;

    let baseFieldProps: BaseFieldProps = {
      name,
      format,
      normalize,
      parse,
      validate,
      warn,
    };

    return <Field {...baseFieldProps} component={this.renderTextarea} />;
  }
}

export default TextareaInput;
