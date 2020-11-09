import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { Mode } from '../../../../shared/types';
import { P6Modal } from '../p6-modal';

describe('p6-modal', () => {
  it('renders a content modal', async () => {
    const page = await newSpecPage({
      components: [P6Modal],
      template: () => {
        <p6-modal open hasCard={false}>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean efficitur sit amet massa fringilla egestas. Nullam condimentum luctus turpis.</p>
        </p6-modal>;
      },
    });
    expect(page.root).toMatchSnapshot();
  });

  it('renders a card modal', async () => {
    const page = await newSpecPage({
      components: [P6Modal],
      template: () => {
        <p6-modal open hasCard>
          <span slot="head">Modal title</span>

          <div class="content">
            <h1>Hello World</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus.
              Ut vulputate semper dui. Fusce erat odio, sollicitudin vel erat vel, interdum mattis neque.
            </p>
          </div>

          <footer slot="foot">
            <section>
              <p6-button mode={Mode.primary}>Save changes</p6-button>
              <p6-button>Cancel</p6-button>
            </section>
          </footer>
        </p6-modal>;
      },
    });
    expect(page.root).toMatchSnapshot();
  });
});
