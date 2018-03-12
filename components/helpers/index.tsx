// Modules
import md5 from 'md5'
import * as base64 from 'base-64'
import * as classNames from 'classnames'

// Wordings
import { MULTILANGUAGE_WORDINGS } from '@amalto/wordings'

// Models
import { Endpoints } from './models/AppEndpointsModel'
import { OrgModel, TreeNodeModel } from './models/Organisation'

// Constants
import { AVAILABLE_LANGUAGES } from './constants/Config'
import { flagsDef } from './constants/Data'

export const EMAIL_REGEX = /^\S+@\S+\.\S+$/
export const COLOR_CODE_REGEX = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
export const SCOPE_KEYWORD_REGEX = /^[a-zA-Z0-9-_~@$£|€¥§&]+$/
export const MAP_PROPERTY_KEY_REGEX = /^[a-zA-Z0-9-_]+$/
export const XML_TAG_REGEX = /^[a-zA-Z_:][a-zA-Z0-9_:\-\.]*$/
export const HTTPS_URL_REGEX = /https:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/=]*)/

export function getWordingsInUserLanguage( locale: string ): { [key: string]: string } {
    var res = Object.keys( MULTILANGUAGE_WORDINGS ).reduce(
        ( dic, key ) => {
            dic[key] = MULTILANGUAGE_WORDINGS[key][locale]
            return dic
        },
        {} as { [key: string]: string; }
    )
    return res
}

export function compileWordings( wordings: { [key: string]: any }, locale: string ): { [key: string]: string } {
    locale = locale || "en-US"

    var res = Object.keys( wordings ).reduce(
        ( dic, key ) => {
            dic[key] = wordings[key][locale]
            return dic
        },
        {} as { [key: string]: string; }
    )
    return res
}

/** Return gravater linked to use email. */
export function getGravatarUrl( email: string ): string {
    var baseUrl = 'https://secure.gravatar.com/avatar/'
    var queryParams = '?s=200&d=mm'
    return baseUrl + md5( email.trim().toLowerCase() ) + queryParams
}

export function isValidPassword( password: string ): boolean {
    var minMaxLength = /^[\s\S]{8,32}$/,
        upper = /[A-Z]/,
        lower = /[a-z]/,
        number = /[0-9]/,
        count = 0;

    if ( minMaxLength.test( password ) ) {
        if ( upper.test( password ) ) {
            count++
        }
        if ( lower.test( password ) ) {
            count++
        }
        if ( number.test( password ) ) {
            count++
        }
    }

    return count >= 2;
}

//at least it has an "@" and a "." in it...
export function isValidEmail( email: string ): boolean {
    return EMAIL_REGEX.test( email )
}

//check for an hex color code like #fff or #ffffff
export function isValidColorCode( color: string ): boolean {
    return COLOR_CODE_REGEX.test( color )
}

export function isNotEmpty( value: string ): boolean {
    return !!value && value.trim().length > 0
}

//check for a valid scope keyword value (see "Scopes and Permissions" page on confluence)
export function isValidScopeKeyword( value: string ): boolean {
    return SCOPE_KEYWORD_REGEX.test( value )
}

//check for a valid object key char
export function isValidKeyChar( value: string ): boolean {
    return MAP_PROPERTY_KEY_REGEX.test( value )
}

//check for a valid XML Tag
export function isValidXMLTag( value: string ): boolean {
    return XML_TAG_REGEX.test( value )
}

// Check for a valid https url
export function isValidHttpsUrl( value: string ): boolean {
    return HTTPS_URL_REGEX.test( value )
}

export function escapeXml( xml: string ): string {
    return xml.replace( /[<>&'"]/g, c => {
        switch ( c ) {
            case '<':
                return '&lt'
            case '>':
                return '&gt'
            case '&':
                return '&amp'
            case '\'':
                return '&apos'
            case '"':
                return '&quot'
        }
    } )
}

export function utf8JSON_to_b64URI( json ) {
    return encodeURIComponent( base64.encode( decodeURIComponent( encodeURIComponent( JSON.stringify( json ) ) ) ) );
}

export function URIb64_to_utf8JSON( str ) {
    try {
        return JSON.parse( decodeURIComponent( encodeURIComponent( base64.decode( decodeURIComponent( str ) ) ) ) );
    }
    catch ( error ) {
        console.log( 'JSON parsing error: ', error );
        return {};
    }
}

export function arrayMin( arr: number[] ): number {
    return arr.reduce( ( prev, next ) => {
        return ( prev < next ? prev : next )
    } )
}

export function arrayMax( arr: number[] ): number {
    return arr.reduce( ( prev, next ) => {
        return ( prev > next ? prev : next )
    } )
}

export function formatFileSize( size: number ): string {
    if ( !size ) {
        return '0 B'
    }
    const k = 1000
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
    let i = Math.floor( Math.log( size ) / Math.log( k ) )
    let unit = i < 5 ? sizes[i] : sizes[4]

    return ( size / Math.pow( k, i ) ).toFixed( 1 ) + ' ' + unit
}

