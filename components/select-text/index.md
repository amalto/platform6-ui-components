### Usage

```typescript
import SelectText from '@amalto/select-text'
```

```javascript
const options = [
    {
        leftIcon: 'fas fa-arrow-right info-color',
        value: 'first',
        iconAlignment: 'center',
        label: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dolor ligula, efficitur nec nisi a, rutrum posuere libero. Ut convallis eleifend nisi. Aenean semper commodo ultricies. Nullam venenatis elit vel dui luctus vulputate. Morbi semper turpis vel mi euismod, eu efficitur augue iaculis. Mauris eu tristique orci.',
        disabled: true
        
    },
    { leftIcon: 'fas fa-arrow-right info-color', leftIconTooltip: 'second left icon', rightIcon: 'fas fa-unlink warning-color', rightIconTooltip: 'second right icon', value: 'second', label: 'second' },
    { value: 'third', label: 'third', disabled: true },
    { leftIcon: 'fas fa-arrow-right info-color', rightIcon: 'fas fa-unlink warning-color', value: 'toto', label: 'toto' },
    { leftIcon: 'fas fa-arrow-right info-color', rightIcon: 'fas fa-unlink warning-color', value: 'titi', label: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dolor ligula, efficitur nec nisi a, rutrum posuere libero. Ut convallis eleifend nisi. Aenean semper commodo ultricies. Nullam venenatis elit vel dui luctus vulputate. Morbi semper turpis vel mi euismod, eu efficitur augue iaculis. Mauris eu tristique orci.' },
    { leftIcon: 'fas fa-asterisk warning-color', rightIcon: 'fas fa-unlink warning-color', value: '*', label: '*', disabled: true }
];

<SelectText name='select-text-input-example'
    label='SelectText example'
    placeholder='SelectText placeholder'
    disabled={false}
    defaultDisplayValue={'second'}
    help='Helper text'
    containerClass='col-lg-12 col-xs-12 padding-none'
    inputClass='text-large'
    options={options}
    type='text'
    autofocus={false}
/>
```