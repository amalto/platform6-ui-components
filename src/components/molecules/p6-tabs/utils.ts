export function getTabId(id: string): string {
  return `${id}-tab`;
}

export function isTabValid(tab: Element): tab is HTMLElement {
  return 'title' in tab && 'id' in tab;
}
