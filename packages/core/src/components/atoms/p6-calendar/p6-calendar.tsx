import { Component, ComponentInterface, Element, h, Host, JSX, Prop } from '@stencil/core';
import bulmaCalendar from 'bulma-calendar';
import { Mode } from '../../../shared/types';
import { toDate } from '../../../utils/attribute';
import { getClosestLanguage } from '../../../utils/language';
import { getL10n, L10n } from '../../../utils/translations';

export type P6CalendarType = 'date' | 'datetime' | 'time';

@Component({
  tag: 'p6-calendar',
  styleUrls: ['p6-calendar.scss'],
  shadow: true,
})
export class P6Calendar implements ComponentInterface {
  /**
   * The name
   */
  @Prop() public name!: string;

  /**
   * Type of field (date, time, datetime)
   */
  @Prop() public type: P6CalendarType = 'date';

  /**
   * Required - If `true`, the user must set a value to be valid
   */
  @Prop() required = false;

  /**
   * Disabled - If `true`, the user cannot interact with the field.
   */
  @Prop() disabled = false;

  /**
   * The color of the field
   */
  @Prop() color: Mode = Mode.info;

  /**
   * Marks the field as read only
   */
  @Prop({ attribute: 'readOnly' }) readOnly = false;

  /**
   * Range capability (start and end date/time selection)
   */
  @Prop({ attribute: 'isRange' }) isRange = false;

  /**
   * Pre-selected start date
   */
  @Prop({ attribute: 'startDate' }) startDate: string | undefined;

  /**
   * Pre-selected end date
   */
  @Prop({ attribute: 'endDate' }) endDate: string | undefined;

  /**
   * Minimum date allowed
   */
  @Prop({ attribute: 'minDate' }) minDate: string | undefined;

  /**
   * Maximum date allowed
   */
  @Prop({ attribute: 'maxDate' }) maxDate: string | undefined;

  /**
   * Steps for minutes selector
   */
  @Prop({ attribute: 'minuteSteps' }) minuteSteps = 5;

  /**
   * From label
   */
  @Prop({ attribute: 'labelFrom' }) labelFrom = '';

  /**
   * To label
   */
  @Prop({ attribute: 'labelTo' }) labelTo = '';

  @Element() private readonly host!: HTMLP6CalendarElement;

  private nativeInput: HTMLInputElement | undefined;

  private calendar: bulmaCalendar | undefined;

  private l10n: L10n | undefined;

  async componentWillLoad(): Promise<void> {
    this.l10n = await getL10n(this.host);
  }

  render(): JSX.Element {
    const attributes = {
      name: this.name,
    };

    return (
      <Host aria-disabled={this.disabled ? 'true' : null} disabled={this.disabled} readonly={this.readOnly}>
        <input
          ref={(input: HTMLInputElement | undefined): void => {
            this.nativeInput = input;
          }}
          {...attributes}
        />
      </Host>
    );
  }

  componentDidRender(): void {
    if (this.nativeInput === undefined) {
      return;
    }

    // eslint-disable-next-line new-cap
    this.calendar = new bulmaCalendar(this.nativeInput, {
      isRange: this.isRange,
      type: this.type,
      startDate: toDate(this.startDate),
      endDate: toDate(this.endDate),
      minDate: toDate(this.minDate),
      maxDate: toDate(this.maxDate),
      minuteSteps: this.minuteSteps,
      labelFrom: this.labelFrom,
      labelTo: this.labelTo,
      toggleOnInputClick: !this.readOnly && !this.disabled,
      showClearButton: false,
      color: Mode[this.color],
      dateFormat: 'YYYY-MM-DD',
      lang: getClosestLanguage(this.nativeInput),
      clearLabel: this.l10n?.clearLabel,
      todayLabel: this.l10n?.todayLabel,
      cancelLabel: this.l10n?.cancelLabel,
      nowLabel: this.l10n?.nowLabel,
      validateLabel: this.l10n?.validateLabel,
    });
  }

  disconnectedCallback(): void {
    this.calendar?.hide();
    this.calendar = undefined;
  }
}