/**
 * Returns a key-value object from a query string like ?test=value&other=something
 */
export function getQueryParams( searchString: string ): any {
    if ( !searchString ) {
        return {}
    }

    let queryStringParams = searchString.substr( 1 ).split( '&' )

    let queryParams = queryStringParams.reduce( ( acc, queryStrParam ) => {
        let keyValue = queryStrParam.split( '=' )

        if ( keyValue.length === 2 ) {
            acc[keyValue[0]] = decodeURIComponent( keyValue[1] )
        }

        return acc
    }, {} )

    return queryParams
}


/**
 * Adds a query parameter to a URI (string)
 * returns an HTMLAnchorElement
 */
export function addQueryParam( uri: string, key: string, value: any ): HTMLAnchorElement {
    let link = document.createElement( 'a' )
    link.href = uri

    if ( link.search ) {
        link.search += ( '&' + encodeURIComponent( key ) + '=' + encodeURIComponent( value ) )
    }
    else {
        link.search = ( '?' + encodeURIComponent( key ) + '=' + encodeURIComponent( value ) )
    }

    return link
}

//return the same object passed as param but with ASC ordered keys
export function orderAsc( object: Object ): Object {
    let result = {}

    Object.keys( object ).sort().forEach( key => {
        result[key] = object[key]
    } )

    return result
}

//return the same object passed as param but with DESC ordered keys
export function orderDesc( object: Object ): Object {
    let result = {}

    Object.keys( object ).sort().reverse().forEach( key => {
        result[key] = object[key]
    } )

    return result
}

export function saveDataAsJSONFile( data: any, fileName: string ): void {
    let json = JSON.stringify( data, null, '\t' )

    let blob = new Blob( [json], {
        type: 'application/json'
    } )

    triggerDataDownload( blob, fileName + '_' + ( new Date().toISOString().substr( 0, 19 ) ) + '.json' )
}

export function downloadDataFile( base64DataString: string, contentType: string, fileName: string ): void {
    const b64String = 'data:' + contentType + ';base64,' + base64DataString
    triggerDataDownload( b64String, fileName, true )
}

function triggerDataDownload( data: Blob | string, fileName: string, dataUrl?: boolean ): void {
    let url = dataUrl ? data as string : URL.createObjectURL( data )

    //create a download link
    let link = document.createElement( 'a' )
    link.href = url
    link['download'] = fileName

    //trigger the download
    link.click()

    URL.revokeObjectURL( url )
}

export function hasRequiredResource( appEndpoints: Endpoints, appInstanceName: string, featureId: string ): boolean {

    //search for an existing endpoint for this feature on the current instance
    if ( appEndpoints && appEndpoints[appInstanceName] ) {
        if ( appEndpoints[appInstanceName][featureId] ) {
            return true
        }
    }

    return false
}

export function replaceTemplateViewName( templatedHtml: string, viewName: string ): string {
    return templatedHtml.replace( /{{VIEWNAME}}/g, viewName )
}

//SPECIAL TRANSFORMERS/ADPATERS HELPERS

export function replaceTemplateFlags( templatedHtml: string, locale: string ): string {
    let flagsRegex = /{{FLAGS\=(.*)}}/g

    let matchRes = flagsRegex.exec( templatedHtml )

    if ( matchRes && matchRes.length === 2 ) {
        let flags = matchRes[1].split( ',' )
        let flagsHtml = ''

        for ( let flagName in flagsDef ) {
            const flagDef = flagsDef[flagName]

            if ( flagName !== 'eunread' ) {

                if ( ( flagDef.inversed && flags.indexOf( flagName ) === -1 ) || ( !flagDef.inversed && flags.indexOf( flagName ) !== -1 ) ) {
                    flagsHtml += '<span class="fa fa-fw right-spaced text-xlarge ' + flagDef.iconColor + ' ' + flagDef.iconShape + '" title="' + flagDef.flagLabel[locale] + '"></span>'
                }

            }
        }

        return templatedHtml.replace( flagsRegex, flagsHtml )

    }
    else {
        return templatedHtml
    }

}

export function getStyleDef( styleConf: string ): { icon: string, btn: string, color: string } {
    let styles = styleConf.split( ',' )
    let res = {
        icon: null,
        btn: null,
        color: null
    } as { icon: string, btn: string, color: string };
    styles.forEach( style => {
        if ( style.indexOf( 'icon:' ) !== -1 ) {
            res.icon = style.replace( 'icon:', '' )
        }
        if ( style.indexOf( 'btn:' ) !== -1 ) {
            res.btn = style.replace( 'btn:', '' )
        }
        if ( style.indexOf( 'color:' ) !== -1 ) {
            res.color = style.replace( 'color:', '' )
        }
    } )
    return res
}

