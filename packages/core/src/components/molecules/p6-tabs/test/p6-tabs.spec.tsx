import { newSpecPage } from '@stencil/core/testing';
import { P6Tabs } from '../p6-tabs';

describe('p6-tabs', () => {
  it('Should be empty', async () => {
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

  it('Should display the third tab', async () => {
    const page = await newSpecPage({
      components: [P6Tabs],
      html: `
      <p6-tabs selected="third">
        <div id="first" title="What is Lorem Ipsum?">1</div>
        <div id="second" title="Where does it come from?">2</div>
        <div id="third" title="Why do we use it?">3</div>
        <div id="fourth" title="Where can I get some?">4</div>
      </p6-tabs>
      `,
    });

    expect(page.root).toMatchSnapshot();
  });
});
