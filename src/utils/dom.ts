export function toArray<T extends Element>(collection: HTMLCollection): T[] {
  return Array.from(collection) as T[];
}

export function isHTMLOptionElement(
  element: Element
): element is HTMLOptionElement {
  return element.tagName.toLowerCase() === "option";
}
