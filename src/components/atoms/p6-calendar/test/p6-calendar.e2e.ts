import { newE2EPage } from '@stencil/core/testing';

describe('p6-calendar', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<p6-calendar></p6-calendar>');

    const element = await page.find('p6-calendar');
    expect(element).toHaveClass('hydrated');
  });
});
