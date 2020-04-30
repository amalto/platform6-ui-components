import readme from './readme.md';

export default {
  title: 'Atoms/Spinner',
  component: 'p6-spinner',
  parameters: {
    notes: readme,
  }
};

export const Default = () => `
  <p6-spinner style="width: 4.2rem; height: 4.2rem"></p6-spinner>
  
`;

export const SmallContainer = () => `
  <p6-spinner style="width: 1rem; height: 1rem"></p6-spinner>
`;

SmallContainer.story = {
  name: 'Small container'
}

export const VerticalContainer = () => `
  <p6-spinner style="width: 10.5rem; height: 21rem; background: #eee"></p6-spinner>
`;

VerticalContainer.story = {
  name: 'Vertical container'
}

export const HorizontalContainer = () => `
  <p6-spinner style="width: 21rem; height: 10.5rem; background: #eee"></p6-spinner>
`;

HorizontalContainer.story = {
  name: 'Horizontal container'
}