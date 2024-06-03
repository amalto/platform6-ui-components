// Modules
import * as React from 'react';
import { WrappedFieldProps, Field, BaseFieldProps } from 'redux-form';

// Components
import Help from '@amalto/help';

// Utils
import { default as classNames } from 'classnames';

/**
 * Readonly input used on a [redux-form](#reduxform).
 */
namespace ReadonlyInput {
  export interface Props extends BaseFieldProps {
    /** Input's name used when submitting form. */
    name: string;
    /** Input's label. */
    label?: string | JSX.Element;
    /** Tooltip text displayed when hovering <span className='quote'>?</span> icon. */
    help?: string;
    /** CSS class wrapping the component. */
    containerClass?: string;
    /** CSS class applied to input. */
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
    ref?: React.Ref<ReadonlyInput>;

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

class ReadonlyInput extends React.Component<ReadonlyInput.Props, ReadonlyInput.State> {
  constructor(props: ReadonlyInput.Props) {
    super(props);
    this.state = {};
  }

  private renderText = (field: WrappedFieldProps<any>) => {
    const { label, help, containerClass, inputClass, collapseErrorSpace } = this.props;

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

        <span {...(input as any)} className={classNames('form-static-input', inputClass)}>
          {input.value}
        </span>

        {meta.touched && !!meta.error ? (
          <p className="validation-error-message">{meta.error}</p>
        ) : collapseErrorSpace ? null : (
          <p className="validation-error-message">&nbsp;</p>
        )}
      </div>
    );
  };

  render() {
    const { name, format, normalize, parse, validate, warn } = this.props;

    let baseFieldProps: BaseFieldProps = {
      name,
      format,
      normalize,
      parse,
      validate,
      warn,
    };

    return <Field {...baseFieldProps} component={this.renderText} />;
  }
}

export default ReadonlyInput;
