import { newSpecPage } from "@stencil/core/testing";
import { P6Tabs } from "../p6-tabs";

describe("p6-tabs", () => {
  it("Should be empty", async () => {
    const page = await newSpecPage({
      components: [P6Tabs],
      html: `<p6-tabs></p6-tabs>`,
    });

    expect(page.root).toEqualHtml(`
      <p6-tabs>
        <mock:shadow-root>
         </mock:shadow-root>
      </p6-tabs>
    `);
  });

  it("Should display the first tab", async () => {
    const page = await newSpecPage({
      components: [P6Tabs],
      html: `
      <p6-tabs default="first">
        <div id="first" title="What is Lorem Ipsum?">1</div>
        <div id="second" title="Where does it come from?">2</div>
        <div id="third" title="Why do we use it?">3</div>
        <div id="fourth" title="Where can I get some?">4</div>
      </p6-tabs>
      `,
    });

    expect(page.root).toEqualHtml(`
      <p6-tabs default="first">
        <mock:shadow-root>
          <div class="tabs">
            <ul>
              <li class="is-active">
                <a href="#first" id="first-tab">
                  What is Lorem Ipsum?
                </a>
              </li>
              <li>
                <a href="#second" id="second-tab">
                  Where does it come from?
                </a>
              </li>
              <li>
                <a href="#third" id="third-tab">
                  Why do we use it?
                </a>
              </li>
              <li>
                <a href="#fourth" id="fourth-tab">
                  Where can I get some?
                </a>
              </li>
            </ul>
          </div>
          <div class="tab-content">1</div>
        </mock:shadow-root>
        <div id="first" title="What is Lorem Ipsum?">1</div>
        <div id="second" title="Where does it come from?">2</div>
        <div id="third" title="Why do we use it?">3</div>
        <div id="fourth" title="Where can I get some?">4</div>
      </p6-tabs>
    `);
  });
});
