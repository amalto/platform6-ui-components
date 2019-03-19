// Modules
import * as React from 'react'

// Models
import { PermissionDef, ScopesTree, WebStorage } from '@amalto/typings'

// Utils
import { hasAnyPermission, hasAccessToFeature, canPerformAnyAction } from '@amalto/scope-helpers'

/**
 * Display or hide component depending of user access.
 */
module Restricted {

    export interface Props {
        /** Storage which contain instance and user informations. */
        webStorage: WebStorage;
        /** Actions which allow you to display children. */
        authorizedActions?: string[];
        /** Actions you want to use. */
        requiredActions?: string[];
        /** Feature you want to access. */
        featureId?: string;
        /** Permissions needed to display children. More details on [PermissionDef](#permissiondef). */
        permissions?: string[] | PermissionDef[];
        /**
         * Permission need to be in <span className='quote'>*</span> instance.
         * @default false
         */
        needsGlobalPermission?: boolean;
        children: React.ReactNode;
    }

}

function Restricted( props: Restricted.Props ) {
    const { webStorage, authorizedActions, requiredActions, permissions, featureId, needsGlobalPermission, children } = props

    const appInstance: string = webStorage && webStorage.selectedAppInstance && webStorage.selectedAppInstance.name
    const scopesTree: ScopesTree = webStorage && webStorage.scopesTree

    if ( appInstance && scopesTree ) {

        //if actions are specified they will be first used for the display of the children components
        if ( authorizedActions && requiredActions ) {
            if ( canPerformAnyAction( requiredActions, authorizedActions ) ) {
                return children as React.ReactElement<any>
            }
        }

        //WARNING - if both featureId AND permissions are specified in props, only permissions will be used for the display of the children components

        else if ( permissions && permissions.length ) {
            if ( hasAnyPermission( webStorage, permissions, needsGlobalPermission ) ) {
                return children as React.ReactElement<any>
            }
        }
        else if ( featureId ) {
            if ( hasAccessToFeature( webStorage, appInstance, featureId, needsGlobalPermission ) ) {
                return children as React.ReactElement<any>
            }
        }

    }

    return null
}

export default Restricted
