See [redux-form](https://redux-form.com/6.0.0-rc.1/docs/api/reduxform.md/) documentation for
reduxForm options.

### Usage

```typescript
import CheckboxesInput from '@amalto/checkboxes-input';
```

```javascript
const { reduxForm } = require('redux-form');

const ExampleCheckboxes = reduxForm({
  form: 'form-checkboxes-input-example',
  enableReinitialize: true,
})(CheckboxesInput);

const options = [
  { value: 'first', label: 'first' },
  { value: 'second', label: 'second' },
];

<ExampleCheckboxes
  name="checkboxes-input-example"
  label="CheckboxesInput example"
  options={options}
  disabled={false}
  help="Helper text"
  inputClass="info-color mgr-10"
  collapseErrorSpace={true}
/>;
```
