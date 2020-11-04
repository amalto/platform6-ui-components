import { newE2EPage } from '@stencil/core/testing';

describe('p6-tab', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<p6-tab></p6-tab>');

    const element = await page.find('p6-tab');
    expect(element).toHaveClass('hydrated');
  });
});
