### Usage

```typescript
import KeyValueEditor from '@amalto/key-value-editor';
```

```javascript
const base64 = require('base-64');

initialState = {
  keyValues: {
    key_1: {
      contentType: 'plain/text',
      contentBytes: base64.encode('first key'),
    },
  },
};

function handleChange(keyValues) {
  setState({ keyValues });
}

<KeyValueEditor handleChange={handleChange} keyValues={state.keyValues} locale="en-US" />;
```
