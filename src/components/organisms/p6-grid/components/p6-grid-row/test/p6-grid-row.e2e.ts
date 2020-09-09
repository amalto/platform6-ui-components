import { newE2EPage } from '@stencil/core/testing';

describe('p6-grid-row', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<p6-grid-row></p6-grid-row>');

    const element = await page.find('p6-grid-row');
    expect(element).toHaveClass('hydrated');
  });
});
