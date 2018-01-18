Node object for the [Tree](http://localhost:6060/#typescript-7) component.

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