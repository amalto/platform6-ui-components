See [redux-form](https://redux-form.com/6.0.0-rc.1/docs/api/reduxform.md/) documentation for reduxForm options.

```javascript
const { reduxForm } = require('redux-form');

const moment = require('moment');

const today = new Date().toISOString();
const now = new moment(today).format('HH:mm');
const min = new moment(today).subtract(1, 'hour').format('HH:mm');
const max = new moment(today).add(1, 'hour').format('HH:mm');

const ExampleTimeInput = reduxForm({
    initialValues: {
        'time-input-example': now
    },
    form: 'form-time-input-example',
    enableReinitialize: true
})(TimeInput);

<ExampleTimeInput name='time-input-example'
    disabled={false}
    label='DateInput example'
    help='Helper text'
    minutesInterval={10}
    minHour={min}
    maxHour={max}
    containerClass='padded'
    mandatory={true}
/>
```