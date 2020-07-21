import { getForm } from "../../../shared/storybook/stories";

export const DefaultStory = (): string =>
  getForm(`
  <p6-field>
    <p6-label slot="label">custom inputs</p6-label>
    <p6-input name="c-input" required />
  </p6-field>
  <p6-field>
    <p6-label slot="label">native input</p6-label>
    <input name="n-input" required />
  </p6-field>
`);
