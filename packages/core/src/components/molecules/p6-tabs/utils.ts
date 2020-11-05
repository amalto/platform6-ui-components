export function getTabId(id: string): string {
  return `${id}-tab`;
}

export function isTabValid(tab: Element): tab is HTMLP6TabElement {
  return tab.nodeName === 'P6-TAB';
}
