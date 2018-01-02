# KeyValueEditor

<!-- STORY -->

### Usage
```javascript
import KeyValueEditor from 'key-value-editor'
```

## Informations
The __KeyValueEditor__ component allow you to generate a map where the value can be a `text` or `file`. If the value is a file, you will be able to download it.

### Interfaces
- KeyValDef
    - [key: string]: { contentType: string; contentBytes: string; }

### Properties
- **handleChange**: Detect change on the data and return them as a parameter which allow you to handle them.
- **keyValues**: Map of `KeyValDef` to be displayed.
- **locale**: Locale to be used by the __KeyValueEditor__ component.

### Exemple
```javascript
<KeyValueEditor clickAction={e => deleteItem( e )}
    iconClass='fa-trash'
    tooltipText='Delete item'
    btnClass='btn-trans btn-danger'
/>
```