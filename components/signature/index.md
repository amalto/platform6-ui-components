### Usage

```typescript
import Signature from '@amalto/signature'
```

```javascript
const img = require('./constants/img.ts').img;

initialState = { imageData: img };

const saveSignature = ( data ) => {
    setState( { imageData: data } );
};

<div style={{ width: 350, margin: 'auto' }}>
    <Signature label='Signature example' defaultSignature={state.imageData}
        height={350}
        width={300}
        readonly={false}
        saveSignature={saveSignature}
        clearSignature={() => console.info('clear signature')}
        locale='en-US'
    />
</div>
```