Data displayed after selecting a node on the [Tree](http://localhost:6060/#typescript-7) component.

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