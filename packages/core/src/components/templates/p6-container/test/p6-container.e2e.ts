import { newE2EPage } from '@stencil/core/testing';

describe('p6-container', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<p6-container></p6-container>');

    const element = await page.find('p6-container');
    expect(element).toHaveClass('hydrated');
  });
});
