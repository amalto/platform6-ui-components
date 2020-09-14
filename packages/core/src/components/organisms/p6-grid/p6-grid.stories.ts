import { JSX } from '@stencil/core';
import { Components } from '../../../components';
import { ComponentProps, getElement, makeStory, Props } from '../../../shared/storybook';
import { Alignment } from '../../../shared/types';
import { ColumnDefinition, DataItem, Row } from './core/entities';

const component = 'p6-grid';

export default {
  title: 'Organisms/Grid',
  component,
};

const componentProps: ComponentProps = ['customContextMenu', 'loading', 'definitions', 'data'];

interface StoryItem {
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
    width: 150,
    align: Alignment.end,
  },
  {
    id: 'third',
    label: 'Third Col',
    field: 'third',
    editable: true,
    getValue: data => data.third as string,
  },
  {
    label: 'Fourth',
    editable: false,
    hidden: true,
    disableHeaderMenu: true,
    getValue: data => (data.fourth as string) || 'N/A',
  },
  {
    label: 'Last',
    editable: false,
    width: 300,
    getValue: data => Object.values(data).join('-'),
  },
];

const storyItems: StoryItem[] = [
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

const customContextMenu = (row: Row<DataItem>): JSX.Element => {
  const data = Object.entries(row.data)
    .map(([key, value]) => `⇾ ${key}: ${value}`)
    .join('\n');

  return (`Context menu exemple, ${row.id} : ${data}` as unknown) as JSX.Element;
};

function getStoryField(data: StoryItem[], props?: Props<Components.P6Grid>): HTMLElement {
  const innerProps = {
    definitions,
    customContextMenu,
    data,
    loading: props?.loading === true,
  };

  return getElement(component, [], innerProps);
}

export const Default = makeStory({
  componentProps,
  args: {
    loading: false,
    empty: false,
  },
  builder: args => getStoryField(storyItems, args),
});

export const Loading = makeStory({
  componentProps,
  builder: () => getStoryField(storyItems, { loading: true }),
});

export const Empty = makeStory({
  componentProps,
  builder: () => getStoryField([], {}),
});
