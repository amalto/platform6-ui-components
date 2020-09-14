import { Component, Element, Event, EventEmitter, h, Host, Prop } from '@stencil/core';
import { toArray } from '../../../utils/dom';
import { getTabId, isTabValid } from './utils';

@Component({
  tag: 'p6-tabs',
  styleUrl: 'p6-tabs.scss',
  shadow: true,
})
export class P6Tabs {
  @Element() host!: HTMLP6TabsElement;

  /**
   * Default tab selected.
   */
  // eslint-disable-next-line @stencil/strict-mutable
  @Prop({ mutable: true }) selected: string | undefined;

  /**
   * Close tab event
   */
  @Event({ eventName: 'p6CloseTab' }) closeTab!: EventEmitter<{
    tabId: string;
  }>;

  private handleTabSelection = (event: MouseEvent): void => {
    event.preventDefault();
    const { id } = event.currentTarget as HTMLAnchorElement;
    this.selected = id;
  };

  private getTabs(): HTMLElement[] {
    return toArray(this.host.children).filter(isTabValid);
  }

  private getContent(): JSX.Element {
    const child = this.getTabs().find(tab => this.selected === getTabId(tab.id));

    return <div class="tab-content">{child?.innerHTML}</div>;
  }

  private closeTabHandler = (event: MouseEvent, tabId: string): void => {
    event.preventDefault();
    event.stopPropagation();
    this.closeTab.emit({ tabId });
  };

  componentWillLoad(): void {
    this.selected = getTabId(this.selected || this.getTabs()[0]?.id);
  }

  render(): JSX.Element | null {
    const { selected } = this;
    const tabs = this.getTabs();

    if (tabs.length === 0) {
      return null;
    }

    return (
      <Host>
        <div class="tabs">
          <ul>
            {tabs.map(tab => (
              <li class="has-tooltip-arrow has-tooltip-bottom" data-tooltip={tab.title}>
                <a class={selected === getTabId(tab.id) ? 'is-active' : undefined} href={`#${tab.id}`} id={`${getTabId(tab.id)}`} onClick={this.handleTabSelection}>
                  <span class="title">{tab.title}</span>
                  <span
                    aria-hidden="true"
                    class={`${tab.className} delete`}
                    // eslint-disable-next-line react/jsx-no-bind
                    onClick={event => this.closeTabHandler(event, tab.id)}
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
        {this.getContent()}
      </Host>
    );
  }
}
