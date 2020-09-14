import { Component, ComponentInterface, Element, Event, EventEmitter, h, Host, Prop } from '@stencil/core';
import { isP6NativeControl, P6Control, P6NativeControl } from '../../../shared/form/control';
import { isInvalidEvent, isValidEvent } from '../../../shared/form/event';
import { toArray } from '../../../utils/dom';

export type SubmitEventEmitter = EventEmitter<Map<string, unknown>>;

@Component({
  tag: 'p6-form',
  styleUrl: 'p6-form.scss',
  scoped: true,
})
export class P6Form implements ComponentInterface {
  @Element() host!: HTMLP6FormElement;

  /**
   * Sets or retrieves the name of the object.
   */
  @Prop() name?: string;

  /**
   * Fires when a FORM submitted is valid.
   */
  @Event() p6Submit!: EventEmitter<Map<string, unknown>>;

  private formControls: P6Control<unknown>[] = [];

  private nativeForm: HTMLFormElement | undefined;

  private errorMessages: Record<string, string> = {};

  private data: Map<string, unknown> = new Map();

  componentWillLoad(): void {
    if (this.nativeForm !== undefined) {
      toArray(this.nativeForm.elements).forEach(control => control.addEventListener('invalid', this.invalidHandler));
    }
  }

  render(): void {
    return (
      <Host onP6FormRegister={this.addCustomControl} onP6FormUnregister={this.removeCustomControl} onP6Valid={this.validHandler} onP6Invalid={this.invalidHandler}>
        <form
          noValidate
          name={this.name}
          onSubmit={this.submitHandler}
          onReset={this.resetHandler}
          ref={(ref): void => {
            this.nativeForm = ref;
          }}
        >
          <slot />
        </form>
      </Host>
    );
  }

  private submitHandler = async (event: Event): Promise<void> => {
    event.preventDefault();
    event.stopPropagation();

    const isValid = await this.checkValidity();

    if (isValid) {
      this.completeDataWithNativeControlData();
      this.p6Submit.emit(this.data);
    }
  };

  private resetHandler = async (): Promise<boolean> => {
    this.data.clear();

    const resetedControls = await Promise.all(this.formControls.map(elmt => (elmt.reset !== undefined ? elmt.reset() : Promise.resolve(true))));

    return resetedControls.reduce((acc: boolean, cur: boolean) => acc && cur, true);
  };

  private addCustomControl = (event: CustomEvent<P6Control<unknown>>): void => {
    this.formControls.push(event.detail);
  };

  private removeCustomControl = (event: CustomEvent<P6Control<unknown>>): void => {
    this.formControls = this.formControls.filter(fc => fc === event.detail);
  };

  private async checkValidity(): Promise<boolean> {
    const nativeValidity = await this.checkNativeElementsValidity();
    const registredValidity = await this.checkRegistredElementsValidity();

    return nativeValidity && registredValidity;
  }

  private async checkNativeElementsValidity(): Promise<boolean> {
    if (this.nativeForm === undefined) {
      return Promise.resolve(true);
    }

    const isValid = toArray(this.nativeForm.elements)
      .filter<P6NativeControl>(isP6NativeControl)
      .map(elmt => elmt.checkValidity())
      .reduce((acc, cur) => acc && cur);

    return Promise.resolve(isValid);
  }

  private async checkRegistredElementsValidity(): Promise<boolean> {
    const checkedValidity = await Promise.all(this.formControls.map(elmt => elmt.checkValidity()));

    return checkedValidity.reduce((acc: boolean, cur: boolean) => acc && cur, true);
  }

  private validHandler = (event: Event): void => {
    if (isValidEvent(event)) {
      this.errorMessages = Object.entries(this.errorMessages)
        .filter(([name]) => name !== event.detail.name)
        .reduce((acc, [name, message]) => ({ ...acc, [name]: message }), {});
      if (event.detail.value === undefined) {
        this.data.delete(event.detail.name);
      } else {
        this.data.set(event.detail.name, event.detail.value);
      }
    }
  };

  private invalidHandler = (event: Event): void => {
    if (isInvalidEvent(event)) {
      const { name, message } = event.detail;
      this.errorMessages[name] = message;

      this.data.delete(event.detail.name);
    }
  };

  private completeDataWithNativeControlData(): void {
    const formData = new FormData(this.nativeForm);
    formData.forEach((value, key) => {
      this.data.set(key, value);
    });
  }
}
