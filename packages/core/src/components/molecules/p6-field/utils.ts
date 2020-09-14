import { isP6Control, isP6NativeControl, P6Control, P6NativeControl } from '../../../shared/form/control';
import { isInDefaultSlot } from '../../../utils/component';

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
export function isControl(elmt: unknown): elmt is P6Control<unknown> | P6NativeControl {
  return isP6Control(elmt) || isP6NativeControl(elmt);
}

export function getControl(children: HTMLCollection): P6Control<unknown> | P6NativeControl | undefined {
  return Array.from(children).filter(isInDefaultSlot).find(isControl) as P6Control<unknown> | P6NativeControl | undefined;
}
