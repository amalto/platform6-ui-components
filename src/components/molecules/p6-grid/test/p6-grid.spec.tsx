import { h } from "@stencil/core";
import { newSpecPage } from "@stencil/core/testing";
import { Row } from "~shared/grid";
import { P6Grid } from "../p6-grid";

const id = "p6-grid-test";
const headers = [
  { id: "col-1", label: "First", width: 150 },
  { id: "col-2", label: "Second", width: 150 },
  { id: "col-3", label: "Third", width: 100 },
  { id: "col-4", label: "Fourth", width: 100 },
];
const rows: Row[] = [
  {
    cells: [
      { editable: true, headerId: "col-2", label: "1 second cell row 1" },
      {
        align: "center",
        editable: true,
        headerId: "col-1",
        label: "1 first cell row 1",
        width: 150,
      },
      { editable: true, headerId: "col-3", label: "1 third cell row 1" },
      { editable: true, headerId: "col-4", label: "1 fourth cell row 1" },
    ],
  },
];

describe("p6-grid", () => {
  it("should render an empty grid", async () => {
    const page = await newSpecPage({
      components: [P6Grid],
      flushQueue: false,
      template: () => {
        return <p6-grid headers={[]} rows={[]} />;
      },
    });
    expect(page.root).toMatchSnapshot();
  });
  it("should render a grid with on row", async () => {
    const page = await newSpecPage({
      components: [P6Grid],
      template: () => {
        return <p6-grid id={id} headers={headers} rows={rows} />;
      },
    });
    expect(page.root).toMatchSnapshot();
  });
});
