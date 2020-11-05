import { library } from '@fortawesome/fontawesome-svg-core';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { newSpecPage } from '@stencil/core/testing';
import { P6File } from '../p6-file';

library.add(faUpload);

describe('p6-file', () => {
  Object.defineProperty(HTMLInputElement.prototype, 'checkValidity', {
    writable: true,
    value: jest.fn().mockImplementation(() => true),
  });

  it('renders', async () => {
    const page = await newSpecPage({
      components: [P6File],
      html: `<p6-file></p6-file>`,
    });
    expect(page.root).toMatchSnapshot();
  });
});
