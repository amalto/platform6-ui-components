import { library } from '@fortawesome/fontawesome-svg-core';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { newSpecPage } from '@stencil/core/testing';
import { enumArrayEntryToArray } from '../../../../shared/test/utils';
import { modes, positions } from '../../../../shared/types';
import { P6Help } from '../p6-help';

library.add(faQuestionCircle);

describe('p6-help', () => {
  it('default output', async () => {
    const page = await newSpecPage({
      components: [P6Help],
      html: `<p6-help text="Tooltip"></p6-help>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  describe('with position', () => {
    it.each(enumArrayEntryToArray(positions))('%s', async (key, position) => {
      const page = await newSpecPage({
        components: [P6Help],
        html: `<p6-help text="Position ${key}" position="${position}"></p6-help>`,
      });

      expect(page.root).toMatchSnapshot();
    });
  });

  describe('with mode', () => {
    it.each(enumArrayEntryToArray(modes))('%s', async (key, mode) => {
      const page = await newSpecPage({
        components: [P6Help],
        html: `<p6-help text="Mode ${key}" mode="${mode}"></p6-help>`,
      });

      expect(page.root).toMatchSnapshot();
    });
  });
});
