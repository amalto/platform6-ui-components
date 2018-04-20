Method used on the validate property from an <blockquote>input</blockquote>.

```typescript
/**
 * Check if a "checkbox" input is filled
 * 
 * @param { boolean } value
 * @param { string } locale
 */
export const checked = ( value: boolean, locale: string ) => value ? undefined : error( 'fieldRequired', locale )

/**
 * Check if a "text" input is not empty
 * 
 * @param { boolean } value
 * @param { string } locale
 */
export const required = ( value: string, locale: string ) => isNotEmpty( value ) ? undefined : error( 'fieldRequired', locale )

/**
 * Check if a "email" input has the right format.
 * 
 * @param { boolean } value
 * @param { string } locale
 */
export const email = ( value: string, locale: string ) => isValidEmail( value ) ? undefined : error( 'invalidEmail', locale )

/**
 * Check if a "text" input is a valid number.
 * 
 * @param { boolean } value
 * @param { string } locale
 */
export const number = ( value: string, locale: string ) => value && isNaN( Number( value ) ) ? error( 'invalidNumber', locale ) : undefined

/**
 * Check if a "text" input is a valid https url.
 * 
 * @param { boolean } value
 * @param { string } locale
 */
export const https = ( value: string, locale: string ) => value && isValidHttpsUrl( value ) ? undefined : error( 'invalidUrl', locale )
```