import * as React from 'react'

// Models
import { TreeNodeModel } from '../models/tree'

module SelectedDetails {
    export interface Props {
        node: TreeNodeModel;
        selectedNodeProperties: JSX.Element[];
        wordings: { [ind: string]: string; };
    }
}

function SelectedDetails( props: SelectedDetails.Props ) {
    const { node, selectedNodeProperties, wordings } = props

    return (
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
    )
}

export default SelectedDetails