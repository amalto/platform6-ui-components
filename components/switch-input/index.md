See [redux-form](https://redux-form.com/6.0.0-rc.1/docs/api/reduxform.md/) documentation for reduxForm options.

### Usage

```typescript
import SwitchInput from '@amalto/switch-input';
```

```javascript
const { reduxForm } = require('redux-form');

const ExampleSwitchInput = reduxForm({
  form: 'form-switch-input-example',
  enableReinitialize: true,
})(SwitchInput);

<ExampleSwitchInput
  name="text-input-example"
  label="SwitchInput example"
  help="Helper text"
  containerClass="col-lg-12 col-xs-12 padding-none"
  inputClass="text-large"
  alignLeft={false}
  collapseErrorSpace={true}
/>;
```
