import { newE2EPage } from '@stencil/core/testing';

describe('p6-grid-header-menu', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<p6-grid-header-menu></p6-grid-header-menu>');

    const element = await page.find('p6-grid-header-menu');
    expect(element).toHaveClass('hydrated');
  });
});
