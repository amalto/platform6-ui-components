import ActionButton from '@amalto/action-button';
import Help from '@amalto/help';
import { WebStorage } from '@amalto/typings';
import { getWordings } from '@amalto/helpers';
import { css, cx } from 'emotion';
import React, { ChangeEvent, Component } from 'react';
import uuid from 'uuid';
import { LanguageCode } from './constants/languages';
import { WORDINGS } from './constants/wordings';
import { Input } from './models/input.field';
import { Textarea } from './models/textarea.field';
import { SelectLanguage } from './models/language.field';
import { PlaceholderWithTooltip } from './models/select.field';

export interface TranslationProps {
	/** Set true to disable the support of internationalization. */
	disableMultilanguage?: boolean;
	/** Set to true if you want to use textarea instead of text input. */
	useTextarea?: boolean;
	/** Storage which contain instance and user informations. */
	webStorage: WebStorage;
	/** Input name. */
	name: string;
	/** Inuput label. */
	label: string | JSX.Element;
	/** Tooltip text displayed when hovering <span className='quote'>?</span> icon. */
	help?: string;
	/** Language options. */
	value: { [key: string]: string };
	/** Is field on readonly. */
	readOnly?: boolean;
	/** Triggered every time the value change. */
	onChange?: (value: { [key: string]: string }) => void;
	/**
	 * Language to use on the component which determine the search input's placeholder language. e.g: <span className='quote'>en-US</span>.
	 * Locales available at [Locale](#locale).
	 * Accessible via [WebStorage](#webstorage).
	 * @default 'en-US'
	 */
	locale?: string;
}

interface TranslationState {
	translations: { id: string; lang: string; value: string }[];
	wordings?: { [key: string]: string };
}

class TranslationField extends Component<TranslationProps, TranslationState> {
	private defaultLang = 'en';

	private style = css({
		'.inputRequired:after': {
			content: "'*'",
			color: '#e25d5d',
			marginLeft: 2,
			fontWeight: 'bold',
			position: 'absolute',
			top: 0,
			right: 0
		}
	});

	constructor(props: Readonly<TranslationProps>) {
		super(props);

		const translations = !props.disableMultilanguage
			? Object.keys(props.value)
				.map(lang => ({
					id: uuid(),
					lang,
					value: props.value[lang]
				})
			)
			: [
				{
					id: uuid(),
					lang: this.defaultLang,
					value: props.value[this.defaultLang]
				}
			];

		this.state = {
			translations,
			wordings: getWordings( WORDINGS, props.locale )
		};
	}

	componentDidUpdate?(_: Readonly<TranslationProps>, prevState: Readonly<TranslationState>): void {
		if (this.props.onChange) {
			const translationToPropagate: { [lang: string]: string } = this.state.translations
				.filter(t => !!t.lang && !!t.value)
				.reduce((acc, cur) => ({ ...acc, [cur.lang]: cur.value }), {});

			const previousPropagation: { [lang: string]: string } = prevState.translations
				.filter(t => !!t.lang && !!t.value)
				.reduce((acc, cur) => ({ ...acc, [cur.lang]: cur.value }), {});

			const hasNewTranslation =
				Object.keys(translationToPropagate).length !== Object.keys(previousPropagation).length;
			const hasValueUpdated = !Object.keys(previousPropagation)
				.map(key => translationToPropagate[key] === previousPropagation[key])
				.reduce((acc, cur) => acc && cur, true);

			if (hasNewTranslation || hasValueUpdated) {
				this.props.onChange(translationToPropagate);
			}
		}
	}

	render(): JSX.Element | null | false {
		const { disableMultilanguage, readOnly, label, help, name } = this.props
		const lines = this.state.translations.map(t => this.lineRender(t.lang, t.value, t.id));

		return (
			<div className={cx(
				'form-group pos-relative', {
					'mandatory': disableMultilanguage
				},
				this.style
			)}>
				<label>
					{label}
					<div style={{ display: disableMultilanguage || readOnly ? 'none' : 'inline-block' }}>
						<ActionButton
							iconClass='fas fa-plus-circle'
							tooltipText={this.state.wordings.translationAdd}
							btnClass='padl-10 primary-color'
							clickAction={this.addNewLine.bind(this)}
						/>
					</div>
					{help && <Help text={help} />}
				</label>
				<div style={{ paddingLeft: 0, paddingRight: 0 }}>
					{lines.length === 0 ? this.emptyContent() : lines}
				</div>
			</div>
		);
	}

