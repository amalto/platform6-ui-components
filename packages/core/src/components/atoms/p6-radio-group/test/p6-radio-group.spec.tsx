import { newSpecPage } from '@stencil/core/testing';
import { P6RadioGroup } from '../p6-radio-group';

describe('p6-radio-group', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [P6RadioGroup],
      html: `<p6-radio-group></p6-radio-group>`,
    });
    expect(page.root).toEqualHtml(`
      <p6-radio-group>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </p6-radio-group>
    `);
  });
});
