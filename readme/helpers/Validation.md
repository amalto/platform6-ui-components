Methods validating strings.

More details about [Endpoints](#appendpointsmodel).

```typescript
/**
 * At least it has an "@" and a "." in it...
 * @param { string } email - String to validate.
 */
function isValidEmail( email: string ): boolean;

/**
 * Check for an hex color code like #fff or #ffffff.
 * @param { string } color - String to validate.
 */
function isValidColorCode( color: string ): boolean;

/**
 * Check if a string is not empty or full of whitespaces.
 * @param { string } value - String to validate.
 */
function isNotEmpty( value: string ): boolean;

/**
 * Check for a valid scope keyword value (see "Scopes and Permissions" page on confluence).
 * @param { string } value - String to validate.
 */
function isValidScopeKeyword( value: string ): boolean;

/**
 * Check for a valid object key char.
 * @param { string } value - String to validate.
 */
function isValidKeyChar( value: string ): boolean;

/**
 * Check for a valid XML Tag.
 * @param { string } value - String to validate.
 */
function isValidXMLTag( value: string ): boolean;

/**
 * Check for a valid https url.
 * @param { string } value - String to validate.
 */
function isValidHttpsUrl( value: string ): boolean;

/**
 * Check if user has access to resources from feature.
 * @param { Endpoints } appEndpoints - Object containing resources by instance. More details on the link above.
 * @param { string } appInstanceName - Current instance.
 * @param { string } featureId - Service name. e.g: "home".
 */
function hasRequiredResource( appEndpoints: Endpoints, appInstanceName: string, featureId: string ): boolean;
```