import React, { InputHTMLAttributes } from 'react';
import { default as classNames } from 'classnames';
import { Field } from './field.component';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string | JSX.Element;
  help?: string;
  useTextarea?: boolean;
}

export class Input extends Field<HTMLInputElement, InputProps> {
  componentDidUpdate(nextProps: Readonly<InputProps>): void {
    if (this.props.value !== nextProps.value && this.ref !== null) {
      this.setState({
        ...this.state,
        validationMessage: this.ref.validationMessage,
      });
    }
  }

  protected renderField(
    id: string,
    className: string | undefined,
    props: Omit<InputProps, 'id' | 'className' | 'label'>,
  ): JSX.Element | null | false {
    return (
      <input
        ref={(input) => (this.ref = input)}
        className={classNames(className, 'full-width')}
        id={id}
        key={`key_${id}`}
        {...props}
      />
    );
  }
}
