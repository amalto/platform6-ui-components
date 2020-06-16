import { newSpecPage } from "@stencil/core/testing";
import { P6Hint } from "../p6-hint";

describe("p6-hint", () => {
  it("renders", async () => {
    const page = await newSpecPage({
      components: [P6Hint],
      html: `<p6-hint>hint text</p6-hint>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  describe("mode", () => {
    const modes = ["danger", "warning", "info", "success", "primary"];

    it.each(modes)('has the class "is-%s" when mode is "%s"', async (mode) => {
      const page = await newSpecPage({
        components: [P6Hint],
        html: `<p6-hint mode=${mode}>${mode}</p6-hint>`,
      });
      expect(page.root).toMatchSnapshot();
    });

    it("does not add class when mode is default", async () => {
      const page = await newSpecPage({
        components: [P6Hint],
        html: `<p6-hint mode="default">default</p6-hint>`,
      });
      expect(page.root).toMatchSnapshot();
    });

    it("does not add class when mode is undefined", async () => {
      const page = await newSpecPage({
        components: [P6Hint],
        html: `<p6-hint mode=${undefined}>undefined</p6-hint>`,
      });
      expect(page.root).toMatchSnapshot();
    });
  });
});
