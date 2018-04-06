### Usage

```typescript
import DatePicker from '@amalto/date-picker'
```

```javascript
const moment = require('moment');

const today = new Date().toISOString();
const min = new moment(today).subtract(1, 'month').format('YYYY-MM-DD');
const max = new moment(today).add(1, 'month').format('YYYY-MM-DD');

<DatePicker name='datepickerInputName'
    defaultValue={today}
    minDate={min}
    maxDate={max}
    mandatory={true}
    label='DatePicker component'
    help={`Select date between ${min} and ${max}`}
    containerClass='info-color pos-relative'
/>
```