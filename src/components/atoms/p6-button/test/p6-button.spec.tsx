import { newSpecPage } from "@stencil/core/testing";
import { P6Button } from "../p6-button";

describe("p6-button", () => {
  describe("mode", () => {
    const modes = ["danger", "warning", "info", "success", "primary"];

    it.each(modes)('has the class "is-%s" when mode is "%s"', async (mode) => {
      const page = await newSpecPage({
        components: [P6Button],
        html: `<p6-button mode=${mode}></p6-button>`,
      });
      expect(page.root).toMatchSnapshot();
    });

    it("does not add class when mode is default", async () => {
      const page = await newSpecPage({
        components: [P6Button],
        html: `<p6-button mode="default"></p6-button>`,
      });
      expect(page.root).toMatchSnapshot();
    });

    it("does not add class when mode is undefined", async () => {
      const page = await newSpecPage({
        components: [P6Button],
        html: `<p6-button mode=${undefined}></p6-button>`,
      });
      expect(page.root).toMatchSnapshot();
    });
  });

  describe("outlined", () => {
    it('has a "is-outlined" class when outlined is true', async () => {
      const page = await newSpecPage({
        components: [P6Button],
        html: `<p6-button outlined="true"></p6-button>`,
      });
      expect(page.root).toMatchSnapshot();
    });
    it('has no "is-outlined" class when outlined is false', async () => {
      const page = await newSpecPage({
        components: [P6Button],
        html: `<p6-button outlined="false"></p6-button>`,
      });
      expect(page.root).toMatchSnapshot();
    });
  });

  describe("waiting", () => {
    it('has a "is-loading" class when waiting is true', async () => {
      const page = await newSpecPage({
        components: [P6Button],
        html: `<p6-button waiting="true"></p6-button>`,
      });
      expect(page.root).toMatchSnapshot();
    });
    it('has no "is-loading" class when waiting is false', async () => {
      const page = await newSpecPage({
        components: [P6Button],
        html: `<p6-button waiting="false"></p6-button>`,
      });
      expect(page.root).toMatchSnapshot();
    });
  });

  describe("disabled", () => {
    it('has a "disabled" attribute on the button when disabled is true', async () => {
      const page = await newSpecPage({
        components: [P6Button],
        html: `<p6-button disabled="true"></p6-button>`,
      });
      expect(page.root).toMatchSnapshot();
    });
    it('has no "disabled" attribute on the button when disabled is false', async () => {
      const page = await newSpecPage({
        components: [P6Button],
        html: `<p6-button disabled="false"></p6-button>`,
      });
      expect(page.root).toMatchSnapshot();
    });
  });

  describe("size", () => {
    const sizes = ["small", "normal", "medium", "large"];

    it.each(sizes)('has the class "is-%s" when size is "%s"', async (size) => {
      const page = await newSpecPage({
        components: [P6Button],
        html: `<p6-button size=${size}></p6-button>`,
      });
      expect(page.root).toMatchSnapshot();
    });

    it("does not add class when size is default", async () => {
      const page = await newSpecPage({
        components: [P6Button],
        html: `<p6-button size="default"></p6-button>`,
      });
      expect(page.root).toMatchSnapshot();
    });
  });
});
