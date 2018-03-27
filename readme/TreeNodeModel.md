Object used to display the [Tree](http://localhost:6060/#!/Tree) component. It uses an [TreeNodeDataModel](http://localhost:6060/#!/TreeNodeDataModel) object to display a more details description of the tree's node when selected.

```typescript
interface TreeNodeModel {

    /** Unique node id. */
    id: string;

    /** Node's text display on the tree */
    text: string;

    /** Nested nodes. */
    children?: TreeNodeModel[];

    /** Node's icon. */
    icon?: string;

    /** Data of the node, displayed when selecting a node. */
    data?: TreeNodeDataModel;

    /** Node current state. */
    state?: {
        opened?: boolean;
        disabled?: boolean;
        selected?: boolean;
    }
}
```