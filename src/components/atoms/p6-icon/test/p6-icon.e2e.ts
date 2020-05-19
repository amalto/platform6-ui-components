import { newE2EPage } from '@stencil/core/testing';

describe('p6-icon', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<p6-icon></p6-icon>');

    const element = await page.find('p6-icon');
    expect(element).toHaveClass('hydrated');
  });
});
