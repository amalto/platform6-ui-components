```javascript
const moment = require('moment');

const min = new moment().subtract(1, 'month').format('YYYY-MM-DD').toString();
const max = new moment().add(1, 'month').format('YYYY-MM-DD').toString();
const today = new Date().toString();

<DatePicker name='datepickerInputName'
    defaultValue={today}
    minDate={min}
    maxDate={max}
    mandatory={true}
    label='DatePicker component'
    help={`Date between ${min} and ${max}`}
    containerClass='info-color'
/>
```