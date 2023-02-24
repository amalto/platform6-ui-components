See [redux-form](https://redux-form.com/6.0.0-rc.1/docs/api/reduxform.md/) documentation for reduxForm options.

### Usage

```typescript
import TranslationFieldInput from '@amalto/translation-field-input';
```

```javascript
const { reduxForm } = require('redux-form');
const data = require('./data.json');

initialState = { value: data };

const ExempleTranslationFieldInput = reduxForm({
  initialValues: { 'exemple-transaction-field-input': state.value },
  form: 'form-transaction-field-input',
  enableReinitialize: true,
})(TranslationFieldInput);

<ExempleTranslationFieldInput
  name="exemple-transaction-field-input"
  label="exemple-transaction-field-input"
  help="English is mandatory"
  defaultLanguage="en"
  useTextarea={false}
  disableMultilanguage={false}
/>;
```
