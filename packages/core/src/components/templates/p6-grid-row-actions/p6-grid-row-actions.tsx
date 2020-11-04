import { Component, Event, EventEmitter, h, Host, JSX, Prop } from '@stencil/core';
import { Mode } from '../../../shared/types';
import { RowId } from '../../organisms/p6-grid/core/entities';
import { Action, ActionsOptions } from './types';

function onActionClick(action: Action, rowId: RowId): (event: Event) => void {
  return () => {
    action.emitter()?.emit({ rowId });
  };
}
function renderAction(action: Action, rowId: RowId, option: { disabled: boolean }): JSX.Element | null {
  return (
    <p6-action key={action.id} title={action.title} mode={action.mode} disabled={option.disabled} onClick={onActionClick(action, rowId)}>
      <p6-icon name={action.icon} iconPrefix={action.iconPrefix} />
    </p6-action>
  );
}

@Component({
  tag: 'p6-grid-row-actions',
  styleUrl: 'p6-grid-row-actions.scss',
  shadow: true,
})
export class P6GridRowActions {
  /**
   * Id of the row
   */
  @Prop() rowId!: RowId;

  /**
   * options for the actions
   */
  @Prop() options?: ActionsOptions;

  /**
   * Set to true if row is being edited
   */
  @Prop() isRowEdited = false;

  /**
   * Fires when the user clicks on the view action
   */
  @Event({ eventName: 'p6ViewRow' }) viewEmitter?: EventEmitter<{ rowId: RowId }>;

  /**
   * Fires when the user clicks on the edit action
   */
  @Event({ eventName: 'p6EditRow' }) editEmitter?: EventEmitter<{ rowId: RowId }>;

  /**
   * Fires when the user clicks on the rename action
   */
  @Event({ eventName: 'p6RenameRow' }) renameEmitter?: EventEmitter<{ rowId: RowId }>;

  /**
   * Fires when the user clicks on the clone action
   */
  @Event({ eventName: 'p6CloneRow' }) cloneEmitter?: EventEmitter<{ rowId: RowId }>;

  /**
   * Fires when the user clicks on the export action
   */
  @Event({ eventName: 'p6ExportRow' }) exportEmitter?: EventEmitter<{ rowId: RowId }>;

  /**
   * Fires when the user clicks on the delete action
   */
  @Event({ eventName: 'p6DeleteRow' }) deleteEmitter?: EventEmitter<{ rowId: RowId }>;

  /**
   * Fires when the user clicks on the cancel action
   */
  @Event({ eventName: 'p6Cancel' }) cancelEmitter?: EventEmitter<{ rowId: RowId }>;

  private cancelAction: Action = {
    id: 'cancel',
    title: 'cancel',
    icon: 'undo-alt',
    emitter: () => this.cancelEmitter,
  };

  private actions: Action[] = [
    { id: 'create', title: 'view', icon: 'search-plus', emitter: () => this.viewEmitter },
    { id: 'view', title: 'edit', icon: 'pencil-alt', mode: Mode.warning, emitter: () => this.editEmitter },
    { id: 'edit', title: 'rename', icon: 'i-cursor', mode: Mode.warning, emitter: () => this.renameEmitter },
    { id: 'rename', title: 'copy', icon: 'copy', mode: Mode.primary, iconPrefix: 'far', emitter: () => this.cloneEmitter },
    { id: 'delete', title: 'export', icon: 'download', mode: Mode.info, emitter: () => this.exportEmitter },
    { id: 'export', title: 'delete', icon: 'trash-alt', mode: Mode.danger, emitter: () => this.deleteEmitter },
  ];

  private defaultOption = { disabled: false, canUse: true };

  render(): JSX.Element {
    return (
      <Host>
        <slot>
          {this.isRowEdited
            ? renderAction(this.cancelAction, this.rowId, { disabled: false })
            : this.actions.filter(action => this.getOptionOf(action.id).canUse).map(action => renderAction(action, this.rowId, this.getOptionOf(action.id)))}
        </slot>
      </Host>
    );
  }

  private getOptionOf(action: keyof ActionsOptions): { disabled: boolean; canUse: boolean } {
    if (this.options === undefined) {
      return this.defaultOption;
    }

    return this.options[action] || this.defaultOption;
  }
}
