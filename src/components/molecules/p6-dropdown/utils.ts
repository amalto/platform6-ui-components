export function addDropdownClass(child: Element): Element {
  if (child.nodeName === 'HR') {
    child.classList.add('dropdown-divider');
    return child;
  }

  child.classList.add('dropdown-item');
  return child;
}
