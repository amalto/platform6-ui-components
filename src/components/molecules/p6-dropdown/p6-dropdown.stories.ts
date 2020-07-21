import { getComponent, makeStory } from "../../../shared/storybook/stories";

const getStoryField = (label: string, children: string): string =>
  getComponent("p6-dropdown", `<span slot="label">${label}</span>${children}`);

export const DefaultStory = makeStory<{
  label: string;
}>({
  args: {
    label: "Dropdown label",
  },
  builder: ({ label }): string =>
    getStoryField(
      label,
      `
        <p6-link href="#" class="dropdown-item">link 1 (with p6-link)</p6-link>
        <a href="#" class="dropdown-item">link 2 (with HTML anchor)</a>
        <div><p>You can insert <strong>any type of content</strong> within the dropdown menu.</p></div>
        <hr />
        <a href="#" class="dropdown-item">Link after a divider</a>
`
    ),
  preview: ({ label }) =>
    getStoryField(
      label,
      `
        <a href="#" class="dropdown-item">link 1</a>
        <hr />
        <a href="#" class="dropdown-item">Link 2</a>
`
    ),
});
