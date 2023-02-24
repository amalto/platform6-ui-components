See [redux-form](https://redux-form.com/6.0.0-rc.1/docs/api/reduxform.md/) documentation for reduxForm options.

### Usage

```typescript
import RadioInput from '@amalto/radio-input';
```

```javascript
const { reduxForm } = require('redux-form');

const DecoratedRadioInput = reduxForm({
  form: 'form-radio-input-example',
  enableReinitialize: true,
})(RadioInput);

<DecoratedRadioInput
  name="radio-input-example"
  label="RadioInput example"
  options={[
    {
      value: 'first',
      label: 'first',
    },
    {
      value: 'second',
      label: 'second',
    },
  ]}
  disabled={false}
  help="Helper text"
  containerClass="col-lg-12 col-xs-12 padding-none"
  inputClass="text-large"
  collapseErrorSpace={true}
/>;
```
