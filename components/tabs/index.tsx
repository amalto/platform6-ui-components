/**
 * Created by franckmontaigne on 13/06/16.
 */

// Modules
import * as React from 'react'
import * as classNames from 'classnames'
import * as uuid from 'uuid'
import * as PerfectScrollbar from 'react-perfect-scrollbar'

// Utils
import { compileWordings } from '@amalto/helpers'

// Components
import Tab from '@amalto/tab'

/**
 * Tabs management component allowing you to display custom content.
 */
module Tabs {

    export interface Props extends React.Props<Tabs> {
        /** Close tab method. */
        closeTab: ( tabId: string ) => void;
        /** Select tab method. */
        openedTab: ( tabId: string ) => void;
        /** Allow horizontal scrolling on tab list. */
        allowHorizontalScrolling?: boolean;
        /** Array of [Tab](#tab). */
        tabs: JSX.Element[];
        /** Current tab selected. */
        selectedTabId: string;
        /** Array of all the tab in edit state. <span className='quote'>Tab</span> title will be in italic. */
        editedTabIds?: string[];
        /** Tabs component CSS style. */
        tabWrapperStyle?: React.CSSProperties;
        /** Common tab CSS style for all Tab. */
        tabLinkStyle?: React.CSSProperties;

        /** Hide props from documentation */

        /** @ignore */
        children?: React.ReactNode;
        /** @ignore */
        key?: React.ReactText;
        /** @ignore */
        ref?: React.Ref<Tabs>;
    }

    export interface State {

    }

}

class Tabs extends React.Component<Tabs.Props, Tabs.State> {

    constructor( props: Tabs.Props ) {
        super( props )
    }

    render() {

        const { tabs, closeTab, tabWrapperStyle, tabLinkStyle, selectedTabId, editedTabIds } = this.props

        const tabsContent: JSX.Element[] = tabs.map( tab => {
            return (
                <li className={classNames( {
                    'closable': tab.props.closable,
                    'active': tab.props.id === selectedTabId
                } )}
                    style={tabLinkStyle}
                    key={tab.props.id}>
                    <a href="#"
                        id={`${ tab.props.id }_tab_anchor`}
                        onClick={e => { e.preventDefault(); this.openTab( tab.props.id ) }}
                        title={tab.props.title}
                        className={classNames( {
                            'italic black-color-important': editedTabIds && editedTabIds.indexOf( tab.props.id ) >= 0,
                            [tab.props.tabLinkUniqueClass]: !!tab.props.tabLinkUniqueClass
                        } )}
                        style={tab.props.tabLinkUniqueStyle}>
                        {tab.props.iconClass ? <i className={classNames( `${ tab.props.iconClass } right-spaced` )}></i> : null}
                        {tab.props.title}
                    </a>
                    {tab.props.closable ? <button className="close" onClick={e => this.closeTab( tab.props.id )}>&times;</button> : null}
                </li>
            )
        } )

        return tabs.length ? (

            <div className="tab-wrapper" style={tabWrapperStyle}>

                {
                    this.props.allowHorizontalScrolling ? (
                        <PerfectScrollbar option={{ useBothWheelAxes: true, suppressScrollY: true }}>
                            <ul className="nav nav-tabs">
                                {tabsContent}
                            </ul>

                        </PerfectScrollbar>
                    ) : <ul className="nav nav-tabs">{tabsContent}</ul>
                }

                <div className="tab-content">
                    {
                        tabs.map( tab => {
                            return (
                                <div
                                    key={tab.props.id}
                                    id={tab.props.id}
                                    className={classNames( 'tab-pane', tab.props.tabClassNames, {
                                        'active': tab.props.id === selectedTabId
                                    } )}
                                    style={tab.props.tabStyle}>

                                    {tab.props.renderer ? tab.props.renderer() : tab.props.children}

                                </div>
                            )
                        } )
                    }
                </div>

            </div >

        ) : null
    }

    private closeTab = ( tabId: string ) => {
        this.props.closeTab( tabId )
    }

    private openTab = ( tabId: string ) => {
        this.props.openedTab( tabId )
    }

}

export default Tabs
