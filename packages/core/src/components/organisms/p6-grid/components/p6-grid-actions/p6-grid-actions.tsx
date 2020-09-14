import { IconName } from '@fortawesome/fontawesome-svg-core';
import { Component, ComponentInterface, Element, Event, EventEmitter, h, Host, JSX, Prop } from '@stencil/core';
import { Mode } from '../../../../../shared/types';
import { getL10n, L10n } from '../../../../../utils/translations';
import { isHidden } from '../../core/column';
import { Column, DataItem, FilterRowsDetail, ResetDefinitionsDetail, ShowOptionsDetail } from '../../core/entities';
import { P6GridButtonItem } from '../p6-grid-button-item';

@Component({
  tag: 'p6-grid-actions',
  styleUrl: 'p6-grid-actions.scss',
  assetsDirs: ['locales'],
  shadow: true,
})
export class P6GridActions implements ComponentInterface {
  @Element() host!: HTMLP6GridActionsElement;

  /**
   * List of grid columns
   */
  @Prop() columns!: Column<DataItem>[];

  /**
   * Value used to filter the data
   */
  @Prop() searchValue: string | undefined;

  /**
   * Hide grid options
   */
  @Prop() hideOptions = false;

  /**
   * Reset the grid configuration
   */
  @Event() p6ResetCustomDefinitions!: EventEmitter<ResetDefinitionsDetail>;

  /**
   * Show or hide the grid options
   */
  @Event() p6ShowOptions!: EventEmitter<ShowOptionsDetail>;

  /**
   * Update the data filter
   */
  @Event() p6FilterRows!: EventEmitter<FilterRowsDetail>;

  private l10n: L10n | undefined;

  async componentWillLoad(): Promise<void> {
    this.l10n = await getL10n(this.host);
  }

  render(): JSX.Element {
    const hasHiddenColumns = this.columns.filter(isHidden).length > 0;
    let toggleDisplayOptionsIcon: IconName = 'eye';
    let toggleDisplayOptionsLabel = this.l10n?.showsHiddenColumns;

    if (!this.hideOptions) {
      toggleDisplayOptionsIcon = 'eye-slash';
      toggleDisplayOptionsLabel = this.l10n?.hidesHiddenColumns;
    }

    return (
      <Host>
        <div class="level-left">
          {hasHiddenColumns ? (
            <P6GridButtonItem icon={toggleDisplayOptionsIcon} clickHandler={this.toggleDisplayOptionsHandler(!this.hideOptions)} tooltip={toggleDisplayOptionsLabel} />
          ) : undefined}

          <P6GridButtonItem icon="eraser" mode={Mode.danger} clickHandler={this.resetCustomDefinitionsHandler()} tooltip={this.l10n?.reset} />
          <slot />
        </div>
        <div class="level-right">
          <div class="level-item control has-icons-left">
            <p6-icon class="icon is-left" name="search" />
            <input class="input is-small" onKeyUp={this.filterRowsHandler()} placeholder={this.l10n?.search} type="text" value={this.searchValue} />
          </div>
        </div>
      </Host>
    );
  }

  private toggleDisplayOptionsHandler(isDisplayed: boolean): (event: Event) => void {
    return (event: Event) => {
      event.preventDefault();
      event.stopImmediatePropagation();

      this.p6ShowOptions.emit({ visible: !isDisplayed });
    };
  }

  private resetCustomDefinitionsHandler(): (event: Event) => void {
    return (event: Event) => {
      event.preventDefault();
      event.stopImmediatePropagation();

      this.p6ResetCustomDefinitions.emit({ reset: true });
    };
  }

  private filterRowsHandler(): (event: KeyboardEvent) => void {
    return (event: KeyboardEvent) => {
      event.preventDefault();
      event.stopImmediatePropagation();

      this.p6FilterRows.emit({
        value: (event.target as HTMLInputElement).value,
      });
    };
  }
}
