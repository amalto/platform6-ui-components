# ActionButton

<!-- STORY -->

### Usage
```javascript
import ActionButton from 'action-button'
```

### Informations

This component is the button used in the amalto portal. You are able to play with the exemple above with the __KNOBS__ panel by changing the `iconClass`, `colorClass`, `disabled`, `tooltipText` and `btnClass` props.

> You can found all the font-awesome icons [here!](http://fontawesome.io/icons/)

### Props

> None of these props are required

- **clickAction**: The method you want to trigger when the button is clicked.
- **iconClass**: Any FontAwesome icon CSS class names like "fa-info" or "fa-info fa-lg".
- **colorClass**: Any available Portal CSS class names. Usually used to change the color of the icon.
- **disabled**: You can disable the button with this props. It will be greyed and not clickable.
- **tooltipText**: A text that will be displayed in the "title" HTML attribute of the button.
- **btnClass**: Any available Portal CSS class names you want to apply to the icon wrapper `<div/>`. This can be used to space the icon from any other content.

### Exemple
~~~js
<ActionButton btnClass='btn btn-info btn-trans mgt-10'
    iconClass='fa-info'
    tooltipText='Click on me'
    clickAction={(e) => console.info('Clicked on')}
/>
~~~