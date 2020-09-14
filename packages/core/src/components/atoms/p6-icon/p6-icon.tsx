import { icon, IconName, IconPrefix, parse } from '@fortawesome/fontawesome-svg-core';
import { Component, Element, h, JSX, Prop } from '@stencil/core';
import { Size } from '../../../shared/types';
import { cleanupAttributes, isEmpty } from '../../../utils/attribute';
import { getSizeClass } from '../../../utils/classes';

export type IconStyle = IconPrefix;

@Component({
  tag: 'p6-icon',
  styleUrl: 'p6-icon.scss',
  shadow: true,
})
export class P6Icon {
  @Element() host!: HTMLP6IconElement;

  /**
   * Icon name
   */
  @Prop() name!: IconName;

  /**
   * set the size of the button
   */
  @Prop() size: Size = Size.normal;

  /**
   * Style prefix
   */
  @Prop({ attribute: 'iconPrefix' }) iconPrefix: IconPrefix = 'fas';

  /**
   * transformation performed on the icon.
   */
  @Prop() transform: string | undefined;

  render(): JSX.Element | null {
    const transform = isEmpty(this.transform) ? undefined : parse.transform(this.transform as string);

    const img = icon({ prefix: this.iconPrefix, iconName: this.name }, cleanupAttributes({ transform }));

    if (img === undefined) {
      // eslint-disable-next-line no-console
      console.debug(`p6-icon : could not find icon ${this.name} (style: ${this.iconPrefix})`);
      return null;
    }

    const classes = {
      icon: true,
      ...getSizeClass(this.size),
    };

    return <span class={classes} innerHTML={img.html[0]} />;
  }
}
