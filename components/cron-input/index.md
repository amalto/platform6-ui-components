```javascript
const CronInput = require('@amalto/cron-input').default;

initialState = {
    value: {
        enabled: true,
        second: '30',
        minute: '10',
        hour: '5',
        dayOfMonth: '3',
        month: 'JAN',
        dayOfWeek: 'MON',
        year: '2017'
    }
}

const handleChange = ( fieldValue ) => {
    setState({ value: fieldValue })
};

<CronInput name='cron-input-example'
    value={state.value}
    handleChange={handleChange}
    label='Cron input example'
    invalid={false}
    containerClass='padded'
    forceValidation={true}
    locale='en-US'
/>
```