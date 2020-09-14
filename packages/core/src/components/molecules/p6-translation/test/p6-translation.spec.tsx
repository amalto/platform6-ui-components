import { newSpecPage } from '@stencil/core/testing';
import { P6Translation } from '../p6-translation';

describe('p6-translation', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [P6Translation],
      html: `<p6-translation></p6-translation>`,
    });
    expect(page.root).toMatchSnapshot();
  });
});
