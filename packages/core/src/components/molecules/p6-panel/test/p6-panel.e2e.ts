import { newE2EPage } from '@stencil/core/testing';

describe('p6-panel', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<p6-panel></p6-panel>');

    const element = await page.find('p6-panel');
    expect(element).toHaveClass('hydrated');
  });
});
