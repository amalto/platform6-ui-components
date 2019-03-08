// Modules
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as classNames from 'classnames'

// Utils
import { compileWordings, isNotEmpty, downloadDataFile, base64Decode } from '@amalto/helpers'

// Wordings
import { MULTILANGUAGE_WORDINGS } from '@amalto/wordings'

// Components
import KeyValueEditor from '@amalto/key-value-editor'

// Models
import { TreeNodeModel, OrgModel } from './models/tree'

declare type KeyValDef = KeyValueEditor.KeyValDef

/**
 * Organize custom tree allowing you to manage nodes and attached data to it.
 * Attached data can be either texts or files.
 * 
 * Tree uses [KeyValDef](#keyvaldev) interface and PdfViewer uses [WebStorage](#webstorage)'s properties
 * which are accessible at the root component of your service.
 */
module Tree {
    export interface Props extends React.Props<Tree> {
        /** Any unique DOM ID. */
        id: string;
        /** Data to render as a tree. More details on [TreeNodeModel](#treenodemodel). */
        data: TreeNodeModel;
        /**
         * Function to create a node.
         * Data update logic needs to be implemented based on the provided parameters.
         * See below for the required data model behind the <span className='quote'>KeyValDef</span> interface.
         * More details on [KeyValDef](#keyvaldef).
         */
        createNode?: ( parentId: string, elementName: string, description: string, propertiesMap?: KeyValDef ) => void;
        /** Manage node edition. */
        editNode?: ( id: string, elementName: string, description: string, propertiesMap?: KeyValDef, parentNodeId?: string ) => void;
        /** Manage node deletion. */
        deleteNode?: ( id: string, elementName: string, parentNodeId?: string ) => void;
        /** Manage errors display. */
        displayEmptyValsError?: ( emptyVals: string[] ) => void;
        /** Manage node selection. */
        selectCallback?: ( node: TreeNodeModel ) => void;
        /** Set default selected node. */
        defaultSelectedNodeId?: string;
        /**
         * Language to use on the component. e.g: <span className='quote'>en-US</span>.
         * Locales available at [Locale](#locale).
         * Accessible via [WebStorage](#webstorage).
         */
        locale: string;

        /** Hide props from documentation */

        /** @ignore */
        children?: React.ReactNode;
        /** @ignore */
        key?: React.ReactText;
        /** @ignore */
        ref?: React.Ref<Tree>;
    }

    export interface State {
        treeInstance?: JSTree;
        selectedNode?: TreeNodeModel;
        formOpened?: string;
        editedNode?: OrgModel;
        maxTreeHeight?: number;
        wordings?: { [key: string]: string; };
    }
}

class Tree extends React.Component<Tree.Props, Tree.State> {

    private _tree: HTMLDivElement = null

    constructor( props: Tree.Props ) {
        super( props )
        this.state = {
            treeInstance: null,
            selectedNode: null,
            formOpened: null,
            editedNode: null,
            maxTreeHeight: 0,
            wordings: compileWordings( MULTILANGUAGE_WORDINGS, props.locale )
        }
    }

