import { newE2EPage } from '@stencil/core/testing';

describe('p6-modal', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<p6-modal></p6-modal>');

    const element = await page.find('p6-modal');
    expect(element).toHaveClass('hydrated');
  });
});
