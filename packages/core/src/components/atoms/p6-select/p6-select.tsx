import { Component, ComponentInterface, Element, h, Host, JSX, Method, Prop, State } from '@stencil/core';
import Choices from 'choices.js';
import { defaultValidationMessage } from '../../../shared/form/validation';
import { isHTMLOptionElement, toArray } from '../../../utils';
import { isEmpty } from '../../../utils/attribute';
import { getL10n, L10n } from '../../../utils/translations';

type ChoiceEventDetail = { value: string };

@Component({
  tag: 'p6-select',
  styleUrl: 'p6-select.scss',
  assetsDirs: ['locales'],
})
export class P6Select implements ComponentInterface {
  /**
   * The name of the select
   */
  @Prop() public name!: string;

  /**
   * Marks the select as multiple
   */
  @Prop() public multiple = false;

  /**
   * The select is not available for interaction. The value will not be submitted with the form
   */
  @Prop() public disabled = false;

  /**
   * Marks the select as required. It can't be submitted without a value
   */
  @Prop() public required = false;

  /**
   * Marks the select as read only.
   */
  @Prop({ attribute: 'readOnly' }) public readOnly = false;

  /**
   * The value of the placeholder to display on the search
   */
  @Prop() public placeholder: string | undefined;

  /**
   * Sort the options by alphabetic order
   */
  @Prop({ attribute: 'shouldSort' }) public shouldSort = false;

  /**
   * Disable the search on the select
   */
  @Prop({ attribute: 'disableSearch' }) public disableSearch = false;

  @Element() private readonly host!: HTMLP6SelectElement;

  @State() private hasError = false;

  private choice: Choices | null = null;

  private nativeSelect: HTMLSelectElement | undefined;

  private l10n: L10n | undefined;

  private selectedValues: string[] = [];

  /**
   * Returns the error message that would be displayed if the user submits the form, or an empty string if no error message.
   * It also triggers the standard error message, such as "this is a required field".
   */
  @Method()
  async validationMessage(): Promise<string> {
    return defaultValidationMessage(this.nativeSelect);
  }

  /**
   * Returns whether a form will validate when it is submitted, without having to submit it.
   */
  @Method()
  async checkValidity(): Promise<boolean> {
    return Promise.resolve(this.nativeSelect?.checkValidity() || true);
  }

  private getSelectedValueIndex(value: string): number {
    return this.selectedValues.indexOf(value);
  }

  async componentWillLoad(): Promise<void> {
    this.l10n = await getL10n(this.host);
    this.host.addEventListener('focusout', this.internalCheckValidity.bind(this));

    this.host.addEventListener('addItem', event => {
      const customEvent = event as CustomEvent<ChoiceEventDetail>;
      const { value } = customEvent.detail;
      if (this.getSelectedValueIndex(value) !== -1) {
        return;
      }
      this.selectedValues.push(value);
      this.internalCheckValidity();
    });

    this.host.addEventListener('removeItem', event => {
      const customEvent = event as CustomEvent<ChoiceEventDetail>;
      const idx = this.getSelectedValueIndex(customEvent.detail.value);
      if (idx !== -1) {
        this.selectedValues.splice(idx, 1);
      }
      this.internalCheckValidity();
    });

    // Default values
    this.selectedValues = toArray(this.host.children)
      .filter(isHTMLOptionElement)
      .filter(child => child.selected)
      .map(option => option.value);
  }

  componentWillRender(): Promise<void> | void {
    // destroy choices element to restore previous dom structure
    // so vdom can replace the element correctly
    this.destroy();
  }

  private getOptionChildren(): HTMLOptionElement[] {
    return toArray(this.host.children[0].children).filter(isHTMLOptionElement);
  }

  render(): JSX.Element {
    const visibleSelectAttributes = {
      name: this.readOnly ? '' : this.name,
      disabled: this.disabled || this.readOnly,
      multiple: this.multiple,
      required: this.required,
      class: { 'is-danger': true },
    };

    const hiddenSelectAttributes = {
      name: this.readOnly ? this.name : '',
      disabled: !this.readOnly,
      multiple: this.multiple,
      style: { display: 'none' },
    };

    return (
      <Host
        aria-disabled={this.disabled ? 'true' : null}
        class={{
          'is-danger': this.hasError,
        }}
        required={this.required}
      >
        <select {...hiddenSelectAttributes}>
          <slot />
        </select>
        <select
          ref={(input): void => {
            this.nativeSelect = input;
          }}
          {...visibleSelectAttributes}
        />
      </Host>
    );
  }

  componentDidRender(): void {
    this.init();
  }

  componentDidLoad(): void {
    if (this.selectedValues.length > 0) {
      this.internalCheckValidity();
    }
  }

  disconnectedCallback(): void {
    this.destroy();
  }

  private init(): void {
    // cf. https://github.com/jshjohnson/Choices
    const props = {
      // Usage: Optionally suppress console errors and warnings.
      silent: true,
      // Usage: Whether a user can remove items.
      removeItems: true,
      // Usage: Whether each item should have a remove button.
      removeItemButton: true,
      // Usage: Whether a search area should be shown. Note: Multiple select boxes will always show search areas.
      searchEnabled: !this.disableSearch,
      // Usage: Whether choices and groups should be sorted. If false, choices/groups will appear in the order they were given.
      shouldSort: this.shouldSort,
      // Usage: The value of the search inputs placeholder.
      placeholder: !isEmpty(this.placeholder),
      searchPlaceholderValue: this.placeholder,
      // Usage: The text that is shown whilst choices are being populated via AJAX.
      loadingText: this.l10n?.loadingText,
      // Usage: The text that is shown when a user's search has returned no results. Optionally pass a function returning a string.
      noResultsText: this.l10n?.noResultsText,
      // Usage: The text that is shown when a user has selected all possible choices. Optionally pass a function returning a string.
      noChoicesText: this.l10n?.noChoicesText,
      // Usage: The text that is shown when a user hovers over a selectable choice.
      itemSelectText: '',
      classNames: {
        containerOuter: 'choices',
        containerInner: 'choices__inner',
        input: 'choices__input',
        inputCloned: 'choices__input--cloned',
        list: 'choices__list',
        listItems: 'choices__list--multiple',
        listSingle: 'choices__list--single',
        listDropdown: 'choices__list--dropdown',
        item: 'choices__item',
        itemSelectable: 'choices__item--selectable',
        itemDisabled: 'choices__item--disabled',
        itemChoice: 'choices__item--choice',
        placeholder: 'choices__placeholder',
        group: 'choices__group',
        groupHeading: 'choices__heading',
        button: 'p6__choices__button',
        activeState: 'is-active',
        focusState: 'is-focused',
        openState: 'is-open',
        disabledState: 'is-disabled',
        highlightedState: 'is-highlighted',
        selectedState: 'is-selected',
        flippedState: 'is-flipped',
        loadingState: 'is-loading',
        noResults: 'has-no-results',
        noChoices: 'has-no-choices',
      },
      choices: this.getOptionChildren().map(option => {
        return {
          value: option.value,
          label: option.label,
          disabled: option.disabled,
          selected: this.selectedValues.indexOf(option.value) !== -1,
        };
      }),
    };

    if (this.nativeSelect !== undefined) {
      this.choice = new Choices(this.nativeSelect, props);
    }
  }

  private destroy(): void {
    if (this.choice !== null) {
      this.choice.destroy();
      this.choice = null;
    }
  }

  private async internalCheckValidity(): Promise<void> {
    await this.checkValidity();
    const msg = await this.validationMessage();
    this.hasError = msg !== '';
  }
}
