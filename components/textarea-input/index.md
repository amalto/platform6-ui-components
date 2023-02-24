See [redux-form](https://redux-form.com/6.0.0-rc.1/docs/api/reduxform.md/) documentation for reduxForm options.

### Usage

```typescript
import TextareaInput from '@amalto/textarea-input';
```

```javascript
const { reduxForm } = require('redux-form');

const ExampleTextareaInput = reduxForm({
  form: 'form-textarea-input-example',
  enableReinitialize: true,
})(TextareaInput);

<ExampleTextareaInput
  name="textarea-input-example"
  label="TextareaInput example"
  disabled={false}
  help="Helper text"
  containerClass="col-lg-12 col-xs-12 padding-none"
  inputClass="text-large"
  collapseErrorSpace={true}
/>;
```
