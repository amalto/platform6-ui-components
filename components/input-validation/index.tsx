// Utils
import { isValidEmail, isNotEmpty, isValidHttpsUrl, compileWordings } from '@amalto/helpers'

// Wordings
import { MULTILANGUAGE_WORDINGS } from '@amalto/wordings'


//get error message giving the locale data string ID
const error = ( id: string, locale: string ) => {
    const wordings = compileWordings( MULTILANGUAGE_WORDINGS, locale )

    return wordings[id] || wordings['inputvalidation.invalid'] || 'Error'
}

export const checked = ( value: boolean, locale: string ) => value ? undefined : error( 'inputvalidation.required', locale )

export const required = ( value: string, locale: string ) => isNotEmpty( value ) ? undefined : error( 'inputvalidation.required', locale )

export const email = ( value: string, locale: string ) => isValidEmail( value ) ? undefined : error( 'inputvalidation.invalid.email', locale )

export const number = ( value: string, locale: string ) => value && isNaN( Number( value ) ) ? error( 'inputvalidation.invalid.number', locale ) : undefined

export const https = ( value: string, locale: string ) => value && isValidHttpsUrl( value ) ? undefined : error( 'inputvalidation.invalid.https.url', locale )