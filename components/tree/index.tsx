// Modules
import * as React from 'react'

// Utils
import { getWordings, isNotEmpty, downloadDataFile, base64Decode } from '@amalto/helpers'

// Models
import { TreeNodeModel, KeyValDef } from './models/tree'

// Components
import NodeForm from './components/NodeForm'
import Editor from './components/Editor'
import NodeProperty from './components/NodeProperty'
import SelectedDetails from './components/SelectedDetails'

/**
 * Organize custom tree allowing you to manage nodes and attached data to it.
 * Attached data can be either texts or files.
 * 
 * Tree uses [KeyValDef](#keyvaldev) interface and PdfViewer uses [WebStorage](#webstorage)'s properties
 * which are accessible at the root component of your service.
 */
module Tree {
    export interface Props {
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
        children?: React.ReactNode;
    }
}

function Tree( props: Tree.Props ) {

    /** References */
    const _tree: React.MutableRefObject<HTMLDivElement> = React.useRef( null )

    /** Initialize state */
    const [disabled, setDisabled] = React.useState( false )
    const [treeInstance, setTreeInstance] = React.useState( null )
    const [selectedNode, setSelectedNode] = React.useState( null )
    const [formOpened, setFormOpened] = React.useState( null )
    const [editedNode, setEditedNode] = React.useState( null )
    const [maxTreeHeight, setMaxTreeHeight] = React.useState( 0 )
    const [wordings, setWordings] = React.useState( getWordings( {}, props.locale ) )

    /**
     * Lifecycle
     */

    /** Component did mount */
    React.useEffect( () => {
        setTreeInstance( setUpTree( props.id, props.data, props.defaultSelectedNodeId ) )

        return () => {
            if ( treeInstance ) { treeInstance.destroy() }
            $( _tree.current ).off()
        }
    }, [] )

    // Component will mount
    React.useEffect( () => {

        if ( treeInstance ) {
            treeInstance.destroy( false )
            setTreeInstance( setUpTree( props.id, props.data, props.defaultSelectedNodeId ) )
            setSelectedNode( null )
            setEditedNode( null )
            setFormOpened( null )
        }

    }, [props.data] )

    /** Set wordings */
    React.useEffect( () => { setWordings( getWordings( {}, props.locale ) ) }, [props.locale] )

    /** Disabled */
    React.useEffect( () => { setDisabled( !selectedNode ) }, [selectedNode] )

    /** Component did update */
    React.useEffect( () => {
        // window height - tree action buttons container height - details container - header, paddings and nav tabs            
        let maxTreeHeight = window.innerHeight - $( '#' + props.id + ' .tree-controls-container' ).outerHeight() - $( '#' + props.id + ' .tree-details-container .toggle-form' ).outerHeight() - 212

        //if we have a user assign form, we reduce a bit more the tree height to fully display selected node details and user assign form (props.children)
        if ( props.children ) {
            maxTreeHeight -= 62
        }

        setMaxTreeHeight( maxTreeHeight )
    }, [selectedNode, props.children] )

    /**
     * Tree update
     */

    /** Edit node informations */
    const editNode = () => {
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
            props.displayEmptyValsError( errors )
        }
        else {
            props.editNode( editedNode.id, editedNode.elementName.trim(), editedNode.description, editedNode.propertiesMap, editedNode.parentId )
            clearForm()
        }
    }

    /** Clear node edition form */
    const clearForm = () => {
        treeInstance.deselect_node( selectedNode )

        setEditedNode( null )
        setFormOpened( null )
        setSelectedNode( null )
    }

    // FIXME: When another solution is provided by typescript thant the double underscore, don't forget to make the changes
    // https://github.com/Microsoft/TypeScript/issues/9458
    const setUpTree = ( __id: string, data: TreeNodeModel, defaultSelectedNodeId?: string ): JSTree => {

        const tree = $.jstree.create( _tree.current, {
            core: {
                data,
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
        $( _tree.current ).on( 'select_node.jstree', ( __event, selected ) => {

            setSelectedNode( getDecodedNode( selected.node ) )
            setEditedNode( null )
            setFormOpened( null )

            if ( props.selectCallback ) {
                props.selectCallback( selected.node )
            }
        } )

        $( _tree.current ).on( 'deselect_node.jstree', ( /** event, selected */ ) => {

            setSelectedNode( null )
            setEditedNode( null )
            setFormOpened( null )

            if ( props.selectCallback ) {
                props.selectCallback( null )
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

    /**
     * Handlers
     */

    /** Create a new node */
    const createNode = () => {
        let errors: string[] = []
        if ( !!selectedNode.data.childNames ) {

            if ( isNotEmpty( editedNode.elementName ) ) {
                if ( selectedNode.data.childNames.indexOf( editedNode.elementName ) !== -1 ) {
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
            props.displayEmptyValsError( errors )
        }
        else {
            props.createNode( editedNode.parentId, editedNode.elementName.trim(), editedNode.description, editedNode.propertiesMap )
            treeInstance.redraw( true )
            clearForm()
        }
    }

    /**
     * Expand tree node view to display details
     * @param {React.SyntheticEvent<HTMLButtonElement, Event>} event 
     */
    const expandAll = ( event: React.SyntheticEvent<HTMLButtonElement, Event> ) => {
        if ( treeInstance ) { treeInstance.open_all( selectedNode, 100 ) }
        if ( event ) { $( event.currentTarget ).blur() }
    }

    /**
     * Close expanded node's view
     * @param {React.SyntheticEvent<HTMLButtonElement, Event>} event 
     */
    const collapseAll = ( event: React.SyntheticEvent<HTMLButtonElement, Event> ) => {
        if ( treeInstance ) { treeInstance.close_all( selectedNode, 100 ) }
        if ( event ) { $( event.currentTarget ).blur() }
    }

    /**
     * Download attached files from a node
     * @param {React.MouseEvent<HTMLButtonElement, MouseEvent>} event 
     */
    const downloadFile = ( event: React.MouseEvent<HTMLButtonElement, MouseEvent> ) => {
        if ( selectedNode ) {
            const keyValues: KeyValDef = selectedNode.data.propertiesMap
            const key: string = event.currentTarget.getAttribute( 'data-key' )
            downloadDataFile( keyValues[key].contentBytes, keyValues[key].contentType, keyValues[key].key )
        }
    }

    /**
     * Open creation form
     */
    const openCreateForm = () => {
        setFormOpened( 'CREATE' )
        setEditedNode( {
            parentId: selectedNode.id,
            elementName: '',
            description: ''
        } )
    }

    /** Open node edit form */
    const openEditForm = () => {
        setFormOpened( 'EDIT' )
        setEditedNode( {
            id: selectedNode.id,
            parentId: selectedNode.data.parentId,
            elementName: selectedNode.text,
            description: selectedNode.data && selectedNode.data.description,
            propertiesMap: selectedNode.data && selectedNode.data.propertiesMap
        } )
    }

    /** Delete node */
    const deleteNode = () => {
        props.deleteNode( selectedNode.id, selectedNode.text, selectedNode.data.parentId )
        clearForm()
    }


    /**
     * Return decoded node
     * @param {TreeNodeModel} node 
     */
    const getDecodedNode = ( node: TreeNodeModel ): TreeNodeModel => {

        let convertedNode = JSON.parse( JSON.stringify( node ) ) as TreeNodeModel

        if ( convertedNode.data && convertedNode.data.propertiesMap && !$.isEmptyObject( convertedNode.data.propertiesMap ) ) {
            let nodeKeyValues = JSON.parse( JSON.stringify( convertedNode.data.propertiesMap ) ) as KeyValDef

            for ( const key in nodeKeyValues ) {
                if ( nodeKeyValues[key].contentType === 'text/plain' ) {
                    nodeKeyValues[key].contentBytes = base64Decode( nodeKeyValues[key].contentBytes )
                }
            }

            convertedNode.data.propertiesMap = nodeKeyValues
        }

        return convertedNode

    }

    /**
     * Start rendering component here
     */

    let canModifyTree = props.createNode && props.editNode && props.deleteNode && props.displayEmptyValsError

    let cannotModifyNodeName = ( formOpened !== 'CREATE' && selectedNode
        && ( selectedNode.data.parentId === '0' || selectedNode.data.parentId === null ) )

    /** Disable name input if can't edit it here */
    let nodeForm = formOpened && canModifyTree ? (
        <NodeForm cannotModifyNodeName={cannotModifyNodeName}
            editedNode={editedNode} formOpened={formOpened}
            setEditedNode={setEditedNode} editNode={editNode} createNode={createNode}
            wordings={wordings} locale={props.locale}
        />
    ) : null

    /** Node editor form */
    let editor = (
        <Editor formOpened={formOpened} canModifyTree={canModifyTree} disabled={disabled}
            expandAll={expandAll} collapseAll={collapseAll}
            openCreateForm={openCreateForm} openEditForm={openEditForm} deleteNode={deleteNode} clearForm={clearForm}
            wordings={wordings}>
            {nodeForm}
        </Editor>
    )

    const node = selectedNode

    /** Node properties */
    const selectedNodeProperties = node && node.data && node.data.propertiesMap && !$.isEmptyObject( node.data.propertiesMap ) ?
        Object.keys( node.data.propertiesMap ).map( key => (
            <NodeProperty nodeData={node.data} nodeKey={key} downloadFile={downloadFile} />
        ) ) : null

    const selectedDetails = node ? (
        <SelectedDetails node={node} selectedNodeProperties={selectedNodeProperties} wordings={wordings} />
    ) : null

    return (
        <div id={props.id} className="text-medium">

            <div className="tree-controls-container">
                {editor}
            </div>

            <div style={{ maxHeight: maxTreeHeight || 'none', overflow: 'auto' }}>
                <div ref={_tree} id={props.id} />
            </div>

            <div className="tree-details-container">
                {selectedDetails}
                {props.children}
            </div>

        </div>
    )

}

export default Tree
