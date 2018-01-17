```javascript
const moment = require('moment');

const today = new Date().toISOString();
const now = new moment(today).format('HH:mm');

/** Used only for help display as minHour and maxHour are numbers */
const min = new moment(today).subtract(2, 'hours').minute(0).format('HH:mm');
const max = new moment(today).add(2, 'hours').minute(0).format('HH:mm');

initialState = {
    'timepicker-exemple-1': { value: now },
    'timepicker-exemple-2': { value: now }
};

function handleFieldChange( fieldValue, fieldName ) {
    setState( { [fieldName]: { value: fieldValue } } )
}

<div className='row'>
    <TimePicker label='TimePicker exemple 1'
        name='timepicker-exemple-1'
        value={state['timepicker-exemple-1'].value}
        help={`Time between ${min} and ${max}`}
        containerClass='info-color col-xs-6'
        handleFieldChange={handleFieldChange}
        minHour={4}
        maxHour={20}
        minutesInterval={10}
        mandatory={true}
        disabled={false}
    />

    <TimePicker label='TimePicker exemple 2'
        name='timepicker-exemple-2'
        value={state['timepicker-exemple-2'].value}
        help={`Time between ${min} and ${max}`}
        containerClass='info-color col-xs-6'
        handleFieldChange={handleFieldChange}
        minHour={4}
        maxHour={20}
        minutesInterval={10}
        mandatory={true}
        disabled={false}
    />
</div>
```