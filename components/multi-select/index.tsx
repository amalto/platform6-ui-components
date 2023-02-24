/**
 * Created by franckmontaigne on 04/08/15.
 */

// Modules
import * as React from 'react';
import { default as classNames } from 'classnames';

//utils & stores
import { removeValFromArrayNoDup, addValToArrayNoDup } from '@amalto/helpers';

//components & models
import Help from '@amalto/help';
import { Option } from './models/Option';

module MultiSelect {
  export interface Props extends React.ClassAttributes<MultiSelect> {
    /** Input label name. */
    name: string;

    /** Input's label. */
    label: string | JSX.Element;

    /** Choice list. */
    options: Option[];

    /**
     * Whether or not the input is disabled.
     * @default false
     */
    // disabled?: boolean;

    /** Tooltip text displayed when hovering <span className='quote'>?</span> icon. */
    help?: string;

    /** CSS class wrapping the component. */
    containerClass?: string;

    /** CSS class applied to every input from the list. */
    inputClass?: string;

    fieldLineHeight?: number;

    /** Allow multiple selection. */
    multiple?: boolean;

    /** Current selection. If multiple is set to true, must be an array of string. */
    value?: string | string[];

    /** Initial selection. If multiple is set to true, must be an array of string. */
    initialValue?: string | string[];

    /** Triggered when selecting an option. */
    handleChange: (event: any) => void;

    /**
     * Language to use on the component. e.g: <span className='quote'>en-US</span>.
     * Locales available at [Locale](#locale).
     * Accessible via [WebStorage](#webstorage).
     * @default: 'en-US'
     */
    locale?: string;

    /** Hide props from documentation */

    /** @ignore */
    children?: React.ReactNode;
    /** @ignore */
    key?: React.ReactText;
    /** @ignore */
    ref?: React.Ref<MultiSelect>;
  }

  export interface State {
    locale?: string;
  }
}

class MultiSelect extends React.Component<
  MultiSelect.Props,
  MultiSelect.State
> {
  private dropdownCtn: HTMLDivElement;

  constructor(props: MultiSelect.Props) {
    super(props);

    this.state = {
      locale: props.locale || 'en-US',
    };

    this.dropdownCtn = undefined;
  }

  //handles display of a search criteria input
  render() {
    const { label, value, options } = this.props;

    return this.renderDropdownInput(
      label,
      value,
      options.map((o) => o.label),
    );
  }

  private handleSelectChange = (event: any) => {
    if (this.props.multiple) {
      $(event.currentTarget).scrollTop(0);
    }

    this.props.handleChange(event);
  };

  private renderDropdownInput = (
    filterDisplayName: string | JSX.Element,
    value?: string | string[],
    optionsLabel?: string[],
  ) => {
    const {
      multiple,
      fieldLineHeight,
      options,
      label,
      help,
      inputClass,
      containerClass,
    } = this.props;

    // get the selected values as an array if it's a multi-select field
    if (multiple) {
      const selectValue: string[] = (value as string[]) || [];
      let choices = (optionsLabel as string[]).map((choice, idx) => {
        let option = choice.trim();

        return (
          <li
            key={idx}
            className={classNames({ active: value.indexOf(option) !== -1 })}
          >
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                this.handleChoiceSelect(
                  selectValue,
                  option,
                  multiple,
                  e.ctrlKey || e.metaKey,
                );
              }}
            >
              {option}
            </a>
          </li>
        );
      });

      let extendedStyle: React.CSSProperties =
        multiple && selectValue && !!selectValue.length
          ? { textAlign: 'left', paddingRight: 20 }
          : { textAlign: 'left' };

      if (fieldLineHeight === 1) {
        extendedStyle.height = 32; //perfect align with one line fields (same height as a basif form-control)
      } else if (fieldLineHeight === 1.5) {
        extendedStyle.height = 48; //no align possible in that case, can be used to reduce space of input
      } else if (fieldLineHeight === 2) {
        extendedStyle.height = 64; //no align possible in that case, can be used to reduce space of input
      } else {
        extendedStyle.height = 91; //allows two "one line fields to stack"
      }

      return (
        <div
          className={classNames('form-group', containerClass)}
          style={{ position: 'relative' }}
          ref={(div) => (this.dropdownCtn = div)}
        >
          {label ? (
            <label>
              {filterDisplayName}
              {help && <Help text={help} />}
            </label>
          ) : null}

          <button
            type="button"
            className={classNames(
              'btn form-control dropdown-toggle rel',
              inputClass,
              {
                'multi-select-input': multiple,
              },
            )}
            data-toggle="dropdown"
            style={extendedStyle}
          >
            {multiple && selectValue && selectValue.length ? (
              <div className="dropdown-active-tags">
                {selectValue.map((value, idx) => {
                  return (
                    <span
                      key={value + idx}
                      className="tag"
                      onClick={() =>
                        this.handleChoiceSelect(selectValue, value, multiple)
                      }
                    >
                      <span>{value}</span>
                      <span className="close-tag-btn">
                        <span className="fas fa-times" />
                      </span>
                    </span>
                  );
                })}
              </div>
            ) : null}

            <span className="caret abs" style={{ top: 12, right: 4 }} />
          </button>
          <ul className="dropdown-menu mgb-20" style={{ left: 'auto' }}>
            {choices}
          </ul>
        </div>
      );
    } else {
      const selectValue: string = (value as string) || '';

      let choices = options.map((choice, idx) => {
        return (
          <option value={choice.value.trim()} key={idx}>
            {choice.label.trim()}
          </option>
        );
      });

      return (
        <div className={classNames('form-group', containerClass)}>
          {label ? (
            <label>
              {filterDisplayName}
              {help && <Help text={help} />}
            </label>
          ) : null}
          <select
            multiple={multiple}
            className={classNames('form-control', inputClass)}
            value={selectValue}
            name={this.props.name}
            onChange={this.handleSelectChange}
          >
            <option value=""></option>
            {choices}
          </select>
        </div>
      );
    }
  };

  private handleChoiceSelect = (
    currentSelection: string[],
    choice: string,
    multiple: boolean,
    cmdOrCtrlKeyOn?: boolean,
  ) => {
    this.props.handleChange({
      target: {
        value: multiple
          ? currentSelection.indexOf(choice) !== -1
            ? removeValFromArrayNoDup(currentSelection as string[], choice)
            : addValToArrayNoDup(currentSelection as string[], choice)
          : choice,
        name: this.props.name,
        multiple,
      },
    });

    if (cmdOrCtrlKeyOn && this.dropdownCtn) {
      $(this.dropdownCtn).removeClass('open').addClass('open');
    }
  };
}

export default MultiSelect;
