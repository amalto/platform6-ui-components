/** Modules */
import React, { ChangeEvent, Component, CSSProperties } from 'react';
import { css, cx } from 'emotion';
import * as uuid from 'uuid';

/** Components */
import ActionButton from '@amalto/action-button';
import Help from '@amalto/help';
import { Input } from './models/input.field';
import { Textarea } from './models/textarea.field';
import { SelectLanguage } from './models/language.field';
import { PlaceholderWithTooltip } from './models/select.field';

/** Utils & Typings */
import { getWordings } from '@amalto/helpers';
import { ICON_TYPE } from '@amalto/service-helpers';

/** Constants */
import { LanguageCode } from './constants/languages';
import { WORDINGS } from './constants/wordings';

export interface TranslationProps {
  /** Set mandatory language by default, if not provided 'en' will be used. */
  defaultLanguage?: string;
  /** Set true to disable the support of internationalization. */
  disableMultilanguage?: boolean;
  /** Set to true if you want to use textarea instead of text input. */
  useTextarea?: boolean;
  /** Input name. */
  name: string;
  /** Inuput label. */
  label: string | JSX.Element;
  /** Tooltip text displayed when hovering <span className='quote'>?</span> icon. */
  help?: string;
  /** Language options. */
  value?: { [key: string]: string };
  /** Is field on readonly. */
  readOnly?: boolean;
  /** Triggered every time the value change. */
  onChange?: (value: { [key: string]: string }) => void;
  /**
   * Remove the bottom margin which is the default height of the error message
   * displayed when input is invalid.
   * @default false
   */
  collapseErrorSpace?: boolean;
  /**
   * Language to use on the component which determine the search input's placeholder language. e.g: <span className='quote'>en-US</span>.
   * Locales available at [Locale](#locale).
   * Accessible via [WebStorage](#webstorage).
   * @default 'en-US'
   */
  locale?: string;
}

declare type TranslationType = { id: string; lang: string; value: string };

interface TranslationState {
  defaultLang?: string;
  translations: TranslationType[];
  wordings?: { [key: string]: string };
}

class TranslationField extends Component<TranslationProps, TranslationState> {
  private defaultLang = 'EN';

  private style = css({
    '.inputRequired:after': {
      content: "'*'",
      color: '#e25d5d',
      marginLeft: 2,
      fontWeight: 'bold',
      position: 'absolute',
      top: 0,
      right: 0,
    },
  });

  constructor(props: Readonly<TranslationProps>) {
    super(props);

    const defaultLang: string = props.defaultLanguage || this.defaultLang;

    let translations: TranslationType[] = Object.keys(props.value || {}).map((lang) => ({
      id: uuid.v4(),
      lang,
      value: props.value[lang],
    }));

    const defaultLanguage: boolean = translations.some((value) => value.lang === defaultLang);

    if (!defaultLanguage) {
      translations.push({
        id: uuid.v4(),
        lang: defaultLang,
        value: '',
      });
    }

    // Get and sorted all translations except the default one.
    translations = translations.sort((first, second) => {
      if (first.lang === defaultLang) {
        return -1;
      } else if (second.lang === defaultLang) {
        return 1;
      }

      return first.lang.localeCompare(second.lang);
    });

    this.state = {
      defaultLang,
      translations,
      wordings: getWordings(WORDINGS, props.locale),
    };
  }

  render(): JSX.Element | null | false {
    const { disableMultilanguage, readOnly, label, help, collapseErrorSpace } = this.props;
    const lines = this.state.translations.map((t) => this.lineRender(t.lang, t.value, t.id));

    return (
      <div
        className={cx(
          'form-group pos-relative',
          {
            mandatory: disableMultilanguage,
          },
          this.style,
        )}
      >
        <label>
          {label}
          <div
            style={{
              display: disableMultilanguage || readOnly ? 'none' : 'inline-block',
            }}
          >
            <ActionButton
              iconClass="fas fa-plus-circle"
              tooltipText={this.state.wordings.translationAdd}
              btnClass="padl-10 primary-color"
              clickAction={this.addNewLine.bind(this)}
            />
          </div>
          {help && <Help text={help} />}
        </label>
        {lines.length === 0 ? (
          this.emptyContent()
        ) : collapseErrorSpace ? (
          lines
        ) : (
          <div>
            {lines}
            <div className="validation-error-message">&nbsp;</div>
          </div>
        )}
      </div>
    );
  }

