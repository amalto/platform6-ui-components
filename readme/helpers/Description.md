```jsx noeditor
const version = require('../../components/helpers/package.json').version;
const Pathline = require('../../typescript/custom/Pathline').default;

<Pathline children={JSON.stringify( { name: '@amalto/helpers', version } )} />
```

Methods used in several Platform 6 UI components.