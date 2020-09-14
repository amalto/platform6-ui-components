import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { Alignment } from '../../../../shared/types';
import { ColumnDefinition, DataItem } from '../core/entities';
import { P6Grid } from '../p6-grid';

interface TestItem {
  first: string;
  second: string;
  third: string;
  [key: string]: string;
}

const definitions: ColumnDefinition<DataItem>[] = [
  {
    id: 'first',
    label: 'First Col',
    field: 'first',
    editable: true,
    width: 150,
  },
  {
    label: 'Second Col',
    field: 'second',
    editable: true,
    align: Alignment.end,
  },
  {
    id: 'third',
    field: 'third',
    label: 'third',
    editable: true,
    getValue: data => data.third as string,
  },
  {
    label: 'Fourth',
    editable: false,
    hidden: true,
    getValue: data => (data.fourth as string) || 'N/A',
  },
  {
    label: 'Last',
    editable: false,
    getValue: data => Object.values(data).join('-'),
  },
];

const testItems: TestItem[] = [
  {
    first: 'row(1) - col(first)',
    second: 'row(1) - col(second)',
    third: 'row(1) - col(third)',
  },
  {
    first: 'row(2) - col(first)',
    second: 'row(2) - col(second)',
    third: 'row(2) - col(third)',
    fourth: 'row(2) - col(Fourth)',
  },
  {
    first: 'row(3) - col(first)',
    second: 'row(3) - col(second)',
    third: 'row(3) - col(third)',
  },
  {
    first: 'row(4) - col(first)',
    second: 'row(4) - col(second)',
    third: 'row(4) - col(third)',
  },
  {
    first: 'row(5) - col(first)',
    second: 'row(5) - col(second)',
    third: 'row(5) - col(third)',
  },
  {
    first: 'row(6) - col(first)',
    second: 'row(6) - col(second)',
    third: 'row(6) - col(third)',
    fourth: 'row(6) - col(Fourth)',
    fifth: 'row(6) - col(Fourth)',
  },
];

describe('p6-grid', () => {
  it('should render an empty grid', async () => {
    const page = await newSpecPage({
      components: [P6Grid],
      flushQueue: false,
      template: () => {
        return <p6-grid definitions={[]} data={[]} />;
      },
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should render a grid with on row', async () => {
    const page = await newSpecPage({
      components: [P6Grid],
      template: () => {
        return <p6-grid definitions={definitions} data={testItems} />;
      },
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should display a spinner', async () => {
    const page = await newSpecPage({
      components: [P6Grid],
      template: () => {
        return <p6-grid definitions={definitions} loading data={testItems} />;
      },
    });
    expect(page.body.childNodes[0]).toMatchSnapshot();
  });
  it('should display an empty message', async () => {
    const page = await newSpecPage({
      components: [P6Grid],
      template: () => {
        return <p6-grid definitions={definitions} data={[]} />;
      },
    });
    expect(page.body.childNodes[0]).toMatchSnapshot();
  });
});