  protected emptyContent(): JSX.Element {
    return <div className="validation-error-message">{this.state.wordings.translationEmpty}</div>;
  }

  private lineRender(lang: string, value: string, key: string): JSX.Element {
    return this.formLineRender(
      lang,
      value,
      key,
      this.onKeyChangeHandler(key),
      this.onValueChangeHandler(key),
      (): void => this.removeLine(key),
      this.state.translations.map((t) => t.lang).filter((l) => !!l),
      this.props.readOnly,
      this.state.defaultLang === lang,
    );
  }

  private formLineRender(
    lang: string | undefined,
    value: string | undefined,
    key: string,
    onKeyChange: (value: LanguageCode) => void,
    onValueChange: (event: ChangeEvent<HTMLInputElement>) => void,
    onRemoveLine: () => void,
    excludes: string[],
    readOnly?: boolean,
    isDefaultLang?: boolean,
  ): JSX.Element {
    const inputRequired = cx({ inputRequired: !!lang });
    const { name } = this.props;
    const { wordings } = this.state;

    const valueProps = {
      key: `${key}-value`,
      id: `${key}-value`,
      name: `${name}.${lang}`,
      value: value,
      className: 'form-control',
      readOnly: readOnly,
      required: !!lang,
      onChange: onValueChange,
    };

    const trashStyle: CSSProperties = {
      display: isDefaultLang || readOnly ? 'none' : 'block',
    };

    return !this.props.disableMultilanguage ? (
      <div
        key={key}
        className="form-group mandatory inline-block full-width"
        style={{ marginLeft: 0, marginRight: 0, position: 'relative' }}
      >
        <div className="col-xs-12 col-sm-6 col-md-6 mgb-5 flex" style={{ paddingLeft: 0 }}>
          <div className="flex align-self-center padr-5" style={trashStyle}>
            <ActionButton
              iconClass={ICON_TYPE.DELETE}
              btnClass="danger-color"
              disabled={readOnly}
              tooltipText={wordings.translationDel}
              clickAction={onRemoveLine}
            />
          </div>
          <SelectLanguage
            key={`${key}-lang`}
            name="lang"
            excludes={excludes}
            value={lang}
            components={{ Placeholder: PlaceholderWithTooltip }}
            placeholder={wordings.selectLanguage}
            isDisabled={isDefaultLang || readOnly}
            required={true}
            onChange={onKeyChange}
          />
        </div>
        <div
          className={cx('col-xs-12 col-sm-6 col-md-6 mgb-5', inputRequired)}
          style={{ paddingLeft: 0 }}
        >
          {this.renderInput(valueProps)}
        </div>
      </div>
    ) : (
      <div
        key={key}
        className="row form-group"
        style={{ marginLeft: 0, marginRight: 0, display: 'flex' }}
      >
        {this.renderInput(valueProps)}
      </div>
    );
  }

  private renderInput(props): JSX.Element {
    return this.props.useTextarea ? <Textarea {...props} /> : <Input {...props} />;
  }

  private addNewLine(): void {
    this.setState({
      translations: this.state.translations.concat({
        id: uuid.v4(),
        lang: '',
        value: '',
      }),
    });
  }

  private removeLine(id: string): void {
    const translations = this.state.translations.filter((t) => t.id !== id);
    const data = translations.reduce((a, b) => ({ ...a, [b.lang]: b.value }), {});
    this.props.onChange(data);
    this.setState({ translations });
  }

  private onKeyChangeHandler(id: string): (lang: LanguageCode | undefined | null) => void {
    return (lang: LanguageCode | undefined | null): void => {
      if (lang === undefined || lang === null) {
        return;
      }

      const translations = this.state.translations.map((t) => (t.id === id ? { ...t, lang } : t));
      this.props.onChange(this.convertTranslationTypeToLangMap(translations));

      this.setState({
        translations,
      });
    };
  }

  private onValueChangeHandler(id: string): (event: ChangeEvent<HTMLInputElement>) => void {
    return (event: ChangeEvent<HTMLInputElement>): void => {
      const value: string = event.target.value;
      const translations = this.state.translations.map((t) => (t.id === id ? { ...t, value } : t));
      this.props.onChange(this.convertTranslationTypeToLangMap(translations));

      this.setState({
        translations,
      });
    };
  }

  private convertTranslationTypeToLangMap(translations: TranslationType[]): {
    [lang: string]: string;
  } {
    return translations.reduce((a, b) => {
      return { ...a, [b.lang]: b.value };
    }, {});
  }
}

export default TranslationField;
