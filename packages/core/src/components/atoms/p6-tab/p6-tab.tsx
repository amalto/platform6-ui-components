import { Component, ComponentInterface, Element, Event, EventEmitter, h, Host, Method, Prop } from '@stencil/core';

const tabIds = 0;

@Component({
  tag: 'p6-tab',
  styleUrl: 'p6-tab.scss',
  shadow: true,
})
export class P6Tab implements ComponentInterface {
  @Element() host!: HTMLP6TabElement;

  /**
   * Set the tab active
   */
  @Prop({ reflect: true }) active = false;

  /**
   * Set the tab closeable
   */
  @Prop({ reflect: true }) closeable = false;

  /**
   * Set the tab hidden
   */
  @Prop({ mutable: true, reflect: true }) closed = false;

  /**
   * Fires when the tab has been closed
   */
  @Event({ eventName: 'p6Close' }) closeTab?: EventEmitter<boolean>;

  componentWillLoad(): void {
    if (this.host.id === '') {
      this.host.id = `tab-${tabIds + 1}`;
    }
  }

  render(): JSX.Element {
    return this.active && !this.closed ? (
      <Host>
        <slot />
      </Host>
    ) : null;
  }

  /**
   * Closes the tab if closeable
   */
  @Method()
  async close(): Promise<void> {
    if (this.closeable && this.closeTab !== undefined) {
      this.closed = true;
      this.closeTab.emit(this.closed);
    }
  }
}
