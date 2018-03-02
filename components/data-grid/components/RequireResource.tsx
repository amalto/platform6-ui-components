// Modules
import * as React from 'react'

// Utils
import { hasRequiredResource } from '@amalto/helpers'

// Models
import { Endpoints } from '../models/AppEndpointsModel'

module RequireResource {

    export interface Props extends React.Props<RequireResource> {
        appEndpoints: Endpoints;
        selectedAppInstanceName: string;
        featureId: string;
    }

}

class RequireResource extends React.Component<RequireResource.Props, any> {
    constructor( props: RequireResource.Props ) {
        super( props )
    }

    render() {
        return hasRequiredResource( this.props.appEndpoints, this.props.selectedAppInstanceName, this.props.featureId ) ? this.props.children as React.ReactElement<any> : null
    }

}

export { RequireResource }
