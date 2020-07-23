/**
 * Stencil Doc Outputs don't seem to support custom-elements.json as suggested
 * here: https://github.com/w3c/webcomponents/issues/776#issuecomment-536749457.
 * This generator implements this standard, which is used by Storybook to display
 * documentation.
 * Thanks to @jagreehal https://github.com/jagreehal/stencil-boilerplate/blob/master/src/customElementDocGenerator.ts
 */
import { Config } from "@stencil/core";
import { JsonDocs, JsonDocsComponent } from "@stencil/core/internal";

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
function isOutputTargetCustomElementDocsJson(o: any): boolean {
  return o.name === "custom-element-docs";
}

export async function writeDocsOutput(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  compilerCtx: any,
  jsonContent: string,
  root: string
): Promise<void> {
  return compilerCtx.fs.writeFile(
    `${root}/dist/docs/custom-elements.json`,
    jsonContent
  );
}

export async function generateJsonDocs(
  config: Config & { rootDir?: string },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  compilerCtx: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  _buildCtx: any,
  docs: JsonDocs
): Promise<void> {
  const jsonOutputTargets =
    config.outputTargets === undefined
      ? []
      : config.outputTargets.filter(isOutputTargetCustomElementDocsJson);

  const { components, ...docsDataWithoutComponents } = docs;
  const json = {
    ...docsDataWithoutComponents,

    tags: components.map((cmp: JsonDocsComponent) => ({
      filePath: cmp.filePath,
      encapsulation: cmp.encapsulation,
      tag: cmp.tag,
      name: cmp.tag,
      readme: cmp.readme,
      description: cmp.docs,
      docsTags: cmp.docsTags,
      usage: cmp.usage,
      properties: cmp.props.map((prop) => ({
        ...prop,
        description: prop.docs,
      })),
      attributes: cmp.props.map((prop) => ({
        ...prop,
        name: prop.attr,
        description: prop.docs,
      })),
      methods: cmp.methods,
      events: cmp.events.map((e) => ({
        ...e,
        name: e.event,
        description: e.docs,
        type: e.detail,
      })),
      styles: cmp.styles,
      slots: cmp.slots,
      dependents: cmp.dependents,
      dependencies: cmp.dependencies,
      dependencyGraph: cmp.dependencyGraph,
      deprecation: cmp.deprecation,
    })),
  };
  const jsonContent = JSON.stringify(json, null, 2);
  await Promise.all(
    jsonOutputTargets.map(() => {
      return writeDocsOutput(compilerCtx, jsonContent, config.rootDir || "");
    })
  );
}
