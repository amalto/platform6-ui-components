```javascript
const collection = ['first','second','third']

const handleInputChange = ( value ) => {
    console.info('handleInputChange :: value => ', value);
};
const display = ( value ) => {
    return value;
};

const datumTokenizer = ( datum ) => {
    return [datum];
}

<TypeaheadInput id='typeahead-input-example'
    collection={collection}
    value='first'
    handleInputChange={handleInputChange}
    display={display}
    datumTokenizer={datumTokenizer}
    placeholder='TypeaheadInput test'
/>
```