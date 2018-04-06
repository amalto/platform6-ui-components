### Usage

```typescript
import ActionButton from '@amalto/action-button'
```

```javascript
<ActionButton clickAction={e => window.alert('click on button')}
    iconClass='fas fa-info'
    colorClass='' // Set to empty string to prevent conflict with `btn-info` class
    btnClass='btn btn-trans btn-info'
    disabled={false}
    tooltipText='Info button'
/>
```