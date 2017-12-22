# Tree

### Import
```javascript
import Tree from 'tree'
```

### Interfaces

<div>Toto</div>

```typescript
interface TreeNodeModel {
    id: string;                         // Unique node ID in the tree, required
    text: string;                       // Node name, required
    children?: TreeNodeModel[];         // Children of the node. The same data model is used recursively
    icon?: string;                      // Any class names can be precised here. Usually you want to give some FontAwesome ones like "fa fa-fw fa-circle"
    data?: {                            // You can attach data to a node with this props
        description?: string;
        propertiesMap?: {
            [key: string]: {
                contentType: string;
                contentBytes: string;
            };
        };
        parentId?: string;
        childNames?: string[];
    };
    state?: {                           // Initial node state rendered in the tree
        opened?: boolean;
        disabled?: boolean;
        selected?: boolean;
    }
}
```

### Properties

Props | PropType | description | default |required
--- | --- | --- | :---: | :---:
id | string | Any unique DOM ID | - | true
data | TreeNodeModel | Data to render as a tree. See below for the required data model behind the TreeNodeModel interface | - | true
createNode | (parentId: string, elementName: string, description: string, propertiesMap?: KeyValDef ) => void | Function to create a node. Data update logic needs to be implemented based on the provided parameters. See below for the required data model behind the KeyValDef interface | - | false
editNode | ( id: string, elementName: string, description: string, propertiesMap?: KeyValDef, parentNodeId?: string ) => void | Function to edit a node. Data update logic needs to be implemented based on the provided parameters. See below for the required data model behind the KeyValDef interface. | false | false
deleteNode | ( id: string, elementName: string, parentNodeId?: string ) => void | Function to delete a node. Data update logic needs to be implemented based on the provided parameters | - | false
displayEmptyValsError | ( emptyVals: string[] ) => void | Function to display errors from create/edit node form | - | false
selectCallback | ( node: TreeNodeModel ) => void | Callback function when the user selects a node | - | false
defaultSelectedNodeId | string | Default selected node ID. It will be auto selected/opened on first render | - | false
locale | string | Locale to be used fo the tree | - | true

### Exemple
```JSX
<Tree id="treeComponentExemple" data={data} locale='en-US' />
```