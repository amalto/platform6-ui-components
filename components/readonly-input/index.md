See [redux-form](https://redux-form.com/6.0.0-rc.1/docs/api/reduxform.md/) documentation for
reduxForm options.

### Usage

```typescript
import ReadonlyInput from '@amalto/readonly-input';
```

```javascript
const { reduxForm } = require('redux-form');

const ExampleReadonlyInput = reduxForm({
  initialValues: {
    'readonly-input-example': 'readonly input value',
  },
  form: 'form-readonly-input-example',
  enableReinitialize: true,
})(ReadonlyInput);

<ExampleReadonlyInput
  name="readonly-input-example"
  label="ReadonlyInput example"
  help="Helper text"
  containerClass="col-lg-12 col-xs-12 padding-none"
  inputClass="text-large"
  collapseErrorSpace={true}
/>;
```
