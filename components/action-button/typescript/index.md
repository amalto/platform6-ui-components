ActionButton exemple:

```javascript
<ActionButton clickAction={e => window.alert('click on button')}
    iconClass='fa-info'
    colorClass='' // Set to empty string to prevent conflict with `btn-info` class
    btnClass='btn btn-trans btn-info'
    disabled={false}
    tooltipText='Info button'
/>
```