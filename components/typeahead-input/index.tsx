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

    export interface State {
        typeaheadInputId: string;
        shouldDisplayDropdown: boolean;
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


class TypeaheadInput extends React.Component<TypeaheadInput.Props, TypeaheadInput.State> {
    constructor( props: TypeaheadInput.Props ) {
        super( props )

        this.state = {
            typeaheadInputId: `#${this.props.id}_typeahead`,
            shouldDisplayDropdown: isNotEmpty( props.selectedCollectionType ) && !!props.collectionTypes && !!props.setCollectionType
        }
    }

    render() {

        const { id, selectedCollectionType, collectionTypes, setCollectionType } = this.props

        const { shouldDisplayDropdown } = this.state

        return (
            <div id={id} className='clearfix'>
                <input className='form-control typeahead'
                    id={`${id}_typeahead`}
                    type='text'
                    onBlur={this.handleInputBlur}
                    name={id}
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
                                        <li key={`collection-${type}-line`} className={classNames({
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
        this.setTypeaheadClass()
    }

    componentWillUnmount() {
        $( this.state.typeaheadInputId ).typeahead( 'destroy' )
    }

    componentDidUpdate( prevProps: TypeaheadInput.Props ) {

        const { display, value } = this.props

        if ( prevProps.value !== value ) {
            $( this.state.typeaheadInputId ).typeahead( 'val', display ? display( value ) : value )
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
            $( this.state.typeaheadInputId ).typeahead( 'val', display ? display( value ) : value )
        }
    }

    private initialiazeCollection = ( collection ): void => {
        const { remote, id, value, handleInputChange, display, datumTokenizer } = this.props

        const { typeaheadInputId } = this.state

        let _collection = new Bloodhound( {
            initialize: false,
            datumTokenizer: datumTokenizer || Bloodhound.tokenizers.whitespace,
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            local: collection,
            remote: remote
        } )

        _collection.initialize()

        $( typeaheadInputId ).typeahead( {
            hint: true,
            highlight: true,
            minLength: 1
        }, {
                name: id,
                source: _collection,
                limit: Infinity,
                display: display
            } )

        $( typeaheadInputId ).typeahead( 'val', display ? display( value ) : value )

        // FIXME: When another solution is provided by typescript thant the double underscore, don't forget to make the changes
        // https://github.com/Microsoft/TypeScript/issues/9458
        $( typeaheadInputId ).bind( 'typeahead:select', ( ( __event: any, suggestion: any ) => {
            handleInputChange( suggestion )
        } ) as any )


    }

    private setTypeaheadClass = (): void => {
        if ( this.state.shouldDisplayDropdown ) {
            $( this.state.typeaheadInputId ).parent().css('width', '77%')
            $( this.state.typeaheadInputId ).parent().css('margin-right', '3%')
            $( this.state.typeaheadInputId ).parent().css('float', 'left')
        }
    }

    private updateCollection = ( collection ): void => {
        $( this.state.typeaheadInputId ).typeahead( 'destroy' )
        this.initialiazeCollection( collection )
        this.setTypeaheadClass()
    }
}

export default TypeaheadInput
