import { newSpecPage } from '@stencil/core/testing';
import { P6Button } from '../p6-button';

describe('p6-button', () => {

  describe('mode', () => {

    const modes = ['danger', 'warning', 'info', 'success', 'primary']

    it.each(modes)('has the class "is-%s" when mode is "%s"', async(mode) => {
      const page = await newSpecPage({
        components: [P6Button],
        html: `<p6-button mode=${mode}></p6-button>`,
      });
      expect(page.root).toEqualHtml(`
        <p6-button mode=${mode}>
          <mock:shadow-root>
            <button class="button is-${mode}" type="submit">
              <slot></slot>
            </button>
          </mock:shadow-root>
        </p6-button>
      `);
    });

    it('does not add class when mode is default', async() => {
      const page = await newSpecPage({
        components: [P6Button],
        html: `<p6-button mode="default"></p6-button>`,
      });
      expect(page.root).toEqualHtml(`
        <p6-button mode="default">
          <mock:shadow-root>
            <button class="button" type="submit">
              <slot></slot>
            </button>
          </mock:shadow-root>
        </p6-button>
      `);
    });

    it('does not add class when mode is undefined', async() => {
      const page = await newSpecPage({
        components: [P6Button],
        html: `<p6-button mode=${undefined}></p6-button>`,
      });
      expect(page.root).toEqualHtml(`
        <p6-button mode=${undefined}>
          <mock:shadow-root>
            <button class="button" type="submit">
              <slot></slot>
            </button>
          </mock:shadow-root>
        </p6-button>
      `);
    });
  })

  describe('outlined', () => {
    it('has a "is-outlined" class when outlined is true', async() => {
      const page = await newSpecPage({
        components: [P6Button],
        html: `<p6-button outlined="true"></p6-button>`,
      });
      expect(page.root).toEqualHtml(`
        <p6-button outlined="true">
          <mock:shadow-root>
            <button class="button is-outlined" type="submit">
              <slot></slot>
            </button>
          </mock:shadow-root>
        </p6-button>
      `);
    });
    it('has no "is-outlined" class when outlined is false', async() => {
      const page = await newSpecPage({
        components: [P6Button],
        html: `<p6-button outlined="false"></p6-button>`,
      });
      expect(page.root).toEqualHtml(`
        <p6-button outlined="false">
          <mock:shadow-root>
            <button class="button" type="submit">
              <slot></slot>
            </button>
          </mock:shadow-root>
        </p6-button>
      `);
    });
  })

  describe('waiting', () => {
    it('has a "is-loading" class when waiting is true', async() => {
      const page = await newSpecPage({
        components: [P6Button],
        html: `<p6-button waiting="true"></p6-button>`,
      });
      expect(page.root).toEqualHtml(`
        <p6-button waiting="true">
          <mock:shadow-root>
            <button class="button is-loading" type="submit">
              <slot></slot>
            </button>
          </mock:shadow-root>
        </p6-button>
      `);
    });
    it('has no "is-loading" class when waiting is false', async() => {
      const page = await newSpecPage({
        components: [P6Button],
        html: `<p6-button waiting="false"></p6-button>`,
      });
      expect(page.root).toEqualHtml(`
        <p6-button waiting="false">
          <mock:shadow-root>
            <button class="button" type="submit">
              <slot></slot>
            </button>
          </mock:shadow-root>
        </p6-button>
      `);
    });
  })

  describe('disabled', () => {
    it('has a "disabled" attribute on the button when disabled is true', async() => {
      const page = await newSpecPage({
        components: [P6Button],
        html: `<p6-button disabled="true"></p6-button>`,
      });
      expect(page.root).toEqualHtml(`
        <p6-button disabled="true">
          <mock:shadow-root>
            <button class="button" disabled type="submit">
              <slot></slot>
            </button>
          </mock:shadow-root>
        </p6-button>
      `);
    });
    it('has no "disabled" attribute on the button when disabled is false', async() => {
      const page = await newSpecPage({
        components: [P6Button],
        html: `<p6-button disabled="false"></p6-button>`,
      });
      expect(page.root).toEqualHtml(`
        <p6-button disabled="false">
          <mock:shadow-root>
            <button class="button" type="submit">
              <slot></slot>
            </button>
          </mock:shadow-root>
        </p6-button>
      `);
    });
  })

  describe('size',() =>{
    const sizes = ['small', 'normal', 'medium', 'large']

    it.each(sizes)('has the class "is-%s" when size is "%s"', async(size) => {
      const page = await newSpecPage({
        components: [P6Button],
        html: `<p6-button size=${size}></p6-button>`,
      });
      expect(page.root).toEqualHtml(`
        <p6-button size=${size}>
          <mock:shadow-root>
            <button class="button is-${size}" type="submit">
              <slot></slot>
            </button>
          </mock:shadow-root>
        </p6-button>
      `);
    });

    it('does not add class when size is default', async() => {
      const page = await newSpecPage({
        components: [P6Button],
        html: `<p6-button size="default"></p6-button>`,
      });
      expect(page.root).toEqualHtml(`
        <p6-button size="default">
          <mock:shadow-root>
            <button class="button" type="submit">
              <slot></slot>
            </button>
          </mock:shadow-root>
        </p6-button>
      `);
    });
  })
});
