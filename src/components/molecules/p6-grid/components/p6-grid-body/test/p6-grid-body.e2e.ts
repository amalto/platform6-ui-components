import { newE2EPage } from "@stencil/core/testing";

describe("p6-grid-body", () => {
  it("renders", async () => {
    const page = await newE2EPage();
    await page.setContent("<p6-grid-body></p6-grid-body>");

    const element = await page.find("p6-grid-body");
    expect(element).toHaveClass("hydrated");
  });
});
