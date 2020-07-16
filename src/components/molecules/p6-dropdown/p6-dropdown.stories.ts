import { getTextKnob } from "../../../shared/storybook/knobs";
import { getComponent, getPreview } from "../../../shared/storybook/stories";

const getDropdown = (label: string, children: string): string => {
  return getComponent(
    "p6-dropdown",
    `<span slot="label">${label}</span>${children}`
  );
};

export const DefaultStory = (): string => {
  return getDropdown(
    getTextKnob("Label", "Dropdown label"),
    `
        <p6-link href="#" class="dropdown-item">link 1 (with p6-link)</p6-link>
        <a href="#" class="dropdown-item">link 2 (with HTML anchor)</a>
        <div><p>You can insert <strong>any type of content</strong> within the dropdown menu.</p></div>
        <hr />
        <a href="#" class="dropdown-item">Link after a divider</a>
`
  );
};
DefaultStory.parameters = getPreview(
  getDropdown(
    "Label",
    `
        <a href="#" class="dropdown-item">link 1</a>
        <hr />
        <a href="#" class="dropdown-item">Link 2</a>
`
  )
);
