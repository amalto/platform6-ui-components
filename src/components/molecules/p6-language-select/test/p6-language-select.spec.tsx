import { newSpecPage } from "@stencil/core/testing";
import { P6LanguageSelect } from "../p6-language-select";

describe("p6-language-select", () => {
  it("renders", async () => {
    const page = await newSpecPage({
      components: [P6LanguageSelect],
      html: `<p6-language-select></p6-language-select>`,
    });
    expect(page.root).toMatchSnapshot();
  });
});
