import * as React from 'react'

module TreeNodeDataModel {

    export interface Props extends React.ClassAttributes<TreeNodeDataModel> {
        /** Node's description */
        description?: string;
        /** Properties attached to the node. Can be text or file. If it's a file, can be downloaded. */
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

        /**
         * Hide props from documentation
         */
        /** @ignore */
        children: React.ReactNode;
        /** @ignore */
        key: React.ReactText;
        /** @ignore */
        ref: React.Ref<TreeNodeDataModel>;
    }
}

class TreeNodeDataModel extends React.Component<TreeNodeDataModel.Props, any> {
    constructor( props: TreeNodeDataModel.Props ) { super( props ); this.state = {} }
    render() { return <div></div> }
}

export default TreeNodeDataModel