    render() {

        const { wordings } = this.state

        let disabled = !this.state.selectedNode

        let editButton = this.state.formOpened === 'EDIT' ? (
            <button type="button" className="btn btn-block btn-warning" onClick={this.editNode}>{wordings.treeUpdate}</button>
        ) : null

        let createButton = this.state.formOpened === 'CREATE' ? (
            <button type="button" className="btn btn-block btn-success" onClick={this.createNode}>{wordings.validate}</button>
        ) : null

        let canModifyTree = this.props.createNode && this.props.editNode && this.props.deleteNode && this.props.displayEmptyValsError

        let cannotModifyNodeName = ( this.state.formOpened !== 'CREATE' && this.state.selectedNode
            && ( this.state.selectedNode.data.parentId === '0' || this.state.selectedNode.data.parentId === null ) )

        // Disable name input if can't edit it here
        let nodeForm = this.state.formOpened && canModifyTree ? (
            <div className="toggle-form bottom-margin">
                <div className="row">

                    <div className="form-group col-xs-12 col-sm-6 col-md-4 col-lg-3">
                        <label>{wordings.name}</label>
                        <input type="text" className="form-control"
                            value={this.state.editedNode.elementName}
                            onChange={this.handleElementNameChange}
                            disabled={cannotModifyNodeName}
                        />
                    </div>

                    <div className="form-group col-xs-12 col-sm-6 col-md-4 col-lg-3">
                        <label>{wordings.description}</label>
                        <input type="text" className="form-control"
                            value={this.state.editedNode.description}
                            onChange={this.handleDescriptionChange}
                        />
                    </div>

                    <div className="form-group col-xs-12 col-sm-6 col-md-4 col-lg-6">
                        <label>{wordings.additionalProperties}</label>
                        <KeyValueEditor handleChange={this.handlePropertiesChange} keyValues={this.state.editedNode.propertiesMap} locale={this.props.locale} />
                    </div>

                    <div className="col-xs-12">
                        <div className="row">
                            <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3">
                                <div className="top-margin">
                                    {editButton}
                                    {createButton}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        ) : null

        let editor = (
            <div>
                <div className="row text-xs-center">
                    <div className="col-xs-12">
                        <button type="button" disabled={disabled} className={classNames( 'btn btn-trans btn-primary right-margin bottom-margin' )} onClick={this.expandAll}>
                            <span>{wordings.expand}</span>
                        </button>
                        <button type="button" disabled={disabled} className={classNames( 'btn btn-trans btn-primary right-margin bottom-margin' )} onClick={this.collapseAll}>
                            <span>{wordings.collapse}</span>
                        </button>
                        {
                            canModifyTree ? (
                                <span>
                                    <button type="button" disabled={disabled} className={classNames( 'btn btn-trans btn-success right-margin bottom-margin' )} onClick={this.openCreateForm}>
                                        {wordings.createChild}
                                    </button>
                                    <button type="button" disabled={disabled} className={classNames( 'btn btn-trans btn-warning right-margin bottom-margin' )} onClick={this.openEditForm}>
                                        {wordings.edit}
                                    </button>
                                    <button type="button" disabled={disabled} className={classNames( 'btn btn-trans btn-danger right-margin bottom-margin' )} onClick={this.deleteNode}>
                                        {wordings.delete}
                                    </button>
                                    <button type="button" disabled={disabled} className={classNames( 'btn btn-trans btn-font right-margin bottom-margin', {
                                        'hidden': !this.state.formOpened
                                    } )} onClick={this.clearForm}>
                                        {wordings.cancel}
                                    </button>
                                </span>
                            ) : null
                        }
                    </div>
                </div>

                {nodeForm}
            </div>
        )

        const node = this.state.selectedNode

        const selectedNodeProperties = node && node.data && node.data.propertiesMap && !$.isEmptyObject( node.data.propertiesMap ) ?
            Object.keys( node.data.propertiesMap ).map( key => {
                const nodeData = node.data as OrgModel

                const dataDisplay = nodeData.propertiesMap[key].contentType === 'text/plain' ? (
                    <span className="inline-middle">{base64Decode( nodeData.propertiesMap[key].contentBytes )}</span>
                ) : (
                        <button type="button" className="inline-middle btn btn-xs btn-trans btn-info" data-key={key} onClick={this.downloadFile}>
                            <span className="fas fa-download" />
                        </button>
                    )

                return (
                    <li key={key}>
                        <em className="right-spaced inline-middle">{nodeData.propertiesMap[key].key}</em>
                        <span className="fas fa-long-arrow-alt-right right-spaced inline-middle" />
                        {dataDisplay}
                    </li>
                )
            } ) : null

        const selectedDetails = node ? (
            <div className="top-margin toggle-form">

                <div className="row">

                    <div className="col-xs-12">
                        <h4 className="upper bottom-spaced">{wordings.selectedNodeDetails}</h4>
                    </div>

                    <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3">
                        <div className="text-small font-color-lighter">{wordings.name}</div>
                        <div>{node.text}</div>
                    </div>

                    <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3">
                        <div className="text-small font-color-lighter">{wordings.id}</div>
                        <div className="word-wrap"><em>{node.id}</em></div>
                    </div>

                    <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3">
                        <div className="text-small font-color-lighter">{wordings.description}</div>
                        <div>{node.data.description}</div>
                    </div>

                    <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3">
                        <div className="text-small font-color-lighter">{wordings.properties}</div>
                        {selectedNodeProperties ? <ul className="basic-list margin-none">{selectedNodeProperties}</ul> : <span>-</span>}
                    </div>

                </div>

            </div>
        ) : null

        return (
            <div id={this.props.id} className="text-medium">

                <div className="tree-controls-container">
                    {editor}
                </div>

                <div style={{ maxHeight: this.state.maxTreeHeight || 'none', overflow: 'auto' }}>
                    <div ref={dom => this._tree = dom} id={this.props.id} />
                </div>

                <div className="tree-details-container">
                    {selectedDetails}
                    {this.props.children}
                </div>

            </div>
        )
    }

    componentDidMount() {
        const tree = this.setUpTree( this.props.id, this.props.data, this.props.defaultSelectedNodeId )
        this.setState( {
            treeInstance: tree
        } )
    }

