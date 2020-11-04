import { newE2EPage } from '@stencil/core/testing';

describe('p6-grid-row-actions', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<p6-grid-row-actions></p6-grid-row-actions>');

    const element = await page.find('p6-grid-row-actions');
    expect(element).toHaveClass('hydrated');
  });
});
