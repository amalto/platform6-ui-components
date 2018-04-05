```javascript
const Switch = require('@amalto/switch').default;

initialState = { value: true };

<Switch id='test-switch-id'
    name='test-switch-name'
    value={state.value}
    changeHandler={( value, name ) => { setState({ value }) }}
    alignLeft={false}
    cssClass=''
/>
```