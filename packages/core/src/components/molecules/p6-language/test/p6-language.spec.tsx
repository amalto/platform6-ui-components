import { newSpecPage } from '@stencil/core/testing';
import { P6Language } from '../p6-language';

describe('p6-language', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [P6Language],
      html: `<p6-language></p6-language>`,
    });
    expect(page.root).toMatchSnapshot();
  });
});
