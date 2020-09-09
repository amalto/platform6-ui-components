/* eslint-disable import/no-extraneous-dependencies */
import { TemplateResult } from 'lit-html';
/* eslint-enable import/no-extraneous-dependencies */

export const capitalize = (value: string): string => value.charAt(0).toUpperCase() + value.slice(1);

export const htmlElementToArray = <T>(children: T | T[]): T[] => (Array.isArray(children) ? children : [children]);

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
export function isTemplateResult(element: any): element is TemplateResult {
  return 'processor' in element && 'strings' in element;
}
