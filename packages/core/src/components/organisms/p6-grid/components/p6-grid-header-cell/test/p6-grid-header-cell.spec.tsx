import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { fromDefinition } from '../../../core/column';
import { Column, DataItem } from '../../../core/entities';
import { P6GridHeaderCell } from '../p6-grid-header-cell';

describe('p6-grid-header-cell', () => {
  it('should render a cell', async () => {
    const column: Column<DataItem> = fromDefinition({
      id: 'first',
      label: 'First Col',
      field: 'first',
      editable: true,
      width: 150,
    });

    const page = await newSpecPage({
      components: [P6GridHeaderCell],
      template: () => <p6-grid-header-cell column={column} width={column.width} sortOrder={column.sortOrder} />,
    });

    expect(page.root).toMatchSnapshot();
  });
});
