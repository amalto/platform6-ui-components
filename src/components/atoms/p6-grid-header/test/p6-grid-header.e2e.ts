import { newE2EPage } from "@stencil/core/testing";

describe("p6-grid-header", () => {
  it("renders", async () => {
    const page = await newE2EPage();
    await page.setContent("<p6-grid-header></p6-grid-header>");

    const element = await page.find("p6-grid-header");
    expect(element).toHaveClass("hydrated");
  });
});
