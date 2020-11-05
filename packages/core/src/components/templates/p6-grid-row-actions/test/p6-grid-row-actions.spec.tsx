import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { P6GridRowActions } from '../p6-grid-row-actions';

describe('p6-grid-row-actions', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [P6GridRowActions],
      template: () => <p6-grid-row-actions rowId="one" />,
    });
    expect(page.root).toMatchSnapshot();
  });
});
