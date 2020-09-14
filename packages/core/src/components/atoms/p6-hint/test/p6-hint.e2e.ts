import { newE2EPage } from '@stencil/core/testing';

describe('p6-hint', () => {
  it('renders', async () => {
    const page = await newE2EPage({
      html: '<p6-hint></p6-hint>',
    });

    const element = await page.find('p6-hint');
    expect(element).toHaveClass('hydrated');
  });
});
