```javascript
const data = require('./data.json');
const uuid = require('uuid');
const base64 = require('base-64');

initialState = { data, errors: [], defaultSelectedNodeId: 'b1' };

/** Add node only if there is no duplicate */
function addNodeNoDup( currentNode, newNode ) {
    let children = JSON.parse( JSON.stringify( currentNode.children ) );

    if ( currentNode.id === newNode.data.parentId ) {
        const nowNodeExist = children.some( child => child.id === newNode.id || child.text === newNode.text )

        if ( !nowNodeExist ) {
            children.push( newNode );
            currentNode.children = children;
        }
        currentNode.state = {
            opened: true,
            selected: false
        };
        return currentNode;
    } else {
        for ( idx in children ) {
            children[idx] = addNodeNoDup( children[idx], newNode );
        }
        currentNode.children = children;
        return currentNode;
    }
}

function createNode( parentId, elementName, description, propertiesMap ) {
    const data = JSON.parse( JSON.stringify( state.data ) );
    const encodedProppertiesMap = propertiesMap && JSON.parse( JSON.stringify( propertiesMap ) ) || {};

    Object.keys( encodedProppertiesMap ).forEach( key => {
        encodedProppertiesMap[key].contentBytes = base64.encode(encodedProppertiesMap[key].contentBytes)
    })
    const newNode = {
        id: uuid.v4(),
        text: elementName,
        icon: 'fa fa-fw fa-cube font-color-lighter',
        data: {
            parentId,
            description,
            propertiesMap: encodedProppertiesMap
        },
        state: {
            selected: true
        }
    };

    setState({ data: addNodeNoDup( data, newNode ), defaultSelectedNodeId: newNode.id });
}

/** Recursively go throught all the tree and update the node */
function updateNode( currentNode, nodeToEdit ) {
    if ( currentNode.id === nodeToEdit.id) {
        nodeToEdit = $.extend({}, currentNode, {
            text: nodeToEdit.text,
            data: nodeToEdit.data,
            propertiesMap: nodeToEdit.propertiesMap
        } );
        currentNode = JSON.parse( JSON.stringify( nodeToEdit ) );
    } else {
        let children = JSON.parse( JSON.stringify( currentNode.children ) );

        for ( idx in children ) {
            children[idx] = updateNode( children[idx], nodeToEdit );
        }
        currentNode.children = children;
    }
    return currentNode;
}

function editNode( id, elementName, description, propertiesMap, parentNodeId ) {
    const data = JSON.parse( JSON.stringify( state.data ) );
    const encodedProppertiesMap = JSON.parse( JSON.stringify( propertiesMap ) );

    Object.keys( encodedProppertiesMap ).forEach( key => {
        encodedProppertiesMap[key].contentBytes = base64.encode(encodedProppertiesMap[key].contentBytes)
    })

    const nodeToEdit = {
        id,
        text: elementName,
        data: {
            parentId: parentNodeId,
            description,
            propertiesMap: encodedProppertiesMap
        }
    };

    setState({ data: updateNode( data, nodeToEdit ) });
}

function removeNode( currentNode, id, elementName, parentNodeId ) {
    if ( currentNode.id === id ) {

        /**
         * In this exemple we won't allow you to remove the root node.
         * Instead we will remove all his children.
         */
        return !currentNode.data.parentId ? $.extend({}, currentNode, { children: []}) : null;
    } else {
        let children = currentNode.children && JSON.parse( JSON.stringify( currentNode.children ) ) || [];

        for ( idx in children ) {
            children[idx] = removeNode( children[idx], id, elementName, parentNodeId );
        }
        currentNode.children = children.filter( child => child !== null );
    }
    return currentNode;
}

function deleteNode( id, elementName, parentNodeId ) {
    const data = JSON.parse( JSON.stringify( state.data ) );

    setState({ data: removeNode( data, id, elementName, parentNodeId ) })
}

/** Keep errors into state to be able to handle them */
function displayEmptyValsError( errors ) {
    setState({ errors });
}

function selectCallback( node ) {
    node && setState({ defaultSelectedNodeId: node.id })
}

<Tree id='tree-exemple'
    data={state.data}
    createNode={createNode}
    editNode={editNode}
    deleteNode={deleteNode}
    displayEmptyValsError={displayEmptyValsError}
    selectCallback={selectCallback}
    defaultSelectedNodeId={state.defaultSelectedNodeId}
    locale='en-US'
/>
```