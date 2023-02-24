### Usage

```typescript
import TranslationField from '@amalto/translation-field';
```

```javascript
const data = require('./data.json');

initialState = { value: data };

<TranslationField
  name="exemple-transaction-field"
  label="exemple-transaction-field"
  help="English is mandatory"
  useTextarea={false}
  disableMultilanguage={false}
  value={state.value}
  onChange={(value) => {
    setState({ value });
  }}
/>;
```
