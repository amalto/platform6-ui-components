/* eslint-disable import/no-extraneous-dependencies */
import { decorate } from "@storybook/addon-actions";
/* eslint-enable import/no-extraneous-dependencies */

export default {
  title: "Atom/Form",
  component: "p6-form",
  includeStories: [], // or don't load this file at all
};

const eventHandler = decorate([(events) => events[0].detail]);

export const Default = () => {
  const formContent = `
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
  `;

  // eslint-disable-next-line no-undef
  const form = document.createElement("p6-form");
  form.addEventListener("p6Submit", eventHandler.action("p6Submit"));
  form.innerHTML = formContent;
  return form;
};

Default.story = {
  parameters: {
    docs: {
      source: {
        code: `
        <p6-form onP6Submit="submitHandler">
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
      `,
      },
    },
  },
};
