import * as React from 'react'

// Utils
import { base64Decode } from '@amalto/helpers'

// Models
import { OrgModel } from '../models/tree'

module NodeProperty {
    export interface Props {
        nodeData: OrgModel;
        nodeKey: string;
        downloadFile: ( event: React.MouseEvent<HTMLButtonElement, MouseEvent> ) => void;
    }
}

function NodeProperty( props: NodeProperty.Props ) {
    const { nodeData, nodeKey, downloadFile } = props
    const dataDisplay = nodeData.propertiesMap[nodeKey].contentType === 'text/plain' ? (
        <span className="inline-middle">{base64Decode( nodeData.propertiesMap[nodeKey].contentBytes )}</span>
    ) : (
            <button type="button" className="inline-middle btn btn-xs btn-trans btn-info" data-key={nodeKey} onClick={downloadFile}>
                <span className="fas fa-download" />
            </button>
        )

    return (
        <li key={nodeKey}>
            <em className="right-spaced inline-middle">{nodeData.propertiesMap[nodeKey].key}</em>
            <span className="fas fa-long-arrow-alt-right right-spaced inline-middle" />
            {dataDisplay}
        </li>
    )
}

export default NodeProperty