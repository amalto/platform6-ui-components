```jsx noeditor
const version = require('../../components/typings/package.json').version;
const Pathline = require('../../typescript/custom/Pathline').default;

<Pathline children={JSON.stringify( { name: '@amalto/typings', version } )} />
```

Interfaces used in several Platform 6 UI components.

### Usage

```typescript
import * as typings from '@amalto/typings'
```