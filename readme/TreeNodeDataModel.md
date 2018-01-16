```typescript
interface TreeNodeDataModel {
    
    /** Node's description */
    description?: string;
    
    /**
     * Properties attached to the node.
     * Can be text or file. If it's a file, can be downloaded.
     */
    propertiesMap?: {
        [key: string]: {
            contentType: string;
            contentBytes: string;
        };
    };
    
    /** TreeNodeModel node id. */
    parentId?: string;
    
    /** Nested nodes names. */
    childNames?: string[];
}
```