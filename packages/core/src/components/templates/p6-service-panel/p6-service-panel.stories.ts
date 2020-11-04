import { ComponentProps, getElement, makeStory, Props } from '../../../shared/storybook';
import { P6ServicePanel } from './p6-service-panel';
import { ServiceStatus } from './service-status.enum';

const component = 'p6-service-panel';

export default {
  title: 'Templates/Service Panel',
  component,
};

const componentProps: ComponentProps = ['hideable', 'hidden'];

const getStoryField = (props?: Props<P6ServicePanel>): HTMLElement => {
  return getElement(component, [getElement('p6-empty', [])], props);
};

export const Default = makeStory<{
  name: string;
  version: string;
  status: ServiceStatus | undefined;
}>({
  componentProps,
  args: {
    name: 'service',
    version: '0.0.1',
    status: ServiceStatus.Started,
  },
  builder: args => getStoryField(args),
});
