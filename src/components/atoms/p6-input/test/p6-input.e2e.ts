import { newE2EPage } from "@stencil/core/testing";

describe("p6-input", () => {
  it("renders", async () => {
    const page = await newE2EPage();
    await page.setContent("<p6-input></p6-input>");

    const element = await page.find("p6-input");
    expect(element).toHaveClass("hydrated");
  });

  it("should add the is-danger class when it is initialized with an invalid value", async () => {
    const page = await newE2EPage({
      html:
        '<p6-input name="code" pattern="00[6|7|8|9|11]" value="0042"></p6-input>',
    });

    const input = await page.find("p6-input input.is-danger");
    expect(input).not.toBeNull();
  });

  it("should check the validity of the value when it loses focus", async () => {
    const page = await newE2EPage({
      html: `
      <p6-input name="code" pattern="00[6|7|8|9|11]"></p6-input>
      <button>ok</button>
      `,
    });

    await page.focus("p6-input input");
    await page.keyboard.type("0042");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.waitForChanges();

    const input = await page.find("p6-input input.is-danger");
    expect(input).not.toBeNull();
  });
});
