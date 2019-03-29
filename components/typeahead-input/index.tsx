// Modules
import * as React from 'react'

import 'typeahead.js'

/**
 * Typeahead input displaying a filtered dropdown list from your input and your collection.
 */
module TypeaheadInput {
    export interface Props {
        /** Div id. */
        id: string;
        /** Collection of item to be display inside the dropdown list. */
        collection: any[];
        /** Search remotely from server. More details on [RemoteConfig](#remoteconfig). */
        remote?: RemoteConfig;
        /** Input's value. */
        value?: any;
        /** Input's <span className='quote'>onChange</span> event. */
        handleInputChange: ( value: any ) => void;
        /** Manage input value to be displayed. */
        display?: ( value: any ) => string;
        /** Manage the dropdown list of choices when input value is updated by user. */
        datumTokenizer?: ( datum: any ) => string[];
        /** Input's placeholder. */
        placeholder?: string;
    }

    export interface RemoteConfig {
        url: string;
        prepare?: ( query: string, settings: JQueryAjaxSettings ) => JQueryAjaxSettings;
        wildcard?: string;
        rateLimitby?: string;
        rateLimitWait?: number;
        transform?: ( response: any ) => any;
    }
}


function TypeaheadInput( props: TypeaheadInput.Props ) {

    const { collection, remote, id, value, handleInputChange, display, datumTokenizer, placeholder } = props

    const __input: React.MutableRefObject<HTMLInputElement> = React.useRef( null )

    // componentDidMount
    React.useEffect( () => {

        let _collection = new Bloodhound( {
            initialize: false,
            datumTokenizer: datumTokenizer || Bloodhound.tokenizers.whitespace,
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            local: collection,
            remote: remote
        } )

        _collection.initialize()

        $( __input.current ).typeahead( {
            hint: true,
            highlight: true,
            minLength: 1
        }, {
                name: id,
                source: _collection,
                limit: Infinity,
                display: display
            } )

        $( __input.current ).typeahead( 'val', display ? display( value ) : value )

        // FIXME: When another solution is provided by typescript thant the double underscore, don't forget to make the changes
        // https://github.com/Microsoft/TypeScript/issues/9458
        $( __input.current ).bind( 'typeahead:select', ( ( __event: any, suggestion: any ) => {
            handleInputChange( suggestion )
        } ) as any )

        return __input ? () => $( __input.current ).typeahead( 'destroy' ) : null
    }, [] )

    // Component did update
    React.useEffect( () => {
        $( __input.current ).typeahead( 'val', display ? display( value ) : value )
    }, [props.value] )

    const handleInputBlur = ( event: React.FocusEvent<HTMLInputElement> ) => {
        const { display, value, handleInputChange } = props

        if ( !event.target.value ) {
            handleInputChange( null )
        }
        else {
            $( __input.current ).typeahead( 'val', display ? display( value ) : value )
        }
    }


    return (
        <div id={id}>
            <input ref={__input} className="form-control typeahead" type="text"
                onBlur={handleInputBlur}
                name={id}
                placeholder={placeholder} />
        </div>
    )
}

export default TypeaheadInput