    componentDidUpdate( prevProps: Tree.Props, prevState: Tree.State ) {

        if ( prevState.selectedNode !== this.state.selectedNode || prevProps.children !== this.props.children ) {

            // window height - tree action buttons container height - details container - header, paddings and nav tabs            
            let maxTreeHeight = window.innerHeight - $( '#' + this.props.id + ' .tree-controls-container' ).outerHeight() - $( '#' + this.props.id + ' .tree-details-container .toggle-form' ).outerHeight() - 212

            //if we have a user assign form, we reduce a bit more the tree height to fully display selected node details and user assign form (this.props.children)
            if ( this.props.children ) {
                maxTreeHeight -= 62
            }

            this.setState( {
                maxTreeHeight
            } )
        }

    }

    componentWillReceiveProps( nextProps: Tree.Props ) {
        if ( this.props.data !== nextProps.data ) {
            if ( this.state.treeInstance ) {
                this.state.treeInstance.destroy( false )
                this.setState( {
                    treeInstance: this.setUpTree( nextProps.id, nextProps.data, nextProps.defaultSelectedNodeId ),
                    selectedNode: null,
                    editedNode: null,
                    formOpened: null
                } )
            }
        }
    }

    componentWillUnmount() {
        if ( this.state.treeInstance ) {
            this.state.treeInstance.destroy()
        }
        let treeContainer = ReactDOM.findDOMNode( this._tree ) as HTMLElement
        $( treeContainer ).off()
    }

    private downloadFile = ( event: any ) => {
        if ( this.state.selectedNode ) {
            const keyValues: KeyValDef = this.state.selectedNode.data.propertiesMap
            const key: string = event.currentTarget.getAttribute( 'data-key' )
            downloadDataFile( keyValues[key].contentBytes, keyValues[key].contentType, keyValues[key].key )
        }
    }

    private expandAll = ( event: React.SyntheticEvent<any> ) => {
        if ( this.state.treeInstance ) {
            this.state.treeInstance.open_all( this.state.selectedNode, 100 )
        }
        if ( event ) {
            $( event.currentTarget ).blur()
        }
    }

    private collapseAll = ( event: React.SyntheticEvent<any> ) => {
        if ( this.state.treeInstance ) {
            this.state.treeInstance.close_all( this.state.selectedNode, 100 )
        }
        if ( event ) {
            $( event.currentTarget ).blur()
        }
    }

    private openCreateForm = () => {

        this.setState( {
            formOpened: 'CREATE',
            editedNode: {
                parentId: this.state.selectedNode.id,
                elementName: '',
                description: ''
            }
        } )
    }

    private createNode = () => {
        let { editedNode, wordings } = this.state

        let errors: string[] = []
        if ( !!this.state.selectedNode.data.childNames ) {

            if ( isNotEmpty( editedNode.elementName ) ) {
                if ( this.state.selectedNode.data.childNames.indexOf( editedNode.elementName ) !== -1 ) {
                    errors.push( wordings.invalidUniqueNodeName )
                }
            }
            else {
                errors.push( wordings.name )
            }

        }


        if ( !isNotEmpty( editedNode.description ) ) {
            errors.push( wordings.description )
        }

        for ( const key in editedNode.propertiesMap ) {
            if ( !key ) {
                errors.push( wordings.propertiesKey )
            }
        }

        if ( errors.length > 0 ) {
            this.props.displayEmptyValsError( errors )
        }
        else {
            this.props.createNode( editedNode.parentId, editedNode.elementName.trim(), editedNode.description, editedNode.propertiesMap )
            this.clearForm()
        }
    }

    private openEditForm = () => {
        const { selectedNode } = this.state

        this.setState( {
            formOpened: 'EDIT',
            editedNode: {
                id: selectedNode.id,
                parentId: selectedNode.data.parentId,
                elementName: selectedNode.text,
                description: selectedNode.data && selectedNode.data.description,
                propertiesMap: selectedNode.data && selectedNode.data.propertiesMap
            }
        } )
    }

    private editNode = () => {
        let { editedNode, wordings } = this.state

        let errors: string[] = []
        if ( !isNotEmpty( editedNode.elementName ) ) {
            errors.push( wordings.name )
        }
        if ( !isNotEmpty( editedNode.description ) ) {
            errors.push( wordings.description )
        }

        for ( const key in editedNode.propertiesMap ) {
            if ( !key ) {
                errors.push( wordings.propertiesKey )
            }
        }

        if ( errors.length > 0 ) {
            this.props.displayEmptyValsError( errors )
        }
        else {
            this.props.editNode( editedNode.id, editedNode.elementName.trim(), editedNode.description, editedNode.propertiesMap, editedNode.parentId )
            this.clearForm()
        }
    }

