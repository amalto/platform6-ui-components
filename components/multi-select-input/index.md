### Usage

```typescript
import MultiSelect from '@amalto/multi-select'
```

```javascript
const { reduxForm } = require('redux-form');

initialState = { value: '' };

const SimpleForm = ( props ) => {
    const { handleSubmit } = props

    const options = [
        { value: 'first', label: 'first' },
        { value: 'second', label: 'second' },
        { value: 'third', label: 'third' }
    ];

    const handleChange = ( e ) => {
        setState({ value: e.target.value })
    };

    return (
        <form onSubmit={handleSubmit}>
            <button type="submit">Submit</button>
            <MultiSelectInput name='multi-select-input-example'
                label='MultiSelectInput example'
                options={options}
                multiple={true}
                handleChange={handleChange}
                fieldLineHeight={1.5}
                locale={'en-US'}
                help='Helper text'
                containerClass='col-lg-12 col-xs-12 padding-none'
                inputClass='info-color'
                disabled={false}
                collapseErrorSpace={true}
            />
        </form>
    )
};

const ExampleSimpleForm = reduxForm({
    form: 'form-textarea-input-example',
    onSubmit: ( data ) => { console.info('data => ', data)},
    initialValues: { 'multi-select-input-example': 'second, third' },
    enableReinitialize: true
})(SimpleForm);

<ExampleSimpleForm />
```