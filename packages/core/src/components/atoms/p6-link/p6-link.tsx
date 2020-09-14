import { Component, h, Host, JSX, Prop } from '@stencil/core';
import { isEmpty } from '../../../utils/attribute';

export type Href = string | undefined;
export type Target = '_blank' | '_self' | '_parent' | '_top';

@Component({
  tag: 'p6-link',
  styleUrl: 'p6-link.scss',
  shadow: true,
})
export class P6Link {
  /**
   * The URL that the hyperlink points to.
   * Links are not restricted to HTTP-based URLs — they can use any URL scheme supported by browsers.
   */
  @Prop() href: string | undefined;

  /**
   * Sets or retrieves the relationship between the object and the destination of the link.
   * The value is a space-separated list of [link types](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types).
   * Only applies when an `href` is provided.
   */
  @Prop() rel: string | undefined;

  /**
   *  Sets or retrieves the window or frame at which to target content.
   * Only applies when an `href` is provided.
   */
  @Prop() target: Target | undefined;

  /**
   * This attribute instructs browsers to download a URL instead of navigating to
   * it, so the user will be prompted to save it as a local file. If the attribute
   * has a value, it is used as the pre-filled file name in the Save prompt
   * (the user can still change the file name if they want).
   * Only applies when an `href` is provided.
   */
  @Prop() download: string | undefined;

  render(): JSX.Element {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const TagType = isEmpty(this.href) ? 'button' : 'a';
    const attrs =
      TagType === 'button'
        ? {}
        : {
            rel: this.rel,
            href: this.href,
            target: this.target,
            download: this.download,
          };

    return (
      <Host>
        <TagType class="link" {...attrs}>
          <slot />
        </TagType>
      </Host>
    );
  }
}
