import { Component, ComponentInterface, Event, EventEmitter, h, Host, JSX, Prop, State } from '@stencil/core';
import { CellEditor, CellValueChangedDetail, Column, DataItem, EditingCellDetail, EditingCellStatus, Row } from '../../core/entities';

@Component({
  tag: 'p6-grid-textarea-cell-editor',
  styleUrl: 'p6-grid-textarea-cell-editor.scss',
  shadow: true,
})
export class P6GridTextareaCellEditor implements ComponentInterface, CellEditor<DataItem> {
  /**
   * the cell column
   */
  @Prop() column!: Column<DataItem>;

  /**
   * the cell row
   */
  @Prop() row!: Row<DataItem>;

  /**
   * Current cell value
   */
  @Prop() value!: string;

  /**
   * the cell value changed
   */
  @Event() p6GridCellValueChanged!: EventEmitter<CellValueChangedDetail<DataItem>>;

  /**
   * the editing status of this cell changed
   */
  @Event() p6GridEditingCell!: EventEmitter<EditingCellDetail<DataItem>>;

  @State() errorMessage: string | undefined;

  componentWillLoad(): void {
    this.p6GridEditingCell.emit({
      column: this.column,
      row: this.row,
      status: EditingCellStatus.Start,
    });
  }

  render(): JSX.Element {
    const hasError = this.errorMessage !== undefined && this.errorMessage?.trim() !== '';
    const classes = {
      'has-tooltip-arrow': hasError,
      'has-tooltip-multiline': hasError,
    };

    return (
      <Host>
        <form noValidate class={classes} data-tooltip={this.errorMessage}>
          <textarea required onChange={this.changeHandler} onKeyDown={this.keyUpHandler}>
            {this.column.getValue(this.row.data, this.column)}
          </textarea>
        </form>
      </Host>
    );
  }

  private changeHandler = (event: Event): void => {
    const input = event.target as HTMLTextAreaElement;

    const isValid = input.checkValidity();
    if (!isValid) {
      this.errorMessage = input.validationMessage;
    }
  };

  private keyUpHandler = (event: KeyboardEvent): void => {
    const isEnterKey = event.keyCode === 13;
    const isEscKey = event.keyCode === 27;
    const input = event.target as HTMLTextAreaElement;

    if (isEscKey) {
      this.p6GridEditingCell.emit({
        column: this.column,
        row: this.row,
        status: EditingCellStatus.Cancel,
      });
    }

    const isValid = input.checkValidity();
    if (!isValid) {
      this.errorMessage = input.validationMessage;
    }

    if (isEnterKey && !event.shiftKey) {
      event.preventDefault();
      if (isValid) {
        this.p6GridCellValueChanged.emit({
          column: this.column,
          row: {
            ...this.row,
            data: this.column.setValue(input.value, this.row.data, this.column),
          },
          oldValue: this.value,
        });
        this.p6GridEditingCell.emit({
          column: this.column,
          row: this.row,
          status: EditingCellStatus.Stop,
        });
      }
    }
  };
}
