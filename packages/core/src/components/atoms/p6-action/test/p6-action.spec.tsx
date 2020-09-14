import { newSpecPage } from '@stencil/core/testing';
import { enumArrayEntryToArray } from '../../../../shared/test/utils';
import { Mode, modes, Size, sizes } from '../../../../shared/types';
import { P6Action } from '../p6-action';

describe('p6-action', () => {
  describe('mode', () => {
    it.each(enumArrayEntryToArray(modes))('has the class "is-%s" when mode is "%s"', async (_, mode) => {
      const page = await newSpecPage({
        components: [P6Action],
        html: `<p6-action mode=${mode}></p6-action>`,
      });
      expect(page.root).toMatchSnapshot();
    });

    it('does not add class when mode is default', async () => {
      const page = await newSpecPage({
        components: [P6Action],
        html: `<p6-action mode=${Mode.default}></p6-action>`,
      });
      expect(page.root).toMatchSnapshot();
    });

    it('does not add class when mode is undefined', async () => {
      const page = await newSpecPage({
        components: [P6Action],
        html: `<p6-action mode=${undefined}></p6-action>`,
      });
      expect(page.root).toMatchSnapshot();
    });
  });

  describe('waiting', () => {
    it('has a "is-loading" class when waiting is true', async () => {
      const page = await newSpecPage({
        components: [P6Action],
        html: `<p6-action waiting="true"></p6-action>`,
      });
      expect(page.root).toMatchSnapshot();
    });
    it('has no "is-loading" class when waiting is false', async () => {
      const page = await newSpecPage({
        components: [P6Action],
        html: `<p6-action waiting="false"></p6-action>`,
      });
      expect(page.root).toMatchSnapshot();
    });
  });

  describe('disabled', () => {
    it('has a "disabled" attribute on the button when disabled is true', async () => {
      const page = await newSpecPage({
        components: [P6Action],
        html: `<p6-action disabled="true"></p6-action>`,
      });
      expect(page.root).toMatchSnapshot();
    });
    it('has no "disabled" attribute on the button when disabled is false', async () => {
      const page = await newSpecPage({
        components: [P6Action],
        html: `<p6-action disabled="false"></p6-action>`,
      });
      expect(page.root).toMatchSnapshot();
    });
  });

  describe('size', () => {
    it.each(enumArrayEntryToArray(sizes))('has the class "is-%s" when size is "%s"', async (_, size) => {
      const page = await newSpecPage({
        components: [P6Action],
        html: `<p6-action size=${size}></p6-action>`,
      });
      expect(page.root).toMatchSnapshot();
    });

    it('does not add class when size is normal', async () => {
      const page = await newSpecPage({
        components: [P6Action],
        html: `<p6-action size=${Size.normal}></p6-action>`,
      });
      expect(page.root).toMatchSnapshot();
    });
  });
});
