/* eslint-disable import/no-extraneous-dependencies */
import { boolean, number, select, text } from "@storybook/addon-knobs";
import {
  SelectTypeKnobValue,
  SelectTypeOptionsProp,
} from "@storybook/addon-knobs/dist/components/types";
/* eslint-enable import/no-extraneous-dependencies */

export const getTextKnob = (label: string, value = ""): string =>
  text(label, value);

export const getBooleanKnob = (label: string, value = false): boolean =>
  boolean(label, value);

export const getNumberKnob = (label: string, value = 0): number =>
  number(label, value);

export const getSelectKnob = <T extends SelectTypeKnobValue>(
  label: string,
  options: SelectTypeOptionsProp<T>,
  value: T
): T => select<T>(label, options, value);
