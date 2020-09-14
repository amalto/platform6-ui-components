/* eslint-disable import/no-extraneous-dependencies */
/* eslint-enable import/no-extraneous-dependencies */
import { TemplateResult } from 'lit-html';
import { EnumArrayEntry } from '../../utils';

export type Props<T> = Partial<T & HTMLElement>;
export type ArgType = { [key: string]: unknown };
export type Preview = { docs: { source: { code: string } } };
export type BuilderOutput = string | HTMLElement | TemplateResult;
export type ComponentProps = string[];
export type Config<T> = {
  componentProps?: ComponentProps;
  args?: T;
  argTypes?: ArgType;
  builder: (args: T) => BuilderOutput;
  preview?: (args: T) => string | HTMLElement | HTMLElement[];
};
export type ArgSelectType = {
  [key: string]: {
    control: {
      type: string;
      [option: string]: unknown;
    };
  };
};
export type StringSelectArgType = { [key: string]: string };

export type StoryMakerFn<T> = (value: EnumArrayEntry<T>) => HTMLElement;
