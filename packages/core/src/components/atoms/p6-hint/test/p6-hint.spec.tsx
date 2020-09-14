import { newSpecPage } from '@stencil/core/testing';
import { enumArrayEntryToArray } from '../../../../shared/test/utils';
import { Mode, modes } from '../../../../shared/types';
import { P6Hint } from '../p6-hint';

describe('p6-hint', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [P6Hint],
      html: `<p6-hint>hint text</p6-hint>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  describe('mode', () => {
    it.each(enumArrayEntryToArray(modes))('has the class "is-%s" when mode is "%s"', async (name, value) => {
      const page = await newSpecPage({
        components: [P6Hint],
        html: `<p6-hint mode=${value}>${name}</p6-hint>`,
      });
      expect(page.root).toMatchSnapshot();
    });

    it('does not add class when mode is default', async () => {
      const page = await newSpecPage({
        components: [P6Hint],
        html: `<p6-hint mode=${Mode.default}>default</p6-hint>`,
      });
      expect(page.root).toMatchSnapshot();
    });

    it('does not add class when mode is undefined', async () => {
      const page = await newSpecPage({
        components: [P6Hint],
        html: `<p6-hint mode=${undefined}>undefined</p6-hint>`,
      });
      expect(page.root).toMatchSnapshot();
    });
  });
});
