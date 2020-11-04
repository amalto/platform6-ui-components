import { Component, Element, h, Host, JSX, Prop, State } from '@stencil/core';
import { toArray } from '../../../utils/dom';

@Component({
  tag: 'p6-panel',
  styleUrl: 'p6-panel.scss',
  shadow: true,
})
export class P6Panel {
  @Element() host!: HTMLP6PanelElement;

  /**
   * Set the panel hideable
   */
  @Prop() hideable = false;

  @State() isHidden = false;

  render(): JSX.Element {
    const hasActions = toArray(this.host.children).filter(node => node.slot === 'actions').length > 0;

    return (
      <Host>
        <div class="panel-header">
          <slot name="label" />
          <slot name="header-actions" />
          {this.renderToggle(this.hideable, this.isHidden)}
        </div>
        <div class={{ 'panel-body': true, 'collapsed': this.isHidden }}>
          <slot />
        </div>
        {hasActions ? (
          <div class="panel-actions">
            <slot name="actions" />
          </div>
        ) : null}
      </Host>
    );
  }

  private renderToggle(hideable: boolean, hidden: boolean): JSX.Element {
    const icon = hidden ? 'angle-down' : 'angle-up';

    return hideable ? (
      <p6-action class="panel-action--toggle" onClick={this.onToggleHandler(!hidden)}>
        <p6-icon name={icon} />
      </p6-action>
    ) : null;
  }

  private onToggleHandler(hidden: boolean): (event: Event) => void {
    return () => {
      this.isHidden = hidden;
    };
  }
}
