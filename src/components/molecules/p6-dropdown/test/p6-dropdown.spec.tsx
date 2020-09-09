import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { P6Dropdown } from '../p6-dropdown';

describe('p6-dropdown', () => {
  let page: SpecPage;

  beforeEach(async () => {
    page = await newSpecPage({
      components: [P6Dropdown],
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
    expect(page.root).toMatchSnapshot();
  });
});
