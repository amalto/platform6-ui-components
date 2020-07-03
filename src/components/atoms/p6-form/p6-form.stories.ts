/* eslint-disable import/no-extraneous-dependencies */
/* eslint-enable import/no-extraneous-dependencies */

export const Sample = (): string => `
<p6-form>
  <p6-field>
    <p6-label slot="label">custom inputs</p6-label>
    <p6-input name="c-input" required />
  </p6-field>
  <p6-field>
    <p6-label slot="label">native input</p6-label>
    <input name="n-input" required />
  </p6-field>
  <p6-button mode="primary" type="submit">
    click
  </p6-button>
  </p6-form>
`;
