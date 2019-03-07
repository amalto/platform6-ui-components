import * as React from 'react'

// Wordings
import { MULTILANGUAGE_WORDINGS } from '@amalto/wordings'

import { compileWordings } from '@amalto/helpers'

module SearchForm {
    export interface Props {
        /** Handle search value. */
        handleSearch?: ( searchValue: string ) => void;
        /** Search value usually used with list beneath it. */
        searchValue?: string;
        /**
         * Language to use on the component which determine the search input's placeholder language. e.g: <span className='quote'>en-US</span>.
         * Locales available at [Locale](#locale).
         * Accessible via [WebStorage](#webstorage).
         * @default 'en-US'
         */
        locale?: string;
    }
}

function SearchForm( props: SearchForm.Props ) {
    const [wordings, setWordings] = React.useState( undefined )
    const [searchValue, setSearchValue] = React.useState( '' )

    // Set wordings
    React.useEffect( () => {
        setWordings( compileWordings( MULTILANGUAGE_WORDINGS, props.locale || 'en-US' ) )
    }, [props.locale] )

    // Set search value
    React.useEffect( () => {
        setSearchValue( props.searchValue )
    }, [props.searchValue] )

    // Search input
    const handleSearch = ( event: React.FormEvent<HTMLFormElement> ) => {
        event.preventDefault()
        props.handleSearch( searchValue )
    }

    return props.handleSearch && props.locale ? (
        <div className="btn-group btn-group-sm icon-input pull-right">
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    className="form-control" value={searchValue}
                    onChange={e => { setSearchValue( e.target.value ) }}
                    placeholder={wordings && wordings.searchPlaceholder} />
            </form>
            <div className="icon-ctn">
                <span className="fa fa-fw fa-search text-medium default-color" />
                <span className="v-align-hook" />
            </div>
        </div>
    ) : null
}

export default SearchForm