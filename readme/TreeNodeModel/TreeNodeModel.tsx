import * as React from 'react'

module TreeNodeModel {

    export interface TreeNodeDataModel { }

    export interface Props extends React.ClassAttributes<TreeNodeModel> {
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
        state?: {
            opened?: boolean;
            disabled?: boolean;
            selected?: boolean;
        }

        /**
         * Hide props from documentation
         */

        /** @ignore */
        key: React.ReactText;
        /** @ignore */
        ref: React.Ref<TreeNodeModel>;
    }
}

class TreeNodeModel extends React.Component<TreeNodeModel.Props, any> {
    constructor( props: TreeNodeModel.Props ) { super( props ); this.state = {} }
    render() { return <div></div> }
}

export default TreeNodeModel