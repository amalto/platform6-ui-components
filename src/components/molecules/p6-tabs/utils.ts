export interface Tab extends Element {
  id: string;
  title: string;
}

export function getTabId(id: string): string {
  return `${id}-tab`;
}

/**
 * A tab is valid only with `id` and `title` attributes.
 * @param { Element[] } tabs
 */
export function getValidTabs(tabs: Element[]): Element[] {
  return tabs.filter((tab) => "title" in tab && "id" in tab);
}
