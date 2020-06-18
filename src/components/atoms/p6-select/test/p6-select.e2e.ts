import { newE2EPage } from "@stencil/core/testing";

describe("p6-select", () => {
  it("renders", async () => {
    const page = await newE2EPage();
    await page.setContent("<p6-select><option>value</option></p6-select>");

    const element = await page.find("p6-select");
    expect(element).toHaveClass("hydrated");
  });
});
