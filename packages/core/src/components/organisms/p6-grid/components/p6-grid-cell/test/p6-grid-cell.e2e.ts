import { newE2EPage } from '@stencil/core/testing';

describe('p6-grid-cell', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<p6-grid-cell></p6-grid-cell>');

    const element = await page.find('p6-grid-cell');
    expect(element).toHaveClass('hydrated');
  });
});
