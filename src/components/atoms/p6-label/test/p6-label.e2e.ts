import { newE2EPage } from '@stencil/core/testing';

describe('p6-label', () => {
  it('renders', async () => {
    const page = await newE2EPage({
      html: '<p6-label></p6-label>',
    });

    const element = await page.find('p6-label');
    expect(element).toHaveClass('hydrated');
  });
});
