import { newE2EPage } from "@stencil/core/testing";

describe("p6-grid", () => {
  it("renders", async () => {
    const page = await newE2EPage();
    await page.setContent("<p6-grid></p6-grid>");

    const element = await page.find("p6-grid");
    expect(element).toHaveClass("hydrated");
  });
});
