import { Component, ComponentInterface, Element, Event, EventEmitter, forceUpdate, h, Host, JSX, Method, State } from '@stencil/core';
import { toArray } from '../../../utils/dom';
import { isTabValid } from './utils';

@Component({
  tag: 'p6-tabs',
  styleUrl: 'p6-tabs.scss',
  shadow: true,
})
export class P6Tabs implements ComponentInterface {
  @Element() host!: HTMLP6TabsElement;

  /**
   * Close tab event
   */
  @Event({ eventName: 'p6CloseTab' }) closeTabEmitter?: EventEmitter<{ tabId: string }>;

  @State() selectedTabId: string | undefined;

  /**
   * refresh the component
   */
  @Method()
  async refresh(): Promise<void> {
    forceUpdate(this.host);
  }

  /**
   * close a tab
   * @param tabId the id of the tab to be close
   */
  @Method()
  async close(tabId: string): Promise<boolean> {
    const tabToClose = this.host.querySelector<HTMLP6TabElement>(`#${tabId}`);

    if (tabToClose !== null) {
      this.closeTab(tabToClose);
      return Promise.resolve(true);
    }
    return Promise.resolve(false);
  }

  private getTabs(): HTMLP6TabElement[] {
    return toArray(this.host.children).filter(isTabValid);
  }

  componentWillLoad(): void {
    const tabs = this.getTabs();
    const selectedTab = tabs.find(tab => tab.active);

    if (tabs.length === 0) {
      return;
    }

    if (selectedTab === undefined) {
      tabs[0].active = true;
      this.selectedTabId = tabs[0].id;
    } else {
      this.selectedTabId = selectedTab.id;
    }
  }

  componentWillRender(): void {
    this.getTabs().forEach(tab => {
      if (tab.closed) {
        this.host.removeChild(tab);
      }
    });
  }

  render(): JSX.Element | null {
    const tabs = this.getTabs();

    if (tabs.length === 0) {
      return null;
    }

    return (
      <Host>
        <div class="tabs">
          <ul>{tabs.map(tab => this.renderTab(tab))}</ul>
        </div>
        <div class="tab-content">
          <slot />
        </div>
      </Host>
    );
  }

  private renderTab(tab: HTMLP6TabElement): JSX.Element {
    return (
      <li class="has-tooltip-arrow has-tooltip-bottom" data-tooltip={tab.title}>
        <a class={tab.active ? 'is-active' : undefined} href={`#${tab.id}`} onClick={this.selectTabHandler(tab)}>
          <span class="title">{tab.title}</span>
          <span aria-hidden="true" class={{ 'delete': true, 'disabled-close': !tab.closeable }} onClick={this.closeTabHandler(tab)} />
        </a>
      </li>
    );
  }

  private selectTabHandler(selectedTab: HTMLP6TabElement): (event: MouseEvent) => void {
    return (event: MouseEvent): void => {
      event.preventDefault();

      this.getTabs().forEach(tab => {
        // eslint-disable-next-line no-param-reassign
        tab.active = tab.id === selectedTab.id;
      });
      this.selectedTabId = selectedTab.id;
    };
  }

  private closeTabHandler(closedTab: HTMLP6TabElement): (event: MouseEvent) => void {
    return (event: MouseEvent): void => {
      event.preventDefault();
      event.stopPropagation();

      this.closeTab(closedTab);
    };
  }

  private closeTab(tabToclose: HTMLP6TabElement): void {
    tabToclose.close();

    const tabs = this.getTabs();
    const closedTabIndex = tabs.findIndex(tab => tab.id === tabToclose.id);

    if (tabToclose.active && tabs[closedTabIndex - 1] !== undefined) {
      tabs[closedTabIndex - 1].active = true;
      this.selectedTabId = tabs[closedTabIndex - 1].id;
    } else {
      forceUpdate(this.host);
    }

    this.closeTabEmitter?.emit({ tabId: tabToclose.id });
  }
}
