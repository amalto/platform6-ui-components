import { newSpecPage } from '@stencil/core/testing';
import { P6Link } from '../p6-link';

describe('p6-link', () => {
  it('renders an anchor tag if the href property is defined', async () => {
    const page = await newSpecPage({
      components: [P6Link],
      html: `<p6-link href="/">link</p6-link>`,
    });
    expect(page.root).toEqualHtml(`
      <p6-link href="/">
        <mock:shadow-root>
          <a class="link" href="/">
            <slot></slot>
          </a>
        </mock:shadow-root>
        link
      </p6-link>
    `);
  });

  it('renders a button tag if the href property is undefined', async () => {
    const page = await newSpecPage({
      components: [P6Link],
      html: `<p6-link>link</p6-link>`,
    });

    expect(page.root).toEqualHtml(`
      <p6-link>
        <mock:shadow-root>
          <button class="link">
            <slot></slot>
          </button>
        </mock:shadow-root>
        link
      </p6-link>
    `);
  });

  const otherProperties = [
    ['rel', 'external nofollow author'],
    ['target', '_self'],
    ['download', 'spec.tsx'],
  ];

  it.each(otherProperties)('ignores %s if the href property is undefined', async (props, value) => {
    const page = await newSpecPage({
      components: [P6Link],
      html: `<p6-link ${props}=${value}>link</p6-link>`,
    });

    expect(page.root).toEqualHtml(`
      <p6-link ${props}=${value}>
        <mock:shadow-root>
          <button class="link">
            <slot></slot>
          </button>
        </mock:shadow-root>
        link
      </p6-link>
    `);
  });

  it.each(otherProperties)('uses %s if the href property is defined', async (props, value) => {
    const page = await newSpecPage({
      components: [P6Link],
      html: `<p6-link href="/defined" ${props}="${value}">link</p6-link>`,
    });

    expect(page.root).toEqualHtml(`
      <p6-link  href="/defined" ${props}="${value}">
        <mock:shadow-root>
          <a class="link"  href="/defined" ${props}="${value}">
            <slot></slot>
          </a>
        </mock:shadow-root>
        link
      </p6-link>
    `);
  });
});
