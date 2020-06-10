import { isEmpty } from "~utils/attribute";

export function getTabId(id: string): string {
  return `${id}-tab`;
}

/**
 * A tab is valid only with `id` and `title` attributes.
 * @param { Element } tab
 */
export function isValidTab(tab: Element): boolean {
  return (
    !isEmpty(tab.getAttribute("title")) && !isEmpty(tab.getAttribute("id"))
  );
}
