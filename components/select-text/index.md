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
    },
    { leftIcon: 'fas fa-arrow-right info-color', leftIconTooltip: 'second left icon', rightIcon: 'fas fa-unlink warning-color', rightIconTooltip: 'second right icon', value: 'second', label: 'second' },
    { leftIcon: 'fas fa-arrow-right info-color', leftIconTooltip: 'second left icon', rightIcon: 'fas fa-unlink warning-color', rightIconTooltip: 'second right icon', value: 'Second', label: 'Second' },
    { leftIcon: 'fas fa-arrow-right info-color', leftIconTooltip: 'second left icon', rightIcon: 'fas fa-unlink warning-color', rightIconTooltip: 'second right icon', value: 'SECOND', label: 'SECOND' },
    { value: 'third', label: 'third', disabled: true },
    { leftIcon: 'fas fa-arrow-right info-color', rightIcon: 'fas fa-unlink warning-color', value: 'toto', label: 'toto' },
    { leftIcon: 'fas fa-arrow-right info-color', rightIcon: 'fas fa-unlink warning-color', value: 'titi', label: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dolor ligula, efficitur nec nisi a, rutrum posuere libero. Ut convallis eleifend nisi. Aenean semper commodo ultricies. Nullam venenatis elit vel dui luctus vulputate. Morbi semper turpis vel mi euismod, eu efficitur augue iaculis. Mauris eu tristique orci.' },
    { leftIcon: 'fas fa-asterisk warning-color', rightIcon: 'fas fa-unlink warning-color', value: 1, label: 1 },
    { leftIcon: 'fas fa-asterisk warning-color', rightIcon: 'fas fa-unlink warning-color', value: '*', label: '*', disabled: true },
    { leftIcon: 'fas fa-asterisk warning-color', rightIcon: 'fas fa-unlink warning-color', value: '*1', label: '*1' },
    { leftIcon: 'fas fa-asterisk warning-color', rightIcon: 'fas fa-unlink warning-color', value: '*2', label: '*2' },
    { leftIcon: 'fas fa-asterisk warning-color', rightIcon: 'fas fa-unlink warning-color', value: '*3', label: '*3' },
    { leftIcon: 'fas fa-asterisk warning-color', rightIcon: 'fas fa-unlink warning-color', value: '*4', label: '*4' },
    { leftIcon: 'fas fa-asterisk warning-color', rightIcon: 'fas fa-unlink warning-color', value: '*5', label: '*5' },
    { leftIcon: 'fas fa-asterisk warning-color', rightIcon: 'fas fa-unlink warning-color', value: '*6', label: '*6' },
    { leftIcon: 'fas fa-asterisk warning-color', rightIcon: 'fas fa-unlink warning-color', value: '*7', label: '*7' },
    { leftIcon: 'fas fa-asterisk warning-color', rightIcon: 'fas fa-unlink warning-color', value: '*8', label: '*8' },
    { leftIcon: 'fas fa-asterisk warning-color', rightIcon: 'fas fa-unlink warning-color', value: '*9', label: '*9' },
    { leftIcon: 'fas fa-asterisk warning-color', rightIcon: 'fas fa-unlink warning-color', value: '*10', label: '*10' },
    { leftIcon: 'fas fa-asterisk warning-color', rightIcon: 'fas fa-unlink warning-color', value: '*11', label: '*11' },
    { leftIcon: 'fas fa-asterisk warning-color', rightIcon: 'fas fa-unlink warning-color', value: '*12', label: '*12' },
    { leftIcon: 'fas fa-asterisk warning-color', rightIcon: 'fas fa-unlink warning-color', value: '*13', label: '*13' },
    { leftIcon: 'fas fa-asterisk warning-color', rightIcon: 'fas fa-unlink warning-color', value: '*14', label: '*14' },
    { leftIcon: 'fas fa-asterisk warning-color', rightIcon: 'fas fa-unlink warning-color', value: '*15', label: '*15' },
    { leftIcon: 'fas fa-asterisk warning-color', rightIcon: 'fas fa-unlink warning-color', value: '*16', label: '*16' },
    { leftIcon: 'fas fa-asterisk warning-color', rightIcon: 'fas fa-unlink warning-color', value: '*17', label: '*17' },
    { leftIcon: 'fas fa-asterisk warning-color', rightIcon: 'fas fa-unlink warning-color', value: '*18', label: '*18' },
    { leftIcon: 'fas fa-asterisk warning-color', rightIcon: 'fas fa-unlink warning-color', value: '*19', label: '*19' },
    { leftIcon: 'fas fa-asterisk warning-color', rightIcon: 'fas fa-unlink warning-color', value: '*20', label: '*20' },
    { leftIcon: 'fas fa-asterisk warning-color', rightIcon: 'fas fa-unlink warning-color', value: '*21', label: '*21' },
    { leftIcon: 'fas fa-asterisk warning-color', rightIcon: 'fas fa-unlink warning-color', value: '*22', label: '*22' },
    { leftIcon: 'fas fa-asterisk warning-color', rightIcon: 'fas fa-unlink warning-color', value: '*23', label: '*23' },
    { leftIcon: 'fas fa-asterisk warning-color', rightIcon: 'fas fa-unlink warning-color', value: '*24', label: '*24' },
    { leftIcon: 'fas fa-asterisk warning-color', rightIcon: 'fas fa-unlink warning-color', value: '*25', label: '*25' }
];

initialState = {
    defaultDisplayValue: 'second'
    };

<SelectText name='select-text-input-example'
    label='SelectText example'
    placeholder='SelectText placeholder'
    disabled={false}
    defaultDisplayValue={state.defaultDisplayValue}
    help='Helper text'
    containerClass='col-lg-12 col-xs-12 padding-none'
    inputClass='text-large'
    options={options}
    type='text'
    autofocus={false}
    handleOnChange={ value => setState( { defaultDisplayValue: value } ) }
/>
```