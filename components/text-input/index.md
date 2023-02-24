See [redux-form](https://redux-form.com/6.0.0-rc.1/docs/api/reduxform.md/) documentation for reduxForm options.

### Usage

```typescript
import TextInput from '@amalto/text-input';
```

```javascript
const { reduxForm } = require('redux-form');

const ExampleTextInput = reduxForm({
  form: 'form-text-input-example',
  enableReinitialize: true,
})(TextInput);

<ExampleTextInput
  name="text-input-example"
  label="TextInput example"
  placeholder="TextInput placeholder"
  disabled={false}
  help="Helper text"
  containerClass="padded"
  inputClass="text-large"
  type="text"
  autofocus={false}
  randomGenerator={true}
  collapseErrorSpace={true}
/>;
```
