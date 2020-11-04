import { Component, ComponentInterface, Element, h, Host } from '@stencil/core';
import { P6Control } from '../../../shared/form/control';
import { P6Radio } from '../p6-radio/p6-radio';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isP6Radio(value: P6Control<any>): value is P6Radio {
  return 'checked' in value;
}

function isHTMLP6RadioElement(value: HTMLElement | EventTarget): value is HTMLP6RadioElement {
  return 'tagName' in value && value.tagName === 'P6-RADIO';
}

@Component({
  tag: 'p6-radio-group',
  styleUrl: './p6-radio-group.scss',
  shadow: true,
})
export class P6RadioGroup implements ComponentInterface {
  @Element() host!: HTMLP6RadioGroupElement;

  private controls: P6Radio[] = [];

  render(): void {
    return (
      <Host onP6FormRegister={this.addControl} onP6FormUnregister={this.removeControl} onClick={this.updateRadioControls}>
        <slot />
      </Host>
    );
  }

  private updateRadioControls = (event: Event): void => {
    if (event.target !== null && isHTMLP6RadioElement(event.target)) {
      const radioClicked = event.target;

      this.controls.forEach(radio => {
        if (radio.name === radioClicked.name && radio.value !== radioClicked.value) {
          // eslint-disable-next-line no-param-reassign
          radio.checked = false;
        }
      });
    }
  };

  private addControl = (event: CustomEvent<P6Control<unknown>>): void => {
    if (isP6Radio(event.detail)) {
      this.controls.push(event.detail);
    }
  };

  private removeControl = (event: CustomEvent<P6Control<unknown>>): void => {
    this.controls = this.controls.filter(radio => radio === event.detail);
  };
}
