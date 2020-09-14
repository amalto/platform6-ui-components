import { Component, h, Host, JSX } from '@stencil/core';

interface Coord {
  x: number;
  y: number;
}

@Component({
  tag: 'p6-spinner',
  styleUrl: 'p6-spinner.scss',
  shadow: true,
})
export class P6Spinner {
  private readonly color = '#fb9248';

  private readonly speed = 0.105;

  private readonly duration = 0.84;

  private readonly blockSize = 32;

  private readonly gap = (100 - 3 * this.blockSize) / 2;

  private readonly coords: Coord[] = [
    { x: 0, y: 0 },
    { x: this.blockSize + this.gap, y: 0 },
    { x: 2 * this.blockSize + this.gap * 2, y: 0 },
    { x: 2 * this.blockSize + this.gap * 2, y: this.blockSize + this.gap },
    {
      x: 2 * this.blockSize + this.gap * 2,
      y: 2 * this.blockSize + this.gap * 2,
    },
    { x: this.blockSize + this.gap, y: 2 * this.blockSize + this.gap * 2 },
    { x: 0, y: 2 * this.blockSize + this.gap * 2 },
    { x: 0, y: this.blockSize + this.gap },
  ];

  render(): JSX.Element {
    return (
      <Host>
        <svg width="100" height="100" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" aria-label="loading" aria-hidden="false" aria-busy="true">
          {this.coords.map(this.blockElement.bind(this))}
        </svg>
      </Host>
    );
  }

  private blockElement(coord: Coord, index: number): JSX.Element {
    const classes = {
      [`fix-moz-svg-anime-${index}`]: navigator.userAgent.includes('Firefox'),
    };

    return (
      <rect class={classes} x={coord.x} y={coord.y} width={this.blockSize} height={this.blockSize} fill={this.color}>
        <animate attributeName="opacity" from="1" to="0" dur={this.duration} repeatCount="indefinite" begin={this.speed * index} />
      </rect>
    );
  }
}
