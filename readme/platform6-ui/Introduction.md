```jsx noeditor
const Pathline = require('../../typescript/custom/Pathline').default;
const version = require('../../package.json').dependencies['@amalto/platform6-ui'];

<Pathline children={JSON.stringify( { name: '@amalto/platform6-ui', version } )} />
```

TypeScript type definitions for base components and props available in <span className='quote'>Platform 6</span>

### Usage

```typescript
import * as platform6 from '@amalto/platform6-ui'
```

Each components and interfaces from this part are importable from this project.

This package should be used when developing the User Interface of your business application.

Some of the components and interfaces in this documentation must be imported from this module.