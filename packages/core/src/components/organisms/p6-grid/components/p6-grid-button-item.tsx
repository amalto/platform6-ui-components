import { IconName } from '@fortawesome/fontawesome-svg-core';
import { h, JSX } from '@stencil/core';
import { Mode, Size } from '../../../../shared/types';

export function P6GridButtonItem(props: {
  icon: IconName;
  clickHandler: (event: Event) => void;
  /* eslint-disable react/require-default-props */
  mode?: Mode;
  disabled?: boolean;
  tooltip?: string;
  /* eslint-enable react/require-default-props */
}): JSX.Element {
  const { clickHandler, disabled, icon, mode, tooltip } = props;
  const classes = {
    'has-tooltip-arrow': tooltip !== undefined,
  };

  return (
    <p6-button class={classes} mode={mode === undefined ? Mode.info : mode} size={Size.small} onClick={clickHandler} disabled={disabled || false} data-tooltip={tooltip} outlined>
      <p6-icon name={icon} size={Size.small} />
    </p6-button>
  );
}
