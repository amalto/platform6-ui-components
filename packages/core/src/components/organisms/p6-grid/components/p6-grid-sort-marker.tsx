import { h, JSX } from '@stencil/core';
import { SortOrder } from '../../../../shared/types';

export function P6GridSortMarker(props: { order?: SortOrder }): JSX.Element | undefined {
  if (props.order === SortOrder.asc) {
    return <p6-icon name="long-arrow-alt-up" />;
  }
  if (props.order === SortOrder.desc) {
    return <p6-icon name="long-arrow-alt-down" />;
  }

  return undefined;
}
