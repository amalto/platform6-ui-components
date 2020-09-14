import { Component, ComponentInterface, Element, h, Host, JSX, State } from '@stencil/core';
import { toArray } from '../../../utils/dom';
import { addDropdownClass } from './utils';

@Component({
  tag: 'p6-dropdown',
  styleUrl: 'p6-dropdown.scss',
  shadow: true,
})
export class P6Dropdown implements ComponentInterface {
  @Element() host!: HTMLP6DropdownElement;

  @State() isActive = false;

  componentWillLoad(): void {
    this.host.addEventListener('focusout', this.onFocusOut);
  }

  render(): JSX.Element {
    const containerClass = {
      'dropdown': true,
      'is-active': this.isActive,
    };

    const children = toArray(this.host.children)
      .filter(c => c.slot !== 'label')
      .map(addDropdownClass)
      .map(c => c.outerHTML);

    return (
      <Host>
        <div class={containerClass}>
          <div class="dropdown-trigger">
            <p6-button class="button" aria-haspopup="true" aria-controls="dropdown-menu" onClick={this.toggleMenuHandler}>
              <slot name="label" />
            </p6-button>
          </div>
          <div class="dropdown-menu" id="dropdown-menu" role="menu">
            <div class="dropdown-content" innerHTML={children.join('')} />
          </div>
        </div>
      </Host>
    );
  }

  private toggleMenuHandler = (): void => {
    this.isActive = !this.isActive;
  };

  private onFocusOut = (): void => {
    this.isActive = false;
  };
}
