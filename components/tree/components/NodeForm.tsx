import * as React from 'react'

// Models
import { OrgModel, KeyValDef } from '../models/tree'

// Components
import KeyValueEditor from '@amalto/key-value-editor'

module NodeForm {
    export interface Props {
        cannotModifyNodeName: boolean;
        editedNode: OrgModel;
        formOpened: string;
        setEditedNode: ( node: OrgModel ) => void;
        editNode: () => void;
        createNode: () => void;
        wordings: { [id: string]: string; };
        locale: string;
    }
}

function NodeForm( props: NodeForm.Props ) {

    const { cannotModifyNodeName, editedNode, formOpened, setEditedNode, editNode, createNode, wordings, locale } = props

    /**
     * Update node name
     * @param {React.ChangeEvent<HTMLInputElement>} event
     */
    const handleElementNameChange = ( event: React.ChangeEvent<HTMLInputElement> ) => {
        let editedNodeUpdate: OrgModel = JSON.parse( JSON.stringify( editedNode ) )

        editedNodeUpdate.elementName = event.target.value

        setEditedNode( editedNodeUpdate )
    }

    /**
     * Update node description
     * @param {React.ChangeEvent<HTMLInputElement>} event
     */
    const handleDescriptionChange = ( event: any ) => {
        let editedNodeUpdate: OrgModel = JSON.parse( JSON.stringify( editedNode ) )

        editedNodeUpdate.description = event.target.value

        setEditedNode( editedNodeUpdate )
    }

    /**
     * Update node properties
     * @param {KeyValDef} [keyValues] 
     */
    const handlePropertiesChange = ( keyValues?: KeyValDef ) => {
        let editedNodeUpdate: OrgModel = JSON.parse( JSON.stringify( editedNode ) )

        editedNodeUpdate.propertiesMap = keyValues

        setEditedNode( editedNodeUpdate )
    }

    /** Buttons */

    const editButton = formOpened === 'EDIT' ? (
        <button type="button" className="btn btn-block btn-warning" onClick={editNode}>{wordings.treeUpdate}</button>
    ) : null

    let createButton = formOpened === 'CREATE' ? (
        <button type="button" className="btn btn-block btn-success" onClick={createNode}>{wordings.validate}</button>
    ) : null

    return (
        <div className="toggle-form bottom-margin">
            <div className="row">

                <div className="form-group col-xs-12 col-sm-6 col-md-4 col-lg-3">
                    <label>{wordings.name}</label>
                    <input type="text" className="form-control"
                        value={editedNode.elementName}
                        onChange={handleElementNameChange}
                        disabled={cannotModifyNodeName}
                    />
                </div>

                <div className="form-group col-xs-12 col-sm-6 col-md-4 col-lg-3">
                    <label>{wordings.description}</label>
                    <input type="text" className="form-control"
                        value={editedNode.description}
                        onChange={handleDescriptionChange}
                    />
                </div>

                <div className="form-group col-xs-12 col-sm-6 col-md-4 col-lg-6">
                    <label>{wordings.additionalProperties}</label>
                    <KeyValueEditor handleChange={handlePropertiesChange} keyValues={editedNode.propertiesMap} locale={locale} />
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
    )
}

export default NodeForm