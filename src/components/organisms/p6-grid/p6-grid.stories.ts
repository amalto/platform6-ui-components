import { Alignment } from "../../../shared/types";
import { ColumnDefinition, DataItem, Row } from "./core/entities";

export default {
  title: "Organisms/Grid",
  component: "p6-grid",
};

interface StoryItem {
  first: string;
  second: string;
  third: string;
  [key: string]: string;
}

const definitions: ColumnDefinition<DataItem>[] = [
  {
    id: "first",
    label: "First Col",
    field: "first",
    editable: true,
    width: 150,
  },
  {
    label: "Second Col",
    field: "second",
    editable: true,
    width: 150,
    align: Alignment.End,
  },
  {
    id: "third",
    label: "Third Col",
    field: "third",
    editable: true,
    getValue: (data) => data.third as string,
  },
  {
    label: "Fourth",
    editable: false,
    hidden: true,
    disableHeaderMenu: true,
    getValue: (data) => (data.fourth as string) || "N/A",
  },
  {
    label: "Last",
    editable: false,
    width: 300,
    getValue: (data) => Object.values(data).join("-"),
  },
];

const storyItems: StoryItem[] = [
  {
    first: "row(1) - col(first)",
    second: "row(1) - col(second)",
    third: "row(1) - col(third)",
  },
  {
    first: "row(2) - col(first)",
    second: "row(2) - col(second)",
    third: "row(2) - col(third)",
    fourth: "row(2) - col(Fourth)",
  },
  {
    first: "row(3) - col(first)",
    second: "row(3) - col(second)",
    third: "row(3) - col(third)",
  },
  {
    first: "row(4) - col(first)",
    second: "row(4) - col(second)",
    third: "row(4) - col(third)",
  },
  {
    first: "row(5) - col(first)",
    second: "row(5) - col(second)",
    third: "row(5) - col(third)",
  },
  {
    first: "row(6) - col(first)",
    second: "row(6) - col(second)",
    third: "row(6) - col(third)",
    fourth: "row(6) - col(Fourth)",
    fifth: "row(6) - col(Fourth)",
  },
];

const customContextMenu = (row: Row<DataItem>): JSX.Element => {
  const data = Object.entries(row.data)
    .map(([key, value]) => `⇾ ${key}: ${value}`)
    .join("\n");

  return (`Context menu exemple, ${row.id} : ${data}` as unknown) as JSX.Element;
};

export const Sample = (): HTMLP6GridElement => {
  const kLoading = boolean("Loading", false);
  const kEmpty = boolean("Empty", false);

  const grid = document.createElement("p6-grid");
  grid.loading = kLoading;
  grid.definitions = definitions;
  grid.data = kEmpty ? [] : storyItems;
  grid.loading = kLoading;
  grid.customContextMenu = customContextMenu;

  return grid;
};

export const Loading = (): HTMLP6GridElement => {
  const grid = document.createElement("p6-grid");
  grid.loading = true;
  grid.definitions = definitions;
  grid.data = storyItems;
  return grid;
};

export const Empty = (): HTMLP6GridElement => {
  const grid = document.createElement("p6-grid");
  grid.definitions = definitions;
  grid.data = [];
  return grid;
};
