
// Models
import { ScopeValue, PermissionDef, WebStorage } from '@amalto/typings'

// Constants
const ASTERISK = '*'

/**
 * User got permission.
 * e.g: reports=view
 */
export function hasPermission( webStorage: WebStorage, permission: string, global?: boolean ): boolean {
    return hasAnyPermission( webStorage, [permission], global )
}

/**
 * User got all permissions.
 * e.g: ['reports=view', 'reports=read']
 */
export function hasAnyPermission( webStorage: WebStorage, permissions: string[] | PermissionDef[], global?: boolean ) {

    const appInstance = webStorage.selectedAppInstance && webStorage.selectedAppInstance.name

    if ( !permissions || !permissions.length || !appInstance ) {
        return false
    }

    for ( let i = 0; i < permissions.length; i++ ) {
        if ( typeof permissions[i] === 'object' ) {

            //if the permission is required globally, the check will be only on the * instance
            const appInstanceValues = getScopeValues( webStorage, global ? ASTERISK : appInstance, ( permissions[i] as PermissionDef ).feature, ( permissions[i] as PermissionDef ).action )

            if ( appInstanceValues ) {

                if ( $.isEmptyObject( appInstanceValues ) ) {
                    return true
                }

                if ( ( appInstanceValues as string[] ).length ) {
                    if ( ( appInstanceValues as string[] ).indexOf(( permissions[i] as PermissionDef ).requiredValue ) !== -1 ) {
                        return true
                    }
                }

            }

            //check values on * instance            
            if ( global ) {

                const asteriskValues = getScopeValues( webStorage, ASTERISK, ( permissions[i] as PermissionDef ).feature, ( permissions[i] as PermissionDef ).action )

                if ( asteriskValues ) {
                    if ( $.isEmptyObject( asteriskValues ) ) {
                        return true
                    }

                    if ( ( asteriskValues as string[] ).length ) {
                        if ( ( asteriskValues as string[] ).indexOf(( permissions[i] as PermissionDef ).requiredValue ) !== -1 ) {
                            return true
                        }
                    }
                }

            }

        }
        else if ( typeof permissions[i] === 'string' ) {

            const parsedScopeString = ( permissions[i] as string ).split( '=' )

            if ( parsedScopeString.length === 2 ) {
                if ( hasPermissionFor( webStorage, global ? ASTERISK : appInstance, parsedScopeString[0], parsedScopeString[1] ) ) {
                    return true
                }
            }
            else {
                console.log( 'Error - bad scope string value:', permissions[i] )
            }

        }
    }

    return false

}

/**
 * Check if user has permission for a permission within a specific instance
 * e.g: Does user has the permission reports=read on instance master,
 *      where 'reports' is the feature and 'read' the action.
 */
export function hasPermissionFor( webStorage: WebStorage, appInstance: string, feature: string, action: string ): boolean {

    return (
        hasAccessToAction( webStorage, appInstance, feature, action ) ||
        hasAccessToAction( webStorage,  appInstance, feature, ASTERISK ) ||
        hasAccessToAction( webStorage, appInstance, ASTERISK, ASTERISK ) ||
        hasAccessToAction( webStorage, ASTERISK, feature, action ) ||
        hasAccessToAction( webStorage, ASTERISK, feature, ASTERISK ) ||
        hasAccessToAction( webStorage, ASTERISK, ASTERISK, ASTERISK )
    )

}

/**
 * Get item values from permission.
 * e.g: reports=read('Test'), will return ['Test'].
 */
export function getScopeValues( webStorage: WebStorage, appInstance: string, feature: string, action: string ): ScopeValue | string[] {

    const scopesTree = webStorage.scopesTree

    return scopesTree && scopesTree[appInstance] && scopesTree[appInstance][feature] && scopesTree[appInstance][feature][action]

}

/**
 * User has access to feature id.
 * e.g: reports=read, here 'reports' is the feature id.
 */
export function hasAccessToFeature( webStorage: WebStorage, appInstance: string, feature: string, global?: boolean ): boolean {

    const scopesTree = webStorage.scopesTree

    if ( !scopesTree || !appInstance || !feature ) {
        return false
    }

    const featuresMap = scopesTree[global ? ASTERISK : appInstance]

    for ( let _feature in featuresMap ) {
        if ( _feature === feature || _feature === ASTERISK ) {
            return true
        }
    }

    //if we don't find an access to the feature on the specific instance, we can check on the * one
    if ( !global ) {
        return hasAccessToFeature( webStorage, appInstance, feature, true )
    }

    return false

}

/**
 * User has access to feature action.
 * e.g: reports=read, here 'read' is the action.
 */
function hasAccessToAction( webStorage: WebStorage, appInstance: any, feature: string, action: string ) {

    if ( !appInstance || !feature || !action ) {
        return false
    }

    if ( hasAccessToFeature( webStorage, appInstance, feature ) ) {
        return getScopeValues( webStorage, appInstance, feature, action ) !== undefined
    }
    else {
        return false
    }

}

/**
 * Action has filter on it.
 */
export function hasFilterOn( webStorage: WebStorage, feature: string, viewFilter: string, filterKey: string ): boolean {

    const appInstance = webStorage.selectedAppInstance && webStorage.selectedAppInstance.name

    //filter by key value are made via the keyword 'allow'

    const appInstanceValues = appInstance ? getScopeValues( webStorage, appInstance, feature, 'allow' ) as ScopeValue : undefined
    const asteriskValues = getScopeValues( webStorage, ASTERISK, feature, 'allow' ) as ScopeValue

    if ( appInstanceValues && appInstanceValues[viewFilter] ) {
        if ( appInstanceValues[viewFilter].filter( scopeFilter => scopeFilter.searchable === filterKey ).length > 0 ) {
            return true
        }
    }

    if ( asteriskValues && asteriskValues[viewFilter] ) {
        if ( asteriskValues[viewFilter].filter( scopeFilter => scopeFilter.searchable === filterKey ).length > 0 ) {
            return true
        }
    }

    return false

}

/**
 * True if only one requiredActions is contain within the authorizedActions.
 */
export function canPerformAnyAction( requiredActions: string[], authorizedActions: string[] ): boolean {

    if ( !requiredActions || !requiredActions.length || !authorizedActions ) {
        return false
    }

    //if AT LEAST ONE requiredActions is in the authorized ones it is OK

    for ( let i = 0; i < requiredActions.length; i++ ) {
        if ( authorizedActions.indexOf( requiredActions[i] ) !== -1 ) {
            return true
        }
    }

    return false
}