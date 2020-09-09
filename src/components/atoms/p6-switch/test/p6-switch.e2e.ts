import { newE2EPage } from '@stencil/core/testing';

describe('p6-switch', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<p6-switch></p6-switch>');

    const element = await page.find('p6-switch');
    expect(element).toHaveClass('hydrated');
  });
});
