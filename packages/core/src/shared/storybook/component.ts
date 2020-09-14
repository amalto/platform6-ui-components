import { htmlElementToArray } from './utils';

export function getElement<K extends keyof HTMLElementTagNameMap, T extends HTMLElementTagNameMap[K], KK extends keyof T>(
  component: K,
  children: string | HTMLElement | (string | HTMLElement)[],
  props?: Partial<T>,
): T {
  const element: T = (document.createElement(component) as unknown) as T;

  if (props !== undefined) {
    Object.entries(props)
      .map(([key, value]): { key: KK; value: T[KK] } => {
        return {
          key: (key as unknown) as KK,
          value,
        };
      })
      .forEach(kv => {
        element[kv.key] = kv.value;
      });
  }
  if (typeof children === 'string') {
    element.innerHTML = children;
  } else {
    htmlElementToArray(children).forEach(child => {
      if (typeof child === 'string') {
        element.insertAdjacentText('beforeend', child);
      } else {
        element.appendChild(child);
      }
    });
  }
  return element;
}
