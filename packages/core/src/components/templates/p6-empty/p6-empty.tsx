import { icon } from '@fortawesome/fontawesome-svg-core';
import { Component, Element, h, Host, JSX } from '@stencil/core';
import { getL10n, L10n } from '../../../utils/translations';

@Component({
  tag: 'p6-empty',
  styleUrl: 'p6-empty.scss',
  shadow: true,
  assetsDirs: ['locales'],
})
export class P6Empty {
  @Element() element!: HTMLP6EmptyElement;

  private l10n: L10n | undefined;

  async componentWillLoad(): Promise<void> {
    this.l10n = await getL10n(this.element);
  }

  render(): JSX.Element {
    const img = icon({ prefix: 'far', iconName: 'folder-open' }, { classes: ['fa-3x'] });

    return (
      <Host>
        <slot name="image">
          <span class="icon is-large" innerHTML={img.html[0]} />
        </slot>
        <slot>{this.l10n?.emptyMessage}</slot>
      </Host>
    );
  }
}
