import { Component, ComponentInterface, Element, Event, EventEmitter, h, Host, Prop } from '@stencil/core';
import { Mode, Size } from '../../../shared/types';
import { getL10n, L10n } from '../../../utils/translations';
import { ServiceStatus } from './service-status.enum';

function actionHandler(emitter: EventEmitter | undefined): (event: Event) => void {
  return () => {
    emitter?.emit();
  };
}

@Component({
  tag: 'p6-service-panel',
  styleUrl: 'p6-service-panel.scss',
  shadow: true,
})
export class P6ServicePanel implements ComponentInterface {
  @Element() host!: HTMLP6ServicePanelElement;

  /**
   * Name of the service
   */
  @Prop() name!: string;

  /**
   * Version of the service
   */
  @Prop() version: string | undefined;

  /**
   * Status of the service
   */
  @Prop() status: ServiceStatus | undefined;

  /**
   * Fires when the user tries to reload the service
   */
  @Event({ eventName: 'p6ReloadService' }) reloadEmitter?: EventEmitter<void>;

  /**
   * Fires when the user tries to refresh the service
   */
  @Event({ eventName: 'p6RefreshService' }) refreshEmitter?: EventEmitter<void>;

  /**
   * Fires when the user tries to start the service
   */
  @Event({ eventName: 'p6StartService' }) startEmitter?: EventEmitter<void>;

  /**
   * Fires when the user tries to stop the service
   */
  @Event({ eventName: 'p6StopService' }) stopEmitter?: EventEmitter<void>;

  private l10n: L10n | undefined;

  async componentWillLoad(): Promise<void> {
    this.l10n = await getL10n(this.host);
  }

  render(): JSX.Element {
    const isStartServiceDisabled = ServiceStatus.Started === this.status || ServiceStatus.Restart === this.status;
    const isStopServiceDisabled = ServiceStatus.Stopped === this.status;
    // eslint-disable-next-line no-template-curly-in-string
    const titleTooltiptext = this.l10n?.serviceVersion.replace('${serviceVersion}', this.version || 'unknown');

    const statusTitle = this.l10n?.serviceStatus;
    const statusClass = { state: true, [`is-${this.statusColor}`]: true };

    return (
      <Host>
        <p6-panel hideable>
          <div slot="label">
            <h3 class="has-tooltip-arrow has-tooltip-bottom" data-tooltip={titleTooltiptext}>
              {this.name}
            </h3>
            <p6-action mode={Mode.primary} onClick={actionHandler(this.reloadEmitter)}>
              <p6-icon name="sync-alt" />
            </p6-action>
          </div>
          <div slot="header-actions">
            <div class="service-update_state">
              <p6-action onClick={actionHandler(this.refreshEmitter)}>
                <p6-icon name="sync-alt" />
              </p6-action>
              <span>{statusTitle}</span>
              {' : '}
              <span class={statusClass}>{this.statusLabel}</span>
            </div>
            <p6-button
              outlined
              size={Size.small}
              mode={isStartServiceDisabled ? Mode.default : Mode.primary}
              disabled={isStartServiceDisabled}
              onClick={actionHandler(this.startEmitter)}
            >
              <p6-icon name="play" />
              <span>{this.l10n?.start}</span>
            </p6-button>

            <p6-button
              outlined
              size={Size.small}
              mode={isStopServiceDisabled ? Mode.default : Mode.danger}
              disabled={isStopServiceDisabled}
              onClick={actionHandler(this.stopEmitter)}
            >
              <p6-icon name="stop" />
              <span>{this.l10n?.stop}</span>
            </p6-button>
          </div>
          <slot />
        </p6-panel>
      </Host>
    );
  }

  get statusLabel(): string {
    if (this.l10n === undefined || this.status === undefined) {
      return 'unknown';
    }

    switch (this.status) {
      case ServiceStatus.Started:
        return this.l10n.started;
      case ServiceStatus.Restart:
        return this.l10n.restart;
      case ServiceStatus.Stopped:
        return this.l10n.stopped;
      default:
        return 'unknown';
    }
  }

  get statusColor(): string {
    if (ServiceStatus.Started === this.status || ServiceStatus.Restart === this.status) {
      return 'success';
    }

    if (ServiceStatus.Stopped === this.status) {
      return 'danger';
    }

    return 'info';
  }
}
