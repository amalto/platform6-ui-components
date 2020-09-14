import { EnumArrayEntry } from '../../utils';
import { Mode, modes, Position, positions, Size, sizes } from '../types';
import { getLanguageArgType } from './argType';
import { getElement } from './component';
import { buildStoryPreview, getPreview } from './preview';
import { ArgSelectType, ArgType, BuilderOutput, ComponentProps, Config, StoryMakerFn } from './types';
import { enumsConfig } from './variables';

const getComputedArgType = <T>(args: T): ArgType => {
  return Object.entries(args || {})
    .map(([name, value]): ArgSelectType | null => {
      if (typeof value === 'number') {
        const enumConfig = enumsConfig.get(name);
        if (enumConfig !== undefined) {
          return enumConfig.argType;
        }
      }
      if (name === 'lang' && typeof value === 'string') {
        return getLanguageArgType();
      }
      return null;
    })
    .filter(value => value !== null)
    .reduce<ArgType>((acc, value) => ({ ...acc, ...value }), {});
};

export function makeStory<T>(config: Config<T>): (args: T) => BuilderOutput {
  const fn = (args: T) => config.builder(args);
  fn.args = { ...config.args } as T;

  fn.argTypes = {
    ...getComputedArgType<T>(fn.args),
    ...config.argTypes,
  };

  (config.componentProps || [])
    .filter(prop => !(prop in fn.args))
    .forEach(prop => {
      fn.argTypes[prop] = { control: { disable: true } };
    });

  const buildPreview = (): string => {
    const preview = config.preview !== undefined ? config.preview(fn.args) : fn(fn.args);
    if (typeof preview === 'string') {
      return preview;
    }
    return buildStoryPreview(preview);
  };

  fn.parameters = {
    controls: { hideNoControlsWarning: true },
    ...getPreview(buildPreview()),
  };

  return fn;
}

const makeEnumStory = <T>({
  entries,
  builder,
  componentProps,
}: {
  entries: EnumArrayEntry<T>[];
  builder: StoryMakerFn<T>;
  componentProps: ComponentProps;
}): ((args: T) => BuilderOutput) =>
  makeStory<T>({
    componentProps,
    builder: (): HTMLElement =>
      getElement(
        'div',
        entries.map(entry => builder(entry)),
      ),
  });

export const makeSizeStory = (config: { componentProps: ComponentProps; builder: StoryMakerFn<typeof Size> }): ((args: typeof Size) => BuilderOutput) =>
  makeEnumStory({ entries: sizes, ...config });
export const makeModeStory = (config: { componentProps: ComponentProps; builder: StoryMakerFn<typeof Mode> }): ((args: typeof Mode) => BuilderOutput) =>
  makeEnumStory({ entries: modes, ...config });
export const makePositionStory = (config: { componentProps: ComponentProps; builder: StoryMakerFn<typeof Position> }): ((args: typeof Position) => BuilderOutput) =>
  makeEnumStory({ entries: positions, ...config });
