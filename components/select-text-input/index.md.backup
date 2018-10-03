See [redux-form](https://redux-form.com/6.0.0-rc.1/docs/api/reduxform.md/) documentation for reduxForm options.

### Usage

```typescript
import SelectTextInput from '@amalto/select-text-input'
```

```javascript
const { reduxForm } = require('redux-form');

const ExampleSelectTextInput = reduxForm({
    form: 'form-select-text-input-example',
    enableReinitialize: true
})(SelectTextInput);

const options = [
    {
        leftIcon: 'fas fa-arrow-right info-color',
        rightIcon: 'fas fa-unlink warning-color',
        value: 'first',
        iconAlignment: 'center',
        label: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dolor ligula, efficitur nec nisi a, rutrum posuere libero. Ut convallis eleifend nisi. Aenean semper commodo ultricies. Nullam venenatis elit vel dui luctus vulputate. Morbi semper turpis vel mi euismod, eu efficitur augue iaculis. Mauris eu tristique orci.'
        
    },
    { leftIcon: 'fas fa-arrow-right info-color', rightIcon: 'fas fa-unlink warning-color', value: 'second', label: 'second' },
    { leftIcon: 'fas fa-arrow-right info-color', rightIcon: 'fas fa-unlink warning-color', value: 'third', label: 'third' }
];

<ExampleSelectTextInput name='select-text-input-example'
    label='SelectTextInput example'
    placeholder='SelectTextInput placeholder'
    disabled={false}
    help='Helper text'
    containerClass='col-lg-12 col-xs-12 padding-none'
    inputClass='text-large'
    options={options}
    type='text'
    autofocus={false}
    collapseErrorSpace={true}
/>
```