import { newSpecPage } from '@stencil/core/testing';
import { P6Label } from '../p6-label';

describe('p6-label', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [P6Label],
      html: `<p6-label></p6-label>`,
    });
    expect(page.root).toMatchSnapshot();
  });
});
