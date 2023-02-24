### Usage

```typescript
import MultiSelect from '@amalto/multi-select';
```

```javascript
initialState = { value: [] };

const options = [
  { value: 'first', label: 'first' },
  { value: 'second', label: 'second' },
  { value: 'third', label: 'third' },
];

const handleChange = (e) => {
  setState({ value: e.target.value });
};

<MultiSelect
  name="multi-select-example"
  label="MultiSelect example"
  options={options}
  multiple={true}
  value={state.value}
  handleChange={handleChange}
  locale={'en-US'}
  help="Helper text"
  containerClass="col-lg-12 col-xs-12 padding-none"
  inputClass="info-color"
/>;
```
