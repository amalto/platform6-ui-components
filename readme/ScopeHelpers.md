```jsx noeditor
const version = require('../components/scope-helpers/package.json').version;
const Pathline = require('../typescript/custom/Pathline').default;

<Pathline children={JSON.stringify( { name: '@amalto/scope-helpers', version } )} />
```

Methods checking user's permissions.

More informations on the interfaces [WebStorage](#webstorage), [PermissionDef](#permissiondef) and [ScopeValue](#scopevalue).

### Usage

```typescript
import * as helpers from '@amalto/scope-helpers'
```

```typescript
/**
 * User got permission.
 * e.g: reports=view
 * @param { WebStorage } webStorage - Data store in the browser storage.
 * @param { string } permission - Permission string.
 * @param { boolean } [global] - If true, will search permission on root instance.
 */
function hasPermission( webStorage: WebStorage, permission: string, global?: boolean ): boolean;

/**
 * User got all permissions.
 * e.g: ['reports=view', 'reports=read']
 * @param { WebStorage } webStorage - Data store in the browser storage.
 * @param { string } permissions - Permissions string or PermissionDef array.
 * @param { boolean } [global] - If true, will search permission on root instance.
 */
function hasAnyPermission( webStorage: WebStorage, permissions: string[] | PermissionDef[], global?: boolean ): void;

/**
 * Check if user has permission for a permission within a specific instance
 * e.g: Does user has the permission reports=read on instance master,
 *      where 'reports' is the feature and 'read' the action.
 *
 * @param { WebStorage } webStorage - Data store in the browser storage.
 * @param { string } appInstance - Instance name you are currently using.
 * @param { string } feature - Feature you want to check the permission on. e.g: reports.
 * @param { string } action - Action you want to perform. e.g: read.
 */
function hasPermissionFor( webStorage: WebStorage, appInstance: string, feature: string, action: string ): boolean;

/**
 * Get item values from permission.
 * e.g: reports=read('Test'), will return ['Test'].
 * @param { WebStorage } webStorage - Data store in the browser storage.
 * @param { string } appInstance - Instance name you are currently using.
 * @param { string } feature - Feature you want to check the permission on. e.g: reports.
 * @param { string } action - Action you want to perform. e.g: read.
 */
function getScopeValues( webStorage: WebStorage, appInstance: string, feature: string, action: string ): ScopeValue | string[];

/**
 * User has access to feature id.
 * e.g: reports=read, here 'reports' is the feature id.
 * @param { WebStorage } webStorage - Data store in the browser storage.
 * @param { string } appInstance - Instance name you are currently using.
 * @param { string } feature - Feature you want to check the permission on. e.g: reports.
 * @param { boolean } [global] - If true, will search permission on root instance.
 */
function hasAccessToFeature( webStorage: WebStorage, appInstance: string, feature: string, global?: boolean ): boolean;

/**
 * User has access to feature action.
 * e.g: reports=read, here 'read' is the action.
 * @param { WebStorage } webStorage - Data store in the browser storage.
 * @param { string } appInstance - Instance name you are currently using.
 * @param { string } feature - Feature you want to check the permission on. e.g: reports.
 * @param { string } action - Action you want to perform. e.g: read.
 */
function hasAccessToAction( webStorage: WebStorage, appInstance: any, feature: string, action: string ): void;

/**
 * Action has filter on it.
 * @param { WebStorage } webStorage - Data store in the browser storage.
 * @param { string } feature - Feature you want to check the permission on. e.g: reports.
 * @param { string } viewFilter - Object key you want to check.
 * @param { string } filterKey - Value you want to compare viewFilter's value with.
 */
function hasFilterOn( webStorage: WebStorage, feature: string, viewFilter: string, filterKey: string ): boolean;

/**
 * True if only one requiredActions is contain within the authorizedActions.
 * @param { string[] } requiredActions - Actions you want to perform.
 * @param { string[] } authorizedActions - Actions you can perform.
 */
function canPerformAnyAction( requiredActions: string[], authorizedActions: string[] ): boolean;
```