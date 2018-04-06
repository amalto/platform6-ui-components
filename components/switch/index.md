### Usage

```typescript
import Switch from '@amalto/switch'
```

```javascript
initialState = { value: true };

<Switch id='test-switch-id'
    name='test-switch-name'
    value={state.value}
    changeHandler={( value, name ) => { setState({ value }) }}
    alignLeft={false}
    cssClass=''
/>
```