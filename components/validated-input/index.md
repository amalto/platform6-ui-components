### Usage

```typescript
import ValidatedInput from '@amalto/validated-input';
```

```javascript
initialState = {
  'validateinput-exemple-1': {
    value: 'HelloWorld',
    isInvalid: false,
  },
  'validateinput-exemple-3': {
    value: 'option1',
    choices: [
      { value: 'option1', label: 'option1' },
      { value: 'option2', label: 'option2' },
      { value: 'option3', label: 'option3' },
    ],
    isInvalid: false,
  },
};

function handleFieldChange(fieldValue, fieldName, isInvalid) {
  setState({
    [fieldName]: {
      ...state[fieldName],
      value: fieldValue,
      isInvalid,
    },
  });
}

function atLeast5(fieldValue) {
  return fieldValue && fieldValue.length >= 5;
}

<div>
  <ValidatedInput
    name="validateinput-exemple-1"
    key="validateinput-exemple-1"
    label="ValidateInput exemple 1"
    containerClass="primary-color pos-relative"
    value={state['validateinput-exemple-1'].value}
    handleFieldChange={handleFieldChange}
    regex={/hello/i}
    help={`Value must contain "hello".`}
    errorMessage={`Value don't contain "hello"`}
    placeholder="Your value here"
    mandatory={true}
    validateOnLoad="true"
    formSubmitted={true}
    disabled={false}
  />

  <ValidatedInput
    name="validateinput-exemple-3"
    key="validateinput-exemple-3"
    label="ValidateInput exemple 3"
    containerClass="warning-color pos-relative"
    value={state['validateinput-exemple-3'].value}
    choices={state['validateinput-exemple-3'].choices}
    handleFieldChange={handleFieldChange}
    help={`No validation here.`}
    mandatory={false}
    disabled={false}
  />
</div>;
```
