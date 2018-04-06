### Usage

```typescript
import CodeEditorInput from '@amalto/code-editor-input'
```

```javascript
const { reduxForm } = require('redux-form');

const ExampleCodeEditorInput = reduxForm({
    initialValues: { 'code-editor-input-example': 'const value = \'test\';' },
    form: 'code-editor-input-example',
    enableReinitialize: true
})(CodeEditorInput);

const saveEditorContent = ( session ) => {
    // Handle save by shortcut keyboard
};
const saveSession = ( session ) => {
    // Handle save by update
};
<ExampleCodeEditorInput name='code-editor-input-example'
    label='CodeEditorInput example'
    readonly={false}
    help='CodeEditorInput help'
    containerClass=''
    inputClass=''
    mode='ace/mode/javascript'
    height={300}
    initSession={null}
    saveEditorContent={saveEditorContent}
    saveSession={saveSession}
    displaySettings={{}}
    resetTick={0}
    user={null}
/>
```