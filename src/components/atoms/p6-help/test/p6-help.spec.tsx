import { library } from "@fortawesome/fontawesome-svg-core";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { newSpecPage } from "@stencil/core/testing";
import { P6Help } from "../p6-help";

library.add(faQuestionCircle);

describe("p6-help", () => {
  it("default output", async () => {
    const page = await newSpecPage({
      components: [P6Help],
      html: `<p6-help text="Tooltip"></p6-help>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  describe("with position", () => {
    ["right", "left", "top", "bottom"].forEach((position) => {
      it(position, async () => {
        const page = await newSpecPage({
          components: [P6Help],
          html: `<p6-help text="Position ${position}" position="${position}"></p6-help>`,
        });

        expect(page.root).toMatchSnapshot();
      });
    });
  });

  describe("with mode", () => {
    ["danger", "warning", "default", "info", "success", "primary"].forEach(
      (mode) => {
        it(mode, async () => {
          const page = await newSpecPage({
            components: [P6Help],
            html: `<p6-help text="Mode ${mode}" mode="${mode}"></p6-help>`,
          });

          expect(page.root).toMatchSnapshot();
        });
      }
    );
  });
});
