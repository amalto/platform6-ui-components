### Usage

```typescript
import CodeEditorInput from '@amalto/code-editor-input';
```

```javascript
const { reduxForm } = require('redux-form');
const value = `function initializeProperties(target, members) {
  var keys = Object.keys(members);
  var properties;
  var i, len;
  for (i = 0, len = keys.length; i < len; i++) {
    var key = keys[i];
    var enumerable = key.charCodeAt(0) !== /*_*/95;
    var member = members[key];
    if (member && typeof member === 'object') {
      if (member.value !== undefined || typeof member.get === 'function' || typeof member.set === 'function') {
        if (member.enumerable === undefined) {
          member.enumerable = enumerable;
        }
        properties = properties || {};
        properties[key] = member;
        continue;
      }
    }
    if (!enumerable) {
      properties = properties || {};
      properties[key] = { value: member, enumerable: enumerable, configurable: true, writable: true }
      continue;
    }
    target[key] = member;
  }
  if (properties) {
    Object.defineProperties(target, properties);
  }
}`
const ExampleCodeEditorInput = reduxForm({
  initialValues: { 'code-editor-input-example': value },
  form: 'code-editor-input-example',
  enableReinitialize: true,
})(CodeEditorInput);

const saveEditorContent = (session) => {
  // Handle save by shortcut keyboard
};
const saveSession = (session) => {
  // Handle save by update
};
<ExampleCodeEditorInput
  name="code-editor-input-example"
  label="CodeEditorInput example"
  readonly={false}
  help="CodeEditorInput help"
  containerClass=""
  inputClass=""
  maxLines="unlimited"
  mode="ace/mode/javascript"
  initSession={null}
  saveEditorContent={saveEditorContent}
  saveSession={saveSession}
  displaySettings={{}}
  resetTick={0}
  user={null}
/>;
```
