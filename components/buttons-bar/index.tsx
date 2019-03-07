/**
 * Created by franckmontaigne on 28/03/17.
 */

// Modules
import * as React from 'react'

// Components
import BtnGroup from './components/BtnGroup'
import SearchForm from './components/SearchForm'

/**
 * Component allowing you to display a set of buttons as well as a search input if needed.
 * 
 * ButtonsBar uses [WebStorage](#webstorage)'s properties which are accessible at the root component of your service.
 */
module ButtonsBar {

    export interface BtnGroupsProps {
        btns: ButtonProps[];
        style?: React.CSSProperties;
        cssClass?: string;
    }

    export interface ButtonProps {
        clickAction?: () => void;
        cssClass?: string;
        iconClass?: string;
        text?: string;
        disabled?: boolean;
        tooltipText?: string;
        btnContent?: JSX.Element;
        content?: JSX.Element;
        type?: string;
    }

    export interface Props {
        /** Handle search value. */
        handleSearch?: ( searchValue: string ) => void;
        /** Search value usually used with list beneath it. */
        searchValue?: string;
        /** Button list to be displayed. More details on [BtnGroupsProps](#btngroupsprops) */
        btnGroups: BtnGroupsProps[];
        /**
         * Language to use on the component which determine the search input's placeholder language. e.g: <span className='quote'>en-US</span>.
         * Locales available at [Locale](#locale).
         * Accessible via [WebStorage](#webstorage).
         * @default 'en-US'
         */
        locale?: string;
    }

    export interface State {

    }

}

function ButtonsBar( props: ButtonsBar.Props ) {
    const { handleSearch, searchValue, btnGroups, locale } = props

    return btnGroups && btnGroups.length || handleSearch ? (

        <div className="btn-toolbar">

            {btnGroups.map( ( btnGroup, idx ) => ( <BtnGroup key={idx} {...btnGroup} /> ) )}

            <SearchForm handleSearch={handleSearch} searchValue={searchValue} locale={locale} />

        </div>

    ) : null
}

export default ButtonsBar
