import {
  Component,
  Element,
  h,
  Host,
  Method,
  Prop,
  State,
} from "@stencil/core";
import { isEmpty } from "~utils/attribute";

export interface Tab {
  id: string;
  title: string;
}

@Component({
  tag: "p6-tabs",
  styleUrl: "p6-tabs.scss",
  shadow: true,
})
export class P6Tabs {
  @Element() host!: HTMLP6TabsElement;

  /**
   * Default tab selected.
   */
  @Prop() default: string | undefined;

  /**
   * Set selected tab.
   */
  @State() tabSelected!: string | undefined;

  /**
   * Public method to set tabSelected id.
   * Use this method by keeping a ref of the component.
   *
   * @param id Id to be selected
   */
  @Method()
  async setTabSelected(id: string): Promise<void> {
    if (this.getTabs().some((tab) => tab.id === id)) {
      this.tabSelected = this.getTabId(id);
    }
  }

  /**
   * Return the formated tab id
   *
   * @param { string } id
   */
  private getTabId = (id: string): string => {
    return `${id}-tab`;
  };

  /**
   * Set selected tab
   *
   * @param {MouseEvent} event
   */
  private handleTabSelection = (event: MouseEvent): void => {
    event.preventDefault();
    const { id } = event.currentTarget as HTMLAnchorElement;
    this.tabSelected = id;
  };

  /**
   * Get tabs from slot sttributes.
   */
  private getTabs(): Tab[] {
    return Array.from(this.host.children)
      .filter(
        (c) =>
          !isEmpty(c.getAttribute("title")) && !isEmpty(c.getAttribute("id"))
      )
      .map((c) => ({
        title: c.getAttribute("title") as string,
        id: c.getAttribute("id") as string,
      }));
  }

  private getContent(): JSX.Element {
    const child = Array.from(this.host.children).filter((c) => {
      const id = c.getAttribute("id");
      return (
        !isEmpty(c.getAttribute("title")) &&
        !isEmpty(id) &&
        this.getTabId(id as string) === this.tabSelected
      );
    })[0];

    return <div class="tab-content">{child?.innerHTML}</div>;
  }

  componentWillLoad(): void {
    this.tabSelected = this.getTabId(this.default || this.getTabs()[0]?.id);
  }

  render(): JSX.Element | null {
    const { tabSelected } = this;
    const tabs = this.getTabs();

    if (tabs.length === 0) {
      return null;
    }

    return (
      <Host>
        <div class="tabs">
          <ul>
            {tabs.map((tab) => (
              <li
                class={
                  tabSelected === this.getTabId(tab.id)
                    ? "is-active"
                    : undefined
                }
              >
                <a
                  href={`#${tab.id}`}
                  id={`${this.getTabId(tab.id)}`}
                  onClick={this.handleTabSelection}
                >
                  {tab.title}
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
