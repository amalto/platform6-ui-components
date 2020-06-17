import { newSpecPage } from "@stencil/core/testing";
import { P6GridBody } from "../p6-grid-body";

describe("p6-grid-body", () => {
  it("renders", async () => {
    const page = await newSpecPage({
      components: [P6GridBody],
      html: `<p6-grid-body></p6-grid-body>`,
    });
    expect(page.root).toEqualHtml(`
      <p6-grid-body>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </p6-grid-body>
    `);
  });
});
