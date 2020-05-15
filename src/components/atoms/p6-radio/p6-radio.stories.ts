import { decorate } from '@storybook/addon-actions';

import readme from './readme.md';

export default {
  title: 'Atoms/Radio',
  component: 'p6-radio',
  parameters: {
    notes: readme,
  }
};

const id = "0123456789";

export const Default = () => {
  const form = document.createElement('form');
  const wrapper = document.createElement('div');
  const radioOne = document.createElement('p6-radio');
  const radioTwo = document.createElement('p6-radio');
  const radioThree = document.createElement('p6-radio');
  const submit = document.createElement('p6-button');

  const decorateForm = decorate([
    args => {
      return [
        {
          checked: args[0].target.elements[0].checked,
          value: args[0].target.elements[0].value
        },
        {
          checked: args[0].target.elements[1].checked,
          value: args[0].target.elements[1].value
        },
        {
          checked: args[0].target.elements[2].checked,
          value: args[0].target.elements[2].value
        }
      ]
    }
  ]);

  form.method = 'get';
  form.addEventListener('submit', e => {
    e.preventDefault();
    decorateForm.action('submit')(e);
  });

  radioOne.name = id;
  radioOne.value = 'first';
  radioOne.innerHTML = 'first';

  radioTwo.name = id;
  radioTwo.value = 'second';
  radioTwo.innerHTML = 'second';

  radioThree.name = id;
  radioThree.value = 'third';
  radioThree.innerHTML = 'third';

  wrapper.className = 'control';

  wrapper.appendChild(radioOne);
  wrapper.appendChild(radioTwo);
  wrapper.appendChild(radioThree);

  submit.innerHTML = 'send';

  form.appendChild(wrapper);
  form.appendChild(submit);

  return form;
};

export const Disabled = () => `
  <p6-radio checked="true" disabled="true" name="${id}">Disabled radio</p6-radio>
`;

export const Readonly = () => `
  <p6-radio checked="true" readonly="true" name="${id}">Readonly radio</p6-radio>
`;