export function getAcceptLanguageHeader( locale: string ): string {
    let notSelected = AVAILABLE_LANGUAGES.filter( ( language, idx ) => {
        //limit to 3 languages max
        return language.locale !== locale && idx < 3
    } ).map( ( language, idx ) => {
        //decreasing priority for each not selected language
        return language.locale.substr( 0, 2 ).toLowerCase() + ';q=' + ( 0.8 - ( idx / 10 ) ).toString()
    } )

    return locale.substr( 0, 2 ).toLowerCase() + ',' + notSelected.join( ',' )
}

export function getI18nLabel( locale: string, labelMap: { [language: string]: string; }, noRegion?: boolean, upper?: boolean ): string {

    let res = null

    let language = locale

    if ( noRegion ) {
        language = language.substr( 0, 2 )
    }

    if ( upper ) {
        language = language.toUpperCase()
    }

    if ( labelMap ) {
        if ( labelMap[language] ) {
            res = labelMap[language]
        }

        if ( !res && language !== 'EN' ) {
            res = labelMap['EN']
        }

        if ( !res && language !== 'en' ) {
            res = labelMap['en']
        }

        if ( !res && language !== 'en-US' ) {
            res = labelMap['en-US']
        }
    }

    return res

}

export function getJSTreeData( orgTreeData: OrgModel, openedNodes?: string[] ): TreeNodeModel {

    return orgTreeData ? {
        id: orgTreeData.id,
        text: orgTreeData.id === '0' ? '' : orgTreeData.elementName,
        data: {
            description: orgTreeData.description,
            propertiesMap: orgTreeData.propertiesMap,
            parentId: orgTreeData.parentId,
            childNames: orgTreeData.children ? orgTreeData.children.map( child => child.elementName ) : []
        },
        children: orgTreeData.children ? orgTreeData.children.map( child => {
            return getJSTreeData( child, openedNodes )
        } ) : null,
        icon: classNames( 'fa fa-fw', {
            'fa-th-large font-color-lighter': orgTreeData.id !== '0',
            'fa-terminal black-color': orgTreeData.id === '0',
        } ),
        state: {
            opened: openedNodes ? openedNodes.indexOf( orgTreeData.id ) !== -1 : false,
            //fake root node created when the user has multiple positions at the same level should be disabled
            disabled: orgTreeData.id === '-1'
        }
    } : null

}

export function loadTooltips( element: Element ): void {
    if ( !Modernizr.touchevents ) {
        let $elementTooltips = $( element ).find( '[data-toggle="tooltip"]' )
        $elementTooltips.tooltip( {
            container: 'body',
            placement: 'auto top'
        } )

        $elementTooltips.on( 'click', function () {
            $elementTooltips.tooltip( 'hide' )
        } )
    }
}

export function unloadTooltips( element: Element ): void {
    if ( !Modernizr.touchevents ) {
        let $elementTooltips = $( element ).find( '[data-toggle="tooltip"]' )
        $elementTooltips.tooltip( 'hide' )
        $elementTooltips.tooltip( 'destroy' )
        $( 'div.tooltip' ).remove()
    }
}

export function groupByProperty( list: any[], propertyName: string ): { [propValue: string]: any[] } {
    return list.reduce( ( grouped, item ) => {
        let key = item[propertyName]
        grouped[key] = grouped[key] || []
        grouped[key].push( item )
        return grouped
    }, {} )
}

export function addValToArrayNoDup( array: string[], value: string ): string[] {
    if ( array.indexOf( value ) === -1 ) {
        return array.concat( value )
    }
    return array.slice()
}

export function removeValFromArrayNoDup( array: string[], value: string ): string[] {
    return array.filter( element => element !== value )
}

export function getNestedValue( obj: any, keyPath: string ): any {

    if ( !obj ) {
        return undefined
    }

    const props = keyPath.split( '.' )

    if ( props.length === 1 ) {
        return obj[props[0]]
    }
    else {
        return getNestedValue( obj[props[0]], props.slice( 1 ).join( '.' ) )
    }

}

export function filterCollection( collection: any[], properties: string[], searchString: string ) {

    const searchElements = searchString.toLowerCase().split( ' ' )

    let filteredCollection = searchString ? collection.filter( item => {

        const data = properties.map( property => {
            if ( property.split( '.' ).length > 1 ) {
                return getNestedValue( item, property )
            }
            else {
                return item[property]
            }
        } ).join().toLowerCase()

        const matches = searchElements.map( search => data.indexOf( search ) !== -1 )

        return matches.filter( matched => !matched ).length === 0

    } ) : collection

    return filteredCollection

}

export function base64Decode( encodedData: string ) {
    return base64.decode( encodedData )
}

export function deepCopy( data: any, extensions?: any ): any {
    return !extensions ? JSON.parse( JSON.stringify( data || {} ) ) : $.extend( {}, data, extensions )
}