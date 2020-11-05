import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { fromDefinition } from '../../../core/column';
import { Column, DataItem, Row } from '../../../core/entities';
import { P6GridCell } from '../p6-grid-cell';

describe('p6-grid-cell', () => {
  const column: Column<DataItem> = fromDefinition({
    id: 'colId',
    label: 'Col Label',
    editable: true,
    width: 150,
    getValue: () => '',
  });

  const row: Row<DataItem> = {
    id: '1',
    data: {},
  };

  it('should render an empty cell', async () => {
    const page = await newSpecPage({
      components: [P6GridCell],
      template: () => {
        return <p6-grid-cell column={column} row={row} />;
      },
    });
    expect(page.root).toMatchSnapshot();
  });
});
