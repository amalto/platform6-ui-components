import { newSpecPage } from '@stencil/core/testing';
import { P6Tab } from '../p6-tab';

describe('p6-tab', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [P6Tab],
      html: `<p6-tab></p6-tab>`,
    });
    expect(page.root).toEqualHtml(`
      <p6-tab>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </p6-tab>
    `);
  });
});
