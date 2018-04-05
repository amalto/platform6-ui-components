```jsx noeditor
const InstallLine = require('../../typescript/components/InstallLine').default;

<InstallLine componentName='@amalto/helpers' />
```

Methods used in several Platform 6 UI components.

```jsx noeditor
const NpmLink = require('../../typescript/components/NpmLink').default;
const VersionLine = require('../../typescript/components/VersionLine').default;
const version = require('../../components/helpers/package.json').version;

<div>
    <NpmLink href='https://www.npmjs.com/package/@amalto/helpers' name='@amalto/helpers' />
    <VersionLine version={version} />
</div>
```