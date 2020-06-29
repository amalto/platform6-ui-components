import {
  Component,
  ComponentInterface,
  Element,
  h,
  Host,
  Prop,
} from "@stencil/core";
import { Mode } from "~shared/types";
import {
  defaultLocale,
  getL10n,
  L10n,
  Locale,
  locales,
} from "~utils/translations";

@Component({
  tag: "p6-language-select",
  styleUrl: "p6-language-select.scss",
  assetsDirs: ["locales"],
  scoped: true,
})
export class P6LanguageSelect implements ComponentInterface {
  /**
   * The name
   */
  @Prop() name!: string;

  /**
   * The mode
   */
  @Prop() mode: Mode = "default";

  /**
   * Default selected locale
   */
  @Prop() value: Locale = defaultLocale;

  /**
   * Locales to exclude from the list
   */
  @Prop() excludes: string | Locale[] = [];

  /**
   * The select is not available for interaction. The value will not be submitted with the form
   */
  @Prop() disabled = false;

  @Element() private readonly host!: HTMLP6LanguageSelectElement;

  private l10n: L10n | undefined;

  async componentWillLoad(): Promise<void> {
    this.l10n = await getL10n(this.host);
  }

  private getExcludedLocales(): Locale[] {
    if (Array.isArray(this.excludes)) {
      return this.excludes;
    }
    return this.excludes
      .split(",")
      .map((exclude) => exclude.trim())
      .filter((exclude) => exclude !== "");
  }

  render(): JSX.Element | null {
    const localesToDisplay = locales.filter(
      (code) => !this.getExcludedLocales().includes(code)
    );
    if (localesToDisplay.length === 0) {
      return null;
    }

    return (
      <Host>
        <p6-select
          name={this.name}
          searchEnabled={false}
          disabled={this.disabled}
          class={{
            [`is-${this.mode}`]: true,
          }}
        >
          {localesToDisplay.map((code) => (
            <option value={code} selected={this.value === code}>
              {this.l10n ? this.l10n[code] : code}
            </option>
          ))}
        </p6-select>
      </Host>
    );
  }
}
