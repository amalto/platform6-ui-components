import { Component, ComponentInterface, Element, Event, EventEmitter, h, Host, JSX, Method, Prop, State } from '@stencil/core';
import { P6Control } from '../../../shared/form/control';
import { InvalidEventDetail, isCustomEvent, ValidEventDetail } from '../../../shared/form/event';
import { Mode, Size } from '../../../shared/types';
import { getDefaultLanguage, getLanguageCodes, getLanguageName, LanguageCode } from '../../../utils/language';
import { getL10n, interpolate, L10n } from '../../../utils/translations';

export type Translation = { language: LanguageCode; value: string };
export type P6TranslationValue = { [key: string]: string };
export type P6TranslationControl = P6Control<P6TranslationValue>;

@Component({
  tag: 'p6-translation',
  styleUrl: 'p6-translation.scss',
  assetsDirs: ['locales'],
  shadow: true,
})
export class P6Translation implements ComponentInterface, P6TranslationControl {
  /**
   * The name
   */
  @Prop() name!: string;

  /**
   * The value
   */
  @Prop() value: P6TranslationValue = {};

  /**
   * Marks as read only.
   */
  @Prop({ attribute: 'readOnly' }) public readOnly = false;

  /**
   * the input is not available for interaction. The value will not be submitted with the form
   */
  @Prop() disabled = false;

  /**
   * When the field is valid
   */
  @Event() p6Valid!: EventEmitter<ValidEventDetail<P6TranslationValue>>;

  /**
   * When the field is invalid
   */
  @Event() p6Invalid!: EventEmitter<InvalidEventDetail>;

  /**
   * When the select ask to register
   */
  @Event() p6FormRegister!: EventEmitter<P6TranslationControl>;

  /**
   * When the select ask to unregister
   */
  @Event() p6FormUnregister!: EventEmitter<P6TranslationControl>;

  @Element() host!: HTMLP6TranslationElement;

  @State() translations: Translation[] = [];

  @State() errorMessage = '';

  private l10n: L10n | undefined;

  async componentWillLoad(): Promise<void> {
    this.l10n = await getL10n(this.host);
    this.host.addEventListener('focusout', this.checkValidity.bind(this));
    this.initializeTranslations();
  }

  /**
   * Returns the error message that would be displayed if the user submits the form, or an empty string if no error message.
   * It also triggers the standard error message, such as "this is a required field".
   */
  @Method()
  async validationMessage(): Promise<string> {
    return Promise.resolve(this.errorMessage || '');
  }

  /**
   * Returns whether a form will validate when it is submitted, without having to submit it.
   */
  @Method()
  async checkValidity(): Promise<boolean> {
    const errors = [];
    // default language should have a value
    if (!this.hasDefaultTranslation()) {
      errors.push(
        interpolate(this.l10n?.missingDefaultTranslation, {
          code: getDefaultLanguage(),
          name: getLanguageName(getDefaultLanguage()),
        }),
      );
    }

    const missingTranslations = this.getTranslationsWithoutValue();
    if (missingTranslations.length > 0) {
      errors.push(
        interpolate(this.l10n?.missingTranslation, {
          languages: missingTranslations.map(language => getLanguageName(language)).join(', '),
        }),
      );
    }

    this.errorMessage = errors.join(', ');
    const isValid = this.errorMessage === '';

    if (isValid) {
      this.p6Valid.emit({
        name: this.name,
        value: this.getFieldValue(),
      });
    } else {
      this.p6Invalid.emit({ name: this.name, message: this.errorMessage });
    }

    return Promise.resolve(isValid);
  }

  render(): JSX.Element {
    return (
      <Host>
        <p6-field>
          <p6-label slot="label">
            <slot />
            {!this.readOnly && !this.disabled && (
              <p6-action
                mode={Mode.success}
                size={Size.small}
                onClick={this.onAddLineHandler()}
                disabled={!this.canAddTranslation()}
                class={{
                  'has-tooltip-arrow': true,
                  [`has-tooltip-right`]: true,
                }}
                data-tooltip={this.l10n?.addTooltip}
              >
                <p6-icon name="plus-circle" size={Size.small} />
              </p6-action>
            )}
          </p6-label>
          {this.translations.map(translation => {
            const excludes = this.translations.map(t => t.language).filter(l => l !== translation.language);
            return (
              <p6-translation-line
                language={translation.language}
                translation={translation.value}
                excludes={excludes}
                name={this.name}
                disabled={this.disabled}
                readOnly={this.readOnly}
                onP6Delete={this.onRemoveLineHandler(translation.language)}
                onP6KeyChange={this.onKeyChangeHandler(translation.language)}
                onP6ValueChange={this.onValueChangeHandler(translation.language)}
              />
            );
          })}
        </p6-field>
      </Host>
    );
  }

  componentDidLoad(): void {
    this.p6FormRegister.emit(this);
  }

  disconnectedCallback(): void {
    this.p6FormUnregister.emit(this);
  }

  private initializeTranslations(): void {
    const keys = Object.keys(this.value);
    this.translations = keys.map(language => ({
      language,
      value: this.value[language],
    }));

    if (!keys.includes(getDefaultLanguage())) {
      this.addNewLine(getDefaultLanguage());
    }
  }

  private getTranslationsWithoutValue(): LanguageCode[] {
    return this.translations.filter(translation => translation.language !== '' && translation.value.trim() === '').map(translation => translation.language);
  }

  private getFieldValue(): P6TranslationValue {
    return this.translations.reduce(
      (fieldValue, translation) => ({
        ...fieldValue,
        [translation.language]: translation.value,
      }),
      {} as P6TranslationValue,
    );
  }

  private hasDefaultTranslation(): boolean {
    const defaultTranslation = this.translations.find(translation => translation.language === getDefaultLanguage());
    return defaultTranslation !== undefined && defaultTranslation.value.trim() !== '';
  }

  private canAddTranslation(): boolean {
    return this.translations.length < getLanguageCodes().length;
  }

  private addNewLine(language: LanguageCode): void {
    if (!this.canAddTranslation()) {
      return;
    }
    this.translations = this.translations.concat({
      language,
      value: '',
    });
  }

  private removeLine(language: LanguageCode): void {
    this.translations = this.translations.filter(t => t.language !== language);
  }

  private onRemoveLineHandler(language: LanguageCode): (event: Event) => void {
    return (): void => {
      this.removeLine(language);
    };
  }

  private onAddLineHandler(): (event: Event) => void {
    return (): void => {
      const languages = this.translations.map(translation => translation.language).filter(language => language !== '');
      const missingTranslation = getLanguageCodes().find(language => !languages.includes(language));
      if (missingTranslation !== undefined) {
        this.addNewLine(missingTranslation);
      }
    };
  }

  private onKeyChangeHandler(language: LanguageCode): (event: Event) => void {
    return (event: Event): void => {
      if (!isCustomEvent(event)) {
        return;
      }

      const newLanguage = event.detail.value;
      if (newLanguage === undefined || newLanguage === null) {
        return;
      }

      this.translations = this.translations.map(t => (t.language === language ? { ...t, language: newLanguage } : t));
    };
  }

  private onValueChangeHandler(language: LanguageCode): (event: Event) => void {
    return (event: Event): void => {
      if (!isCustomEvent(event)) {
        return;
      }
      this.translations = this.translations.map(t => (t.language === language ? { ...t, value: event.detail.value } : t));
    };
  }
}
