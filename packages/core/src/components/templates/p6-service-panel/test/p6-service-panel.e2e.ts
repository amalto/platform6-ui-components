import { newE2EPage } from '@stencil/core/testing';

describe('p6-service-panel', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<p6-service-panel></p6-service-panel>');

    const element = await page.find('p6-service-panel');
    expect(element).toHaveClass('hydrated');
  });
});
