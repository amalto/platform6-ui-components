import { newSpecPage } from "@stencil/core/testing";
import { P6GridHeader } from "../p6-grid-header";

describe("p6-grid-header", () => {
  it("renders", async () => {
    const page = await newSpecPage({
      components: [P6GridHeader],
      html: `<p6-grid-header></p6-grid-header>`,
    });
    expect(page.root).toEqualHtml(`
      <p6-grid-header>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </p6-grid-header>
    `);
  });
});
