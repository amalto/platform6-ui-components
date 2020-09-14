import { IconDefinition, library } from '@fortawesome/fontawesome-svg-core';
import { newSpecPage } from '@stencil/core/testing';
import { P6Icon } from '../p6-icon';

const getIcon: () => IconDefinition = () => ({
  prefix: 'fas',
  iconName: 'chart-bar',
  icon: [
    512,
    512,
    [],
    'f080',
    'M332.8 320h38.4c6.4 0 12.8-6.4 12.8-12.8V172.8c0-6.4-6.4-12.8-12.8-12.8h-38.4c-6.4 0-12.8 6.4-12.8 12.8v134.4c0 6.4 6.4 12.8 12.8 12.8zm96 0h38.4c6.4 0 12.8-6.4 12.8-12.8V76.8c0-6.4-6.4-12.8-12.8-12.8h-38.4c-6.4 0-12.8 6.4-12.8 12.8v230.4c0 6.4 6.4 12.8 12.8 12.8zm-288 0h38.4c6.4 0 12.8-6.4 12.8-12.8v-70.4c0-6.4-6.4-12.8-12.8-12.8h-38.4c-6.4 0-12.8 6.4-12.8 12.8v70.4c0 6.4 6.4 12.8 12.8 12.8zm96 0h38.4c6.4 0 12.8-6.4 12.8-12.8V108.8c0-6.4-6.4-12.8-12.8-12.8h-38.4c-6.4 0-12.8 6.4-12.8 12.8v198.4c0 6.4 6.4 12.8 12.8 12.8zM496 384H64V80c0-8.84-7.16-16-16-16H16C7.16 64 0 71.16 0 80v336c0 17.67 14.33 32 32 32h464c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16z',
  ],
});

library.add(getIcon());

describe('p6-icon', () => {
  it('renders an icon', async () => {
    const icon = getIcon();

    const page = await newSpecPage({
      components: [P6Icon],
      html: `<p6-icon name="chart-bar"></p6-icon>`,
    });

    const svg = page.root?.shadowRoot?.querySelector('svg');
    expect(svg).not.toBeNull();
    expect(svg?.getAttribute('data-icon')).toEqual(icon.iconName);
    expect(svg?.getAttribute('data-prefix')).toEqual(icon.prefix);

    const path = svg?.querySelector('path');
    expect(path).toBeDefined();
    expect(path?.getAttribute('d')).toEqual(icon.icon.reverse().shift());
  });

  it('renders nothing and add a debug message when the icon is unknown', async () => {
    const spyDebug = jest.fn();
    Object.defineProperty(console, 'debug', {
      writable: true,
      value: spyDebug,
    });

    const page = await newSpecPage({
      components: [P6Icon],
      html: `<p6-icon name="unknown-icon"></p6-icon>`,
    });

    const svg = page.root?.shadowRoot?.querySelector('svg');
    expect(svg).toBeNull();
    expect(spyDebug).toHaveBeenCalledTimes(1);

    const message = spyDebug.mock.calls[spyDebug.mock.calls.length - 1][0];
    expect(message).toContain('p6-icon');
    expect(message).toContain('unknown-icon');
    expect(message).toContain('fas');
  });

  it('can transform an icon', async () => {
    const page = await newSpecPage({
      components: [P6Icon],
      html: `<p6-icon name="chart-bar" transform="flip-v rotate-90"></p6-icon>`,
    });

    expect(page.root).toMatchSnapshot();
  });
});
