import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import {
  addParameters,
  configure,
  setCustomElements,
} from "@storybook/web-components";
import customElements from "../dist/docs/custom-elements.json";

setCustomElements(customElements);

addParameters({
  a11y: {
    element: "#root",
    config: {},
    options: {},
    manual: true,
  },
  docs: {
    inlineStories: false,
    extractComponentDescription: (a, b) => {
      if (b.notes !== undefined) {
        return typeof b.notes === "string"
          ? b.notes
          : b.notes.markdown || b.notes.text;
      }
      return null;
    },
  },
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
});

export const parameters = {
  controls: { expanded: true },
};

/*
const req = require.context("../src/components", true, /.stories.(ts|mdx)$/);
configure(req, module);

if (module.hot) {
  module.hot.accept(req.id, () => {
    const currentLocationHref = window.location.href;
    window.history.pushState(null, null, currentLocationHref);
    window.location.reload();
  });
}
 */
