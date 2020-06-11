import { newSpecPage } from "@stencil/core/testing";
import { P6Tables } from "../p6-tables";

describe("p6-tables", () => {
  it("renders", async () => {
    const page = await newSpecPage({
      components: [P6Tables],
      html: `<p6-tables></p6-tables>`,
    });
    expect(page.root).toEqualHtml(`
      <p6-tables>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </p6-tables>
    `);
  });
});
