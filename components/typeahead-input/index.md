### Usage

```typescript
import TypeaheadInput from '@amalto/typeahead-input'
```

```javascript
const collection = {
    '*': ['first','second','third'],
    'dev': ['fourth','fifth','sixth'],
    'master': ['seventh','eighth','nineth']
};

initialState = { value: 'first', selectedCollectionType: '*' }

const handleInputChange = ( value ) => {
    // Handle input onchange event
    setState({ value })
};
const display = value => value;
const datumTokenizer = datum => [datum];
const setCollectionType = ( type ) => { setState({ selectedCollectionType: type }) }

<TypeaheadInput id='typeahead-input-example'
    collection={collection[state.selectedCollectionType]}
    value={state.value}
    handleInputChange={handleInputChange}
    display={display}
    datumTokenizer={datumTokenizer}
    placeholder='TypeaheadInput test'
    selectedCollectionType={state.selectedCollectionType}
    collectionTypes={['*', 'dev', 'master']}
    setCollectionType={setCollectionType}
/>
```