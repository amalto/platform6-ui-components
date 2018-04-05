See [redux-form](https://redux-form.com/6.0.0-rc.1/docs/api/reduxform.md/) documentation for reduxForm options.

```javascript
const SwitchInput = require('@amalto/switch-input').default;
const { reduxForm } = require('redux-form');

const ExampleSwitchInput = reduxForm({
    form: 'form-switch-input-example',
    enableReinitialize: true
})(SwitchInput);

<ExampleSwitchInput name='text-input-example'
    label='SwitchInput example'
    help='Helper text'
    containerClass='padded'
    inputClass='text-large'
    alignLeft={false}
    collapseErrorSpace={true}
/>
```