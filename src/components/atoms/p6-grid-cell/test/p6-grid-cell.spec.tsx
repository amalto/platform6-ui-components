import { newSpecPage } from "@stencil/core/testing";
import { P6GridCell } from "../p6-grid-cell";

describe("p6-grid-cell", () => {
  it("renders", async () => {
    const page = await newSpecPage({
      components: [P6GridCell],
      html: `<p6-grid-cell></p6-grid-cell>`,
    });
    expect(page.root).toEqualHtml(`
      <p6-grid-cell>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </p6-grid-cell>
    `);
  });
});
