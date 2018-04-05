See [redux-form](https://redux-form.com/6.0.0-rc.1/docs/api/reduxform.md/) documentation for reduxForm options.

```javascript
const TypeaheadFormInput = require('@amalto/typeahead-form-input').default;
const { reduxForm } = require('redux-form');

const collection = ['first','second','third'];
const display = value => value;
const datumTokenizer = datum => [datum];

const ExampleTypeaheadFormInput = reduxForm({
    form: 'form-typeahead-form-input-example',
    enableReinitialize: true
})(TypeaheadFormInput);

<ExampleTypeaheadFormInput name='typeahead-form-input-example'
    collection={collection}
    datumTokenizer={datumTokenizer}
    display={display}
    label='TypeaheadFormInput example'
    placeholder='Value here'
    help='Helper text'
    containerClass='padded'
    collapseErrorSpace={true}
/>
```