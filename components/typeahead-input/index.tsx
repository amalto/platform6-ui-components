// Modules
import * as React from 'react'

import 'typeahead.js'

/**
 * Typeahead input displaying a filtered dropdown list from your input and your collection.
 */
module TypeaheadInput {
    export interface Props extends React.Props<TypeaheadInput> {
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

        /** Hide props from documentation */

        /** @ignore */
        children?: React.ReactNode;
        /** @ignore */
        key?: React.ReactText;
        /** @ignore */
        ref?: React.Ref<TypeaheadInput>;
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


class TypeaheadInput extends React.Component<TypeaheadInput.Props, any> {
    constructor( props: TypeaheadInput.Props ) {
        super( props )
    }

    render() {

        return (
            <div id={this.props.id}>
                <input className="form-control typeahead" type="text"
                    onBlur={this.handleInputBlur}
                    name={this.props.id}
                    placeholder={this.props.placeholder} />
            </div>
        )
    }

    componentDidMount() {

        const { collection, remote, id, value, handleInputChange, display, datumTokenizer } = this.props

        let _collection = new Bloodhound( {
            initialize: false,
            datumTokenizer: datumTokenizer || Bloodhound.tokenizers.whitespace,
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            local: collection,
            remote: remote
        } )

        _collection.initialize()

        $( '.typeahead' ).typeahead( {
            hint: true,
            highlight: true,
            minLength: 1
        }, {
                name: id,
                source: _collection,
                limit: Infinity,
                display: display
            } )

        $( '.typeahead' ).typeahead( 'val', display ? display( value ) : value )

        // FIXME: When another solution is provided by typescript thant the double underscore, don't forget to make the changes
        // https://github.com/Microsoft/TypeScript/issues/9458
        $( '.typeahead' ).bind( 'typeahead:select', ( ( __event: any, suggestion: any ) => {
            handleInputChange( suggestion )
        } ) as any )
    }

    componentWillUnmount() {
        $( '.typeahead' ).typeahead( 'destroy' )
    }

    componentDidUpdate( prevProps: TypeaheadInput.Props ) {

        const { display, value } = this.props

        if ( prevProps.value !== value ) {
            $( '.typeahead' ).typeahead( 'val', display ? display( value ) : value )
        }
    }

    private handleInputBlur = ( event: any ) => {
        const { display, value, handleInputChange } = this.props

        if ( !event.target.value ) {
            handleInputChange( null )
        }
        else {
            $( '.typeahead' ).typeahead( 'val', display ? display( value ) : value )
        }
    }

}

export default TypeaheadInput
