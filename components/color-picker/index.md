```javascript
const ColorPicker = require('@amalto/color-picker').default;

initialState = { color: '#81d319' };

<ColorPicker color={state.color}
    handleColorChange={color => setState({ color })}
/>
```