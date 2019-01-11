### Usage

```typescript
import Signature from '@amalto/signature'
```

```javascript
const img = require('./constants/img.ts').img;

initialState = { imageData: img };

<div style={{ width: 350, margin: 'auto' }}>
    <Signature label='Signature example' defaultSignature={state.imageData}
        height={350}
        width={300}
        saveSignature={data => setState( { imageData: data } )}
        clearSignature={() => setState( { imageData: null } )}
        locale='en-US'
    />
</div>
```