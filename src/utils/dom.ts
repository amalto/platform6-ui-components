export function toArray<T extends Element, C extends HTMLCollectionBase>(
  collection: C
): T[] {
  return Array.from(collection) as T[];
}

export function isHTMLOptionElement(
  element: Element
): element is HTMLOptionElement {
  return element.tagName.toLowerCase() === "option";
}

export function isHTMLOptGroupElement(
  element: Element
): element is HTMLOptGroupElement {
  return element.tagName.toLowerCase() === "optgroup";
}
