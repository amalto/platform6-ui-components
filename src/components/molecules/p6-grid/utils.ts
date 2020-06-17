import { isEmpty } from "~utils/attribute";

const HEADER_DATA_TYPE = "header-cell";
const ROW_DATA_TYPE = "row-cell";

const DATA_ID = "data-id";
const DATA_TYPE = "data-type";

export interface Row extends HTMLElement {
  "data-id": string;
  "data-type": string;
}

export function isAttrInElement(element: Element, attrName: string): boolean {
  return !isEmpty(element.getAttribute(attrName));
}

export function checkDataType(
  element: Element,
  expectedDataType: string
): boolean {
  return element.getAttribute(DATA_TYPE) === expectedDataType;
}

export function isValidElement(element: Element, attrs: string[]): boolean {
  return !attrs.some((attr) => !isAttrInElement(element, attr));
}

export function isValidCell(
  element: Element,
  expectedDataType: string
): boolean {
  return (
    isValidElement(element, [DATA_ID, DATA_TYPE]) &&
    checkDataType(element, expectedDataType)
  );
}

export function isHeaderCell(element: Element): element is Row {
  return isValidCell(element, HEADER_DATA_TYPE);
}

export function isRowCell(element: Element): element is Row {
  return isValidCell(element, ROW_DATA_TYPE);
}
