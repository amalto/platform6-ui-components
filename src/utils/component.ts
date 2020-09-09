export function isInSlot(name: string): (elmt: Element) => boolean {
  return (elmt): boolean => elmt.slot === name;
}

export function isInDefaultSlot(elmt: Element): boolean {
  return isInSlot('')(elmt);
}
