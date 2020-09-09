import { newSpecPage } from '@stencil/core/testing';
import { P6GridBody } from '../p6-grid-body';

describe('p6-grid-body', () => {
  it('render', async () => {
    const page = await newSpecPage({
      components: [P6GridBody],
      html: `<p6-grid-body></p6-grid-body>`,
    });
    expect(page.root).toMatchSnapshot();
  });
});
