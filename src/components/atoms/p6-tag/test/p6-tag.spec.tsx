import { newSpecPage } from "@stencil/core/testing";
import { Mode, Size } from "~shared/types";
import { P6Tag } from "../p6-tag";

describe("p6-tag", () => {
  it("renders", async () => {
    const page = await newSpecPage({
      components: [P6Tag],
      html: `<p6-tag>Tag</p6-tag>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it("mode", async () => {
    const page = await newSpecPage({
      components: [P6Tag],
      html: `<p6-tag mode=${Mode.warning}>Warning</p6-tag>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it("size", async () => {
    const page = await newSpecPage({
      components: [P6Tag],
      html: `<p6-tag size=${Size.large}>Large</p6-tag>`,
    });
    expect(page.root).toMatchSnapshot();
  });
});
