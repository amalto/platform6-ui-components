### Usage

```typescript
import CodeEditor from '@amalto/code-editor'
```

```javascript
<div>
    <CodeEditor value={`const value = 'test';`}
        height={200}
        mode='javascript'
        loadTime={new Date().valueOf()}
        docId='code-editor-playground'
        displaySettings={{
            wrap: true
        }}
        readonly={false}
    />
</div>
```