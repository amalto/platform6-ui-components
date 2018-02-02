See [redux-form](https://redux-form.com/6.0.0-rc.1/docs/api/reduxform.md/) documentation for reduxForm options.

```javascript
const { reduxForm } = require('redux-form');

const moment = require('moment');

const today = new Date().toISOString();
const min = new moment(today).subtract(1, 'month').format('YYYY-MM-DD');
const max = new moment(today).add(1, 'month').format('YYYY-MM-DD');

const ExampleDateInput = reduxForm({
    initialValues: {
        'date-input-example': today
    },
    form: 'form-date-input-example',
    enableReinitialize: true
})(DateInput);

<ExampleDateInput name='date-input-example'
    label='DateInput example'
    minDate={min}
    maxDate={max}
    mandatory={true}
    help='Helper text'
    containerClass='padded'
/>
```