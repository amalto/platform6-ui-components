import readme from './readme.md';

export default {
  title: 'Demo/My Component',
  parameters: {
    notes: readme,
  }
};

export const Default = () => `
  <my-component first="Millie" middle="Bobby" last="Brown"></my-component>
`;