	protected emptyContent(): JSX.Element {
		return <div className='padl-10 text-small'>{this.state.wordings.translationEmpty}</div>;
	}

	private lineRender(lang: string, value: string, key: string): JSX.Element {
		return this.formLineRender(
			lang,
			value,
			key,
			this.onKeyChangeHandler(key),
			this.onValueChangeHandler(key),
			(): void => this.removeLine(key),
			this.state.translations.map(t => t.lang).filter(l => !!l),
			this.props.readOnly,
			this.defaultLang === lang
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
		isDefaultLang?: boolean
	): JSX.Element {
		const inputRequired = cx({ inputRequired: !!lang });
		const { name } = this.props
		const { wordings } = this.state

		const valueProps = {
			key:`${key}-value`,
			id:`${key}-value`,
			name:`${name}.${lang}`,
			value:value,
			className:'form-control',
			readOnly:readOnly,
			required:!!lang,
			onChange:onValueChange
		}

		return !this.props.disableMultilanguage ? (
			<div
				key={key}
				className='row form-group mandatory'
				style={{ marginLeft: 0, marginRight: 0, display: 'flex' }}>
				<div className='col-xs-12 col-sm-5 col-md-5' style={{ paddingLeft: '0' }}>
					<SelectLanguage
						key={`${key}-lang`}
						name='lang'
						excludes={excludes}
						value={lang}
						components={{ Placeholder: PlaceholderWithTooltip }}
						placeholder={wordings.selectLanguage}
						isDisabled={isDefaultLang || readOnly}
						onChange={onKeyChange}
					/>
				</div>
				<div className={cx('col-xs-11 col-sm-6 col-md-6', inputRequired)}>
					{this.renderInput( valueProps )}
				</div>
				<div
					className='col-xs-1 col-sm-1 col-md-1'
					style={{
						paddingRight: 0,
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						textAlign: 'end'
					}}>
					<div style={{ display: isDefaultLang || readOnly ? 'none' : 'block' }}>
						<ActionButton
							iconClass='fas fa-trash-alt'
							btnClass='danger-color'
							disabled={readOnly}
							tooltipText={wordings.translationDel}
							clickAction={onRemoveLine}
						/>
					</div>
				</div>
			</div>
		) : (
			<div
				key={key}
				className='row form-group'
				style={{ marginLeft: 0, marginRight: 0, display: 'flex' }}>
				{this.renderInput( valueProps )}
			</div>
		);
	}

	private renderInput( props ): JSX.Element {
		return this.props.useTextarea ? (
			<Textarea {...props} />
		) : (
			<Input {...props} />
		)
	}

	private addNewLine(): void {
		this.setState({
			translations: this.state.translations.concat({ id: uuid(), lang: '', value: '' })
		});
	}

	private removeLine(id: string): void {
		this.setState({
			translations: this.state.translations.filter(t => t.id !== id)
		});
	}

	private onKeyChangeHandler(id: string): (lang: LanguageCode | undefined | null) => void {
		return (lang: LanguageCode | undefined | null): void => {
			if (lang === undefined || lang === null) {
				return;
			}

			this.setState({
				translations: this.state.translations.map(t => (t.id === id ? { ...t, lang } : t))
			});
		};
	}

	private onValueChangeHandler(id: string): (event: ChangeEvent<HTMLInputElement>) => void {
		return (event: ChangeEvent<HTMLInputElement>): void => {
			const translations = this.state.translations.map(t =>
				t.id === id ? { ...t, value: event.target.value } : t
			);

			this.setState({
				translations: translations
			});
		};
	}
}

export default TranslationField
