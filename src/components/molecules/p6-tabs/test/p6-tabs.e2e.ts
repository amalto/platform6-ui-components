import { newE2EPage } from "@stencil/core/testing";

describe("p6-tabs", () => {
  it("renders", async () => {
    const page = await newE2EPage();
    await page.setContent(`<p6-tabs></p6-tabs>`);

    const element = await page.find("p6-tabs");

    expect(element).toHaveClass("hydrated");
  });
});
