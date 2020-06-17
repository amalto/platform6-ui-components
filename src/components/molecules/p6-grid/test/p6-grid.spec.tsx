import { newSpecPage } from "@stencil/core/testing";
import { P6Tables } from "../p6-grid";

describe("p6-grid", () => {
  it("renders", async () => {
    const page = await newSpecPage({
      components: [P6Tables],
      html: `<p6-grid></p6-grid>`,
    });
    expect(page.root).toEqualHtml(`
      <p6-grid>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </p6-grid>
    `);
  });
});
