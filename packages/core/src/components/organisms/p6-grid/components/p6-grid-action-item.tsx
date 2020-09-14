import { IconName } from '@fortawesome/fontawesome-svg-core';
import { h, JSX } from '@stencil/core';
import { Mode } from '../../../../shared/types';

export function P6GridActionItem(props: {
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
    <p6-action class={classes} mode={mode === undefined ? Mode.info : mode} onClick={clickHandler} disabled={disabled || false} data-tooltip={tooltip}>
      <p6-icon name={icon} />
    </p6-action>
  );
}