    private deleteNode = () => {
        this.props.deleteNode( this.state.selectedNode.id, this.state.selectedNode.text, this.state.selectedNode.data.parentId )
        this.clearForm()
    }

    private clearForm = () => {
        this.state.treeInstance.deselect_node( this.state.selectedNode )

        this.setState( {
            editedNode: null,
            formOpened: null,
            selectedNode: null
        } )
    }

    private handleElementNameChange = ( event: any ) => {
        let editedNodeUpdate: OrgModel = JSON.parse( JSON.stringify( this.state.editedNode ) )

        editedNodeUpdate.elementName = event.target.value

        this.setState( {
            editedNode: editedNodeUpdate
        } )
    }

    private handleDescriptionChange = ( event: any ) => {
        let editedNodeUpdate: OrgModel = JSON.parse( JSON.stringify( this.state.editedNode ) )

        editedNodeUpdate.description = event.target.value

        this.setState( {
            editedNode: editedNodeUpdate
        } )
    }

    private handlePropertiesChange = ( keyValues?: KeyValDef ) => {
        let editedNodeUpdate: OrgModel = JSON.parse( JSON.stringify( this.state.editedNode ) )

        editedNodeUpdate.propertiesMap = keyValues

        this.setState( {
            editedNode: editedNodeUpdate
        } )
    }

    // FIXME: When another solution is provided by typescript thant the double underscore, don't forget to make the changes
    // https://github.com/Microsoft/TypeScript/issues/9458
    private setUpTree = ( __id: string, data: TreeNodeModel, defaultSelectedNodeId?: string ): JSTree => {
        let treeContainer = ReactDOM.findDOMNode( this._tree ) as HTMLElement

        let tree = $.jstree.create( treeContainer, {
            core: {
                data: data,
                check_callback: function ( operation, /**  node, node_parent, node_position, more */ ) {
                    return operation !== 'move_node'
                },
                multiple: false,
                error: undefined
            },
            plugins: ['sort'],
            sort: function ( a: any, b: any ) {
                return this.get_node( a ).text.localeCompare( this.get_node( b ).text ) < 0 ? -1 : 1
            }
        } as JSTreeStaticDefaults )

        tree.hide_dots()

        // FIXME: When another solution is provided by typescript thant the double underscore, don't forget to make the changes
        // https://github.com/Microsoft/TypeScript/issues/9458
        $( treeContainer ).on( 'select_node.jstree', ( __event, selected ) => {
            this.setState( {
                selectedNode: this.getDecodedNode( selected.node ),
                editedNode: null,
                formOpened: null
            } )
            if ( this.props.selectCallback ) {
                this.props.selectCallback( selected.node )
            }
        } )

        $( treeContainer ).on( 'deselect_node.jstree', ( /** event, selected */ ) => {
            this.setState( {
                selectedNode: null,
                editedNode: null,
                formOpened: null
            } )
            if ( this.props.selectCallback ) {
                this.props.selectCallback( null )
            }
        } )

        if ( defaultSelectedNodeId ) {
            setTimeout( () => {
                tree._open_to( defaultSelectedNodeId )
                tree.select_node( defaultSelectedNodeId )
            }, 500 )
        }

        return tree
    }

    private getDecodedNode = ( node: TreeNodeModel ): TreeNodeModel => {

        let convertedNode = JSON.parse( JSON.stringify( node ) ) as TreeNodeModel

        if ( convertedNode.data && convertedNode.data.propertiesMap && !$.isEmptyObject( convertedNode.data.propertiesMap ) ) {
            let nodeKeyValues = JSON.parse( JSON.stringify( convertedNode.data.propertiesMap ) ) as KeyValDef

            for ( const key in nodeKeyValues ) {
                if ( nodeKeyValues[key].contentType === 'text/plain' ) {
                    const decodedContentBytes: string = base64Decode( nodeKeyValues[key].contentBytes )
                    console.info( 'getDecodedNode::contentBytes => ', nodeKeyValues[key].contentBytes )
                    console.info( 'getDecodedNode::decodedContentBytes => ', decodedContentBytes )
                    console.info( 'getDecodedNode::base64Decode => ', base64Decode( decodedContentBytes ) )
                    nodeKeyValues[key].contentBytes = base64Decode( nodeKeyValues[key].contentBytes )
                }
            }

            convertedNode.data.propertiesMap = nodeKeyValues
        }

        return convertedNode

    }

}

export default Tree
