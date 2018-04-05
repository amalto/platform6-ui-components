```jsx noeditor
const CopyStringContent = require('../typescript/components/CopyStringContent').default;

<div>
    <CopyStringContent content='npm install --save scope-helpers' />
    <CopyStringContent content="import ScopeHelpers from '@amalto/scope-helpers'" />
</div>
```

Methods checking user's permissions.

```jsx noeditor
const NpmLink = require('../typescript/components/NpmLink').default;
const VersionLine = require('../typescript/components/VersionLine').default;
const version = require('../components/scope-helpers/package.json').version;

<div>
    <NpmLink href='https://www.npmjs.com/package/@amalto/scope-helpers' name='@amalto/scope-helpers' />
    <VersionLine version={version} />
</div>
```

More informations on the interfaces [WebStorage](#webstorage), [PermissionDef](#permissiondef) and [ScopeValue](#scopevalue).

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