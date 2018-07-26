// Utils
import { isValidEmail, isNotEmpty, isValidHttpsUrl, compileWordings } from '@amalto/helpers'

// Wordings
import { MULTILANGUAGE_WORDINGS } from '@amalto/wordings'


//get error message giving the locale data string ID
const error = ( id: string, locale: string ) => {
    const wordings = compileWordings( MULTILANGUAGE_WORDINGS, locale )

    return wordings[id] || wordings.invalidField || 'Error'
}

export const checked = ( value: boolean, locale: string ) => value ? undefined : error( 'fieldRequired', locale )

export const required = ( value: string, locale: string ) => isNotEmpty( value ) ? undefined : error( 'fieldRequired', locale )

export const email = ( value: string, locale: string ) => isValidEmail( value ) ? undefined : error( 'invalidEmail', locale )

export const number = ( value: string, locale: string ) => value && isNaN( Number( value ) ) ? error( 'invalidNumber', locale ) : undefined

export const https = ( value: string, locale: string ) => value && isValidHttpsUrl( value ) ? undefined : error( 'invalidUrl', locale )