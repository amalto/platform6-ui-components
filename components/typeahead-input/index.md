### Usage

```typescript
import TypeaheadInput from '@amalto/typeahead-input'
```

```javascript
const collection = ['first','second','third'];

const handleInputChange = ( value ) => {
    // Handle input onchange event
};
const display = value => value;
const datumTokenizer = datum => [datum];

<TypeaheadInput id='typeahead-input-example'
    collection={collection}
    value='first'
    handleInputChange={handleInputChange}
    display={display}
    datumTokenizer={datumTokenizer}
    placeholder='TypeaheadInput test'
/>
```