### Usage

```typescript
import TranslationField from '@amalto/translation-field'
```

```javascript
const data = require('./data.json');

<TranslationField name='exemple-transaction-field'
    name='exemple-transaction-field'
    value={data}
    onChange={( value ) => { console.info('value => ', value); }}
/>
```