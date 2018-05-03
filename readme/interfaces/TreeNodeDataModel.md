Node object used by [TreeNodeModel](#treenodemodel) interface to display the [Tree](#tree)'s data.

```typescript
interface TreeNodeDataModel {
    
    /** Node's description */
    description?: string;
    
    /**
     * Properties attached to the node.
     * Can be text or file. If it's a file, can be downloaded.
     */
    propertiesMap?: KeyValDef;
    
    /** TreeNodeModel node id. */
    parentId?: string;
    
    /** Nested nodes names. */
    childNames?: string[];
}
```