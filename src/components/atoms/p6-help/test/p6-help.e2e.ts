import { newE2EPage } from '@stencil/core/testing';

describe('p6-help', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<p6-help></p6-help>');

    const element = await page.find('p6-help');
    expect(element).not.toBeNull();
    expect(element).toHaveClass('hydrated');
  });
});
