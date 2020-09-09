import { newSpecPage } from '@stencil/core/testing';
import { P6Container } from '../p6-container';

describe('p6-container', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [P6Container],
      html: `<p6-container></p6-container>`,
    });
    expect(page.root).toMatchSnapshot();
  });
});
