```jsx noeditor
const InstallLine = require('{{pathToDocComponent}}/InstallLine').default;

<InstallLine componentName='@amalto/{{componentName}}' />
```

{{description}}

```jsx noeditor
const NpmLink = require('{{pathToDocComponent}}/NpmLink').default;
const VersionLine = require('{{pathToDocComponent}}/VersionLine').default;
const version = require('{{pathToComponent}}/{{componentName}}/package.json').version;

<div>
    <NpmLink href='https://www.npmjs.com/package/@amalto/{{componentName}}' name='@amalto/{{componentName}}' />
    <VersionLine version={version} />
</div>
```