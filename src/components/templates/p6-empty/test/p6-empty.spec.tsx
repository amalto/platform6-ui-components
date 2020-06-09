import { library } from "@fortawesome/fontawesome-svg-core";
import { faFolderOpen } from "@fortawesome/free-regular-svg-icons";
import { newSpecPage } from "@stencil/core/testing";
import { P6Empty } from "../p6-empty";

library.add(faFolderOpen);

describe("p6-empty", () => {
  it("renders", async () => {
    const page = await newSpecPage({
      components: [P6Empty],
      html: `<p6-empty></p6-empty>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it("with message", async () => {
    const page = await newSpecPage({
      components: [P6Empty],
      html: `<p6-empty>No data!</p6-empty>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it("with image", async () => {
    const page = await newSpecPage({
      components: [P6Empty],
      html: `<p6-empty><p6-icon slot='image' name='home'/></p6-empty>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it("with image and message", async () => {
    const page = await newSpecPage({
      components: [P6Empty],
      html: `<p6-empty><p6-icon slot='image' name='home'/>No data!</p6-empty>`,
    });
    expect(page.root).toMatchSnapshot();
  });
});
