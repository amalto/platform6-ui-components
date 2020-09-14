import { Component, ComponentInterface, h, Host, JSX, Prop } from '@stencil/core';
import { Mode } from '../../../shared/types';
import { getLanguageCodes, getLanguageName, LanguageCode } from '../../../utils/language';

export type P6LanguageValue = string;

@Component({
  tag: 'p6-language',
  styleUrl: 'p6-language.scss',
  shadow: true,
})
export class P6Language implements ComponentInterface {
  /**
   * The name
   */
  @Prop() name!: string;

  /**
   * The selected value
   */
  @Prop() value: P6LanguageValue = '';

  /**
   * Values to exclude from the language list
   */
  @Prop() excludes: string[] = [];

  /**
   * The Mode of the component to display
   */
  @Prop() public mode: Mode = Mode.default;

  /**
   * The select should take the full width
   */
  @Prop({ attribute: 'fullWidth' }) fullWidth = false;

  /**
   * The select is not available for interaction. The value will not be submitted with the form
   */
  @Prop() public disabled = false;

  /**
   * Marks the select as required. It can't be submitted without a value
   */
  @Prop() public required = false;

  /**
   * Marks as read only.
   */
  @Prop({ attribute: 'readOnly' }) public readOnly = false;

  private getLanguageOptions(): HTMLOptionElement[] {
    const languages = this.getAvailableLanguages();
    return languages.map(language => {
      return (
        <option key={`${this.name}--${language}--exclude-${this.excludes.join('-')}`} value={language} selected={language === this.value}>
          {getLanguageName(language)}
        </option>
      );
    });
  }

  render(): JSX.Element {
    return (
      <Host aria-disabled={this.disabled ? 'true' : null} required={this.required}>
        <p6-select-native name={this.name} disabled={this.disabled} required={this.required} readOnly={this.readOnly} mode={this.mode} fullWidth={this.fullWidth}>
          {this.getLanguageOptions()}
        </p6-select-native>
      </Host>
    );
  }

  private getAvailableLanguages(): LanguageCode[] {
    return getLanguageCodes()
      .filter(language => language === this.value || !this.excludes.includes(language))
      .sort((a, b) => getLanguageName(a).localeCompare(getLanguageName(b)));
  }
}
