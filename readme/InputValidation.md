```jsx noeditor
const version = require('../components/input-validation/package.json').version;
const Pathline = require('../../typescript/custom/Pathline').default;

<Pathline children={JSON.stringify( { name: '@amalto/input-validation', version } )} />
```

Method used on the validate property from an <blockquote>input</blockquote>. Those methods should return <blockquote>undefined</blockquote> when validated and string to be display when not validated.

### Usage

```typescript
import * as inputValidation from '@amalto/input-validation'
```

```typescript
/**
 * Check if a "checkbox" input is filled
 * 
 * @param { boolean } value
 * @param { string } locale
 */
export const checked = ( value: boolean, locale: string ) => string;

/**
 * Check if a "text" input is not empty
 * 
 * @param { boolean } value
 * @param { string } locale
 */
export const required = ( value: string, locale: string ) => string;

/**
 * Check if a "email" input has the right format.
 * 
 * @param { boolean } value
 * @param { string } locale
 */
export const email = ( value: string, locale: string ) => string;
/**
 * Check if a "text" input is a valid number.
 * 
 * @param { boolean } value
 * @param { string } locale
 */
export const number = ( value: string, locale: string ) => string;

/**
 * Check if a "text" input is a valid https url.
 * 
 * @param { boolean } value
 * @param { string } locale
 */
export const https = ( value: string, locale: string ) => string;
```