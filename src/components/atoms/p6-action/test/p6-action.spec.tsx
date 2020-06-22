import { newSpecPage } from "@stencil/core/testing";
import { P6Action } from "../p6-action";

describe("p6-action", () => {
  describe("mode", () => {
    const modes = ["danger", "warning", "info", "success", "primary"];

    it.each(modes)('has the class "is-%s" when mode is "%s"', async (mode) => {
      const page = await newSpecPage({
        components: [P6Action],
        html: `<p6-action mode=${mode}></p6-action>`,
      });
      expect(page.root).toMatchSnapshot();
    });

    it("does not add class when mode is default", async () => {
      const page = await newSpecPage({
        components: [P6Action],
        html: `<p6-action mode="default"></p6-action>`,
      });
      expect(page.root).toMatchSnapshot();
    });

    it("does not add class when mode is undefined", async () => {
      const page = await newSpecPage({
        components: [P6Action],
        html: `<p6-action mode=${undefined}></p6-action>`,
      });
      expect(page.root).toMatchSnapshot();
    });
  });

  describe("waiting", () => {
    it('has a "is-loading" class when waiting is true', async () => {
      const page = await newSpecPage({
        components: [P6Action],
        html: `<p6-action waiting="true"></p6-action>`,
      });
      expect(page.root).toMatchSnapshot();
    });
    it('has no "is-loading" class when waiting is false', async () => {
      const page = await newSpecPage({
        components: [P6Action],
        html: `<p6-action waiting="false"></p6-action>`,
      });
      expect(page.root).toMatchSnapshot();
    });
  });

  describe("disabled", () => {
    it('has a "disabled" attribute on the button when disabled is true', async () => {
      const page = await newSpecPage({
        components: [P6Action],
        html: `<p6-action disabled="true"></p6-action>`,
      });
      expect(page.root).toMatchSnapshot();
    });
    it('has no "disabled" attribute on the button when disabled is false', async () => {
      const page = await newSpecPage({
        components: [P6Action],
        html: `<p6-action disabled="false"></p6-action>`,
      });
      expect(page.root).toMatchSnapshot();
    });
  });

  describe("size", () => {
    const sizes = ["small", "normal", "medium", "large"];

    it.each(sizes)('has the class "is-%s" when size is "%s"', async (size) => {
      const page = await newSpecPage({
        components: [P6Action],
        html: `<p6-action size=${size}></p6-action>`,
      });
      expect(page.root).toMatchSnapshot();
    });

    it("does not add class when size is default", async () => {
      const page = await newSpecPage({
        components: [P6Action],
        html: `<p6-action size="default"></p6-action>`,
      });
      expect(page.root).toMatchSnapshot();
    });
  });
});
