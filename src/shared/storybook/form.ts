import { isCustomEvent } from '../form/event';
import { Mode } from '../types';
import { getElement } from './component';
import { htmlElementToArray } from './utils';

export const getFormButtons = (): HTMLElement =>
  getElement(
    'div',
    getElement(
      'div',
      [
        getElement('p6-button', 'Submit', {
          mode: Mode.primary,
          type: 'submit',
        }),
        getElement('p6-button', 'Reset', {
          mode: Mode.danger,
          type: 'reset',
        }),
      ],
      { className: 'control' },
    ),
    {
      className: 'field',
    },
  );

export const getForm = (fields: HTMLElement | HTMLElement[], withActions = true): HTMLElement => {
  const children = htmlElementToArray(fields);
  if (withActions) {
    children.push(getFormButtons());
  }
  const form = getElement('p6-form', children);
  form.addEventListener('p6Submit', (e: Event): void => {
    if (!isCustomEvent(e)) {
      return;
    }
    // eslint-disable-next-line no-console
    console.log(
      `%c Platform 6 %c ${String.fromCodePoint(0x1f4e1)} %c CustomEvent :: detail `,
      'background:#61a653; color:white',
      'background:transparent; color:black',
      'background:black; color:cyan',
      e.detail,
    );
  });
  return form;
};
