# ActionButton

### Import
```javascript
import ActionButton from 'action-button'
```

### Properties

Props | PropType | description | default |required
--- | --- | --- | :---: | :---:
clickAction | ( event?: any ) => void | The method you want to trigger when the button is clicked | - | false
iconClass | string | Any FontAwesome icon CSS class names like "fa-info" or "fa-info fa-lg" | - | false
colorClass | string | Any available Portal CSS class names. Usually used to change the color of the icon | - | false
disabled | boolean | You can disable the button with this props. It will be greyed and not clickable | false | false
tooltipText | string | A text that will be displayed in the "title" HTML attribute of the button | - | false
btnClass | string | Any available Portal CSS class names you want to apply to the icon wrapper <div/>. This can be used to space the icon from any other content | - | false

### Exemple
```javascript
<ActionButton clickAction={e => deleteItem( e )}
    iconClass='fa-trash'
    tooltipText='Delete item'
    btnClass='btn-trans btn-danger'
/>
```