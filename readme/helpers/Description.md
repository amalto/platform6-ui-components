```jsx noeditor
const CopyStringContent = require('../../typescript/components/CopyStringContent').default;

<div>
    <CopyStringContent content='npm install --save @amalto/helpers' />
    <CopyStringContent content="import ScopeHelpers from '@amalto/helpers'" />
</div>
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