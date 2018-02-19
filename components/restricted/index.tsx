import * as React from 'react'

import { PermissionDef, ScopesTree } from './models/Scopes'

import { hasPermission, hasAnyPermission, hasAccessToFeature, canPerformAnyAction } from '@amalto/scope-helpers'

/**
 * Display or hide component depending of user access.
 */
module Restricted {

    export interface Props extends React.Props<Restricted> {
        /** Instance you are connected to. */
        appInstance?: string;
        /** Tree containing all your permissions. More details on [ScopeTree](http://localhost:6060/#scopetree). */
        scopesTree?: ScopesTree;
        /** Actions which allow you to display children. */
        authorizedActions?: string[];
        /** Actions you want to use. */
        requiredActions?: string[];
        /** Feature you want to access. */
        featureId?: string;
        /** Permissions needed to display children. More details on [PermissionDef](http://localhost:6060/#permissiondef). */
        permissions?: string[] | PermissionDef[];
        /** Permission need to be in * instance. */
        needsGlobalPermission?: boolean;

        /** Hide props from documentation */

        /** @ignore */
        children?: React.ReactNode;
        /** @ignore */
        key?: React.ReactText;
        /** @ignore */
        ref?: React.Ref<Restricted>;
    }

}

class Restricted extends React.Component<Restricted.Props, any> {
    constructor( props: Restricted.Props ) {
        super( props )
    }

    render() {

        const { appInstance, scopesTree, authorizedActions, requiredActions, permissions, featureId, needsGlobalPermission, children } = this.props

        if ( appInstance && scopesTree ) {

            //if actions are specified they will be first used for the display of the children components
            if ( authorizedActions && requiredActions ) {
                if ( canPerformAnyAction( requiredActions, authorizedActions ) ) {
                    return children as React.ReactElement<any>
                }
            }

            //WARNING - if both featureId AND permissions are specified in props, only permissions will be used for the display of the children components

            else if ( permissions && permissions.length ) {
                if ( hasAnyPermission( appInstance, scopesTree, permissions, needsGlobalPermission ) ) {
                    return children as React.ReactElement<any>
                }
            }
            else if ( featureId ) {
                if ( hasAccessToFeature( appInstance, scopesTree, featureId, needsGlobalPermission ) ) {
                    return children as React.ReactElement<any>
                }
            }

        }

        return null

    }
}


export default Restricted
