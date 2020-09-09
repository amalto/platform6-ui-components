import { newE2EPage } from '@stencil/core/testing';

describe('p6-link', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<p6-link></p6-link>');

    const element = await page.find('p6-link');
    expect(element).toHaveClass('hydrated');
  });
});
