Props are set to null except the url source to get the default Signature.

### Usage

```typescript
import Signature from '@amalto/signature'
```

```javascript
initialState = { imageData: null };

<Signature label='Signature example' defaultSignature={state.imageData}
    height={300}
    width={300}
    saveSignature={data => setState( { imageData: data } )}
    clearSignature={() => setState( { imageData: null } )}
    locale='en-US'
/>
```