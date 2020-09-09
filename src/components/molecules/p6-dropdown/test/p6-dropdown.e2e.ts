import { E2EPage, newE2EPage } from '@stencil/core/testing';

describe('p6-dropdown', () => {
  let page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage({
      html: `<p6-dropdown>
      <span slot="label">Label Slot</span>
      <p6-link href="#" class="dropdown-item">p6-link</p6-link>
      <div>hello <hr/> world</div>
      <hr />
      <a href="#" class="dropdown-item">a(nchor)</a>
      </p6-dropdown>`,
    });
  });

  it('renders', async () => {
    const element = await page.find('p6-dropdown');
    expect(element).toHaveClass('hydrated');
  });

  it('has children hidden by default', async () => {
    const menu = await page.find('p6-dropdown >>> #dropdown-menu');

    expect(menu).toBeDefined();

    const style = await menu.getComputedStyle();

    expect(style.display).toEqual('none');
  });

  it('has the menu visible when clicking on the button', async () => {
    const button = await page.find('p6-dropdown >>> .dropdown-trigger p6-button');
    const menu = await page.find('p6-dropdown >>> #dropdown-menu');

    expect(menu).toBeDefined();

    await button.click();
    await page.waitForChanges();

    const style = await menu.getComputedStyle();
    expect(style.display).toEqual('block');
  });
});
