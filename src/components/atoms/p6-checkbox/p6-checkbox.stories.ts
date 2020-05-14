import { decorate } from '@storybook/addon-actions';

import readme from './readme.md';

export default {
  title: 'Atoms/Checkbox',
  component: 'p6-checkbox',
  parameters: {
    notes: readme,
  }
};

const id = "0123456789";

export const Default = () => {
  const form = document.createElement('form');
  const checkbox1 = document.createElement('p6-checkbox');
  const submit = document.createElement('p6-button');

  const decorateChekbox = decorate([
    args => (
      [{ checked: args[0].target.elements[0].checked }]
    )
  ]);

  form.method = 'get';
  form.addEventListener('submit', e => {
    e.preventDefault();
    decorateChekbox.action('submit')(e);
  });

  checkbox1.checked = true;
  checkbox1.id = id;
  checkbox1.innerHTML = 'Checked by default';

  submit.innerHTML = 'send';
  submit.type = 'submit';

  form.appendChild(checkbox1);
  form.appendChild(submit);

  return form;
};

export const Disabled = () => `
  <p6-checkbox checked="true" disabled="true" name="${id}">Disabled checkbox</p6-checkbox>
`;