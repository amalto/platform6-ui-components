import { newSpecPage } from "@stencil/core/testing";
import { P6Calendar } from "../p6-calendar";

describe("p6-calendar", () => {
  it("renders", async () => {
    const page = await newSpecPage({
      components: [P6Calendar],
      html: `<p6-calendar></p6-calendar>`,
    });
    expect(page.root).toMatchSnapshot();
  });
});
