import { css, cx } from 'emotion';
import React, { CSSProperties } from 'react';
import { default as ReactSelect } from 'react-select';
import { PlaceholderProps } from 'react-select/lib/components/Placeholder';
import { Props as ReactSelectProps } from 'react-select/lib/Select';
import { Styles } from 'react-select/lib/styles';
import { Theme } from 'react-select/lib/types';
import { Field } from './field.component';

export interface SelectProps<T> extends ReactSelectProps<T> {
  label?: string | JSX.Element;
}

export class Select<T extends {}> extends Field<HTMLInputElement, SelectProps<T>> {
  private styles: Styles = {
    container: (base: CSSProperties): CSSProperties => {
      return {
        ...base,
        fontSize: 14,
      };
    },
    control: (base: CSSProperties): CSSProperties => {
      return {
        ...base,
        'borderWidth': '2px',
        'boxShadow': 'none',
        'borderColor': this.isInvalid && !this.props.readOnly ? '#e25d5d' : base.borderColor,
        '&:hover': {
          borderColor: this.isInvalid && !this.props.readOnly ? '#e25d5d' : base.borderColor,
        },
      };
    },
    placeholder: (base: CSSProperties): CSSProperties => ({
      ...base,
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    }),
  };

  protected renderField(
    id: string,
    className: string | undefined,
    props: Omit<SelectProps<T>, 'id' | 'className' | 'label'>,
  ): JSX.Element | null | false {
    return (
      <ReactSelect<T>
        className={!!className ? className.replace('form-control', '') : className}
        id={id}
        styles={this.styles}
        theme={this.theme}
        {...props}
      />
    );
  }

  private theme(defaultTheme: Theme): Theme {
    return {
      ...defaultTheme,
      borderRadius: 2,
      colors: {
        ...defaultTheme.colors,
        primary: 'silver',
        neutral20: 'rgb(232, 235, 237)',
        neutral30: 'rgb(232, 235, 237)',
      },
      spacing: {
        ...defaultTheme.spacing,
        baseUnit: 1,
        menuGutter: 4,
        controlHeight: 32,
      },
    };
  }
}

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export function PlaceholderWithTooltip(props: PlaceholderProps<any>): JSX.Element {
  const { children, className, getStyles, innerProps } = props;
  const styles = css(getStyles('placeholder', props));
  const isPlaceholderCss = {
    placeholder: true,
  };

  return (
    <div
      className={cx(isPlaceholderCss, className, styles)}
      data-toggle="tooltip"
      data-title={children}
      {...innerProps}
    >
      {children}
    </div>
  );
}
