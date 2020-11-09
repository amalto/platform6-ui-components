import { Component, Fragment, h, Prop } from '@stencil/core';

@Component({
  tag: 'p6-modal',
  styleUrl: 'p6-modal.scss',
  shadow: true,
})
export class P6Modal {
  /**
   * Display a modal with a head, a body and a foot
   */
  @Prop() hasCard = false;

  /**
   * Open the modal
   */
  @Prop({ mutable: true, reflect: true }) open = false;

  render(): JSX.Element {
    const classList = {
      'modal': true,
      'is-active': this.open,
    };

    return (
      <div class={classList}>
        <div class="modal-background" />

        {this.hasCard ? this.renderCard() : this.renderContent()}
      </div>
    );
  }

  private closeHandler(): (event: Event) => void {
    return () => {
      this.open = false;
    };
  }

  private renderContent(): JSX.Element {
    return (
      <Fragment>
        <div class="modal-content">
          <slot />
        </div>

        <button slot="close" class="modal-close is-large" type="button" aria-label="close" onClick={this.closeHandler()} />
      </Fragment>
    );
  }

  private renderCard(): JSX.Element {
    return (
      <div class="modal-card">
        <header class="modal-card-head">
          <span class="modal-card-title">
            <slot name="head" />
          </span>
          <button class="modal-card-close" type="button" aria-label="close" onClick={this.closeHandler()} />
        </header>

        <section class="modal-card-body">
          <slot />
        </section>

        <slot name="foot" />
      </div>
    );
  }
}
