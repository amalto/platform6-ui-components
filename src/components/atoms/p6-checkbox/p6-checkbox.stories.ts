import readme from './readme.md';

export default {
  title: 'Atoms/Checkbox',
  component: 'p6-checkbox',
  parameters: {
    notes: readme,
  }
};

export const Default = () => `
  <p6-checkbox label="Hellow world"></p6-checkbox>
`;

export const Disabled = () => `
  <p6-checkbox label="Disabled checkbox" disabled="true"></p6-checkbox>
`;

// SmallContainer.story = {
//   name: 'Small container'
// }

// export const VerticalContainer = () => `
//   <p6-checkbox style="width: 10.5rem; height: 21rem; background: #eee"></p6-checkbox>
// `;

// VerticalContainer.story = {
//   name: 'Vertical container'
// }

// export const HorizontalContainer = () => `
//   <p6-checkbox style="width: 21rem; height: 10.5rem; background: #eee"></p6-checkbox>
// `;

// HorizontalContainer.story = {
//   name: 'Horizontal container'
// }