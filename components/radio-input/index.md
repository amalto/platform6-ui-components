```javascript
const { reduxForm } = require('redux-form');

const DecoratedRadioInput = reduxForm({
    form: 'form-radio-input-example',
    enableReinitialize: true
    })(RadioInput);

<DecoratedRadioInput name='radio-input-example'
    label='RadioInput example'
    options={[
        {
            value: 'first',
            label: 'first'
        },
        {
            value: 'second',
            label: 'second'
        }
    ]}
    disabled={false}
    help='Helper text'
    containerClass='padded'
    inputClass='text-large'
    collapseErrorSpace={true}
/>
```