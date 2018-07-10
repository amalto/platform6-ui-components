```jsx noeditor
const version = require('../../components/service-helpers/package.json').version;
const Pathline = require('../../typescript/custom/Pathline').default;

<Pathline children={JSON.stringify( { name: '@amalto/service-helpers', version } )} />
```

Methods and constants used in Platform 6 UI components services.

### Usage

```typescript
import * as serviceHelpers from '@amalto/service-helpers'
```