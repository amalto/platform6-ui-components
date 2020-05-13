import { newSpecPage } from "@stencil/core/testing";
import { P6Input } from "../p6-input";

describe("p6-input", () => {
  Object.defineProperty(HTMLInputElement.prototype, "checkValidity", {
    writable: true,
    value: jest.fn().mockImplementation(() => true)
  });

  it("renders", async () => {
    const page = await newSpecPage({
      components: [P6Input],
      html: `<p6-input>label</p6-input>`
    });
    expect(page.root).toEqualHtml(`
      <p6-input>
        <label class="label" htmlfor="undefined-input">label</label>
        <div class="control">
          <input class="input" id="undefined-input" type="text" />
        </div>
      </p6-input>
    `);
  });

  it("add the waiting class on the input container, not on the input", async () => {
    const page = await newSpecPage({
      components: [P6Input],
      html: `<p6-input waiting>label</p6-input>`
    });
    expect(page.root).toEqualHtml(`
      <p6-input waiting>
        <label class="label" htmlfor="undefined-input">label</label>
        <div class="control is-loading">
          <input class="input" id="undefined-input" type="text" />
        </div>
      </p6-input>
    `);
  });

  it('add the class "is-static" when the readonly props is true', async () => {
    const page = await newSpecPage({
      components: [P6Input],
      html: `<p6-input readonly>label</p6-input>`
    });

    expect(page.root).toEqualHtml(`
      <p6-input readonly>
        <label class="label" htmlfor="undefined-input">label</label>
        <div class="control">
          <input class="input is-static" id="undefined-input" type="text" readonly />
        </div>
      </p6-input>
    `);
  });
});
