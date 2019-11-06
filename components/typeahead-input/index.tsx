// Modules
import * as React from 'react'

import 'typeahead.js'

import { isNotEmpty } from '@amalto/helpers'

import * as classNames from 'classnames'

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

        /** Current collection type. */
        selectedCollectionType?: string;
        /** Define the collection type which will display different results on the dropdown list. */
        collectionTypes?: string[];
        /** Update collection type. */
        setCollectionType?: ( collectionType: string ) => void;

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

        const { selectedCollectionType, collectionTypes, setCollectionType } = this.props

        const shouldDisplayDropdown: boolean = isNotEmpty( selectedCollectionType ) && !!collectionTypes && !!setCollectionType

        return (
            <div id={this.props.id}>
                <input className={classNames( 'form-control typeahead', {
                    'btn-prefix': shouldDisplayDropdown
                } )}
                type='text'
                    onBlur={this.handleInputBlur}
                    name={this.props.id}
                    placeholder={this.props.placeholder} />

                    {
                        shouldDisplayDropdown ? (
                            <div className='btn btn-group btn-group-sm mgt-0 mgl-0 input-suffix'
                                style={{paddingTop: 0}}>
                                <button type='button' className='btn btn-info dropdown-toggle full-width'
                                    data-toggle='dropdown'>
                                    <span className='right-spaced'>{selectedCollectionType}</span>
                                    <span className='caret'
                                    style={{
                                        right: 5,
                                        position: 'absolute',
                                        top: '50%'
                                    }}></span>
                                </button>

                            <ul className='dropdown-menu'>
                                {
                                    collectionTypes.map( type => (
                                        <li className={classNames({
                                            'active': selectedCollectionType === type
                                        })}>
                                            <a href='#'
                                                onClick={ e => {
                                                    e.preventDefault()
                                                    setCollectionType( type )
                                                }}>
                                                {type}
                                            </a>
                                        </li>
                                    ) )
                                }
                            </ul>
                            </div>
                        ) : null
                    }
            </div>
        )
    }

    componentDidMount() {
        this.initialiazeCollection( this.props.collection )
    }

    componentWillUnmount() {
        $( '.typeahead' ).typeahead( 'destroy' )
    }

    componentDidUpdate( prevProps: TypeaheadInput.Props ) {

        const { display, value } = this.props

        if ( prevProps.value !== value ) {
            $( '.typeahead' ).typeahead( 'val', display ? display( value ) : value )
        }

        if ( prevProps.collection !== this.props.collection ) {
            this.updateCollection( this.props.collection )
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

    private initialiazeCollection = ( collection ): void => {
        const { remote, id, value, handleInputChange, display, datumTokenizer } = this.props

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

    private updateCollection = ( collection ): void => {
        $( '.typeahead' ).typeahead( 'destroy' )
        this.initialiazeCollection( collection )
    }
}

export default TypeaheadInput
