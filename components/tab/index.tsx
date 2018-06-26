/**
 * Created by franckmontaigne on 13/06/16.
 */

// Modules
import * as React from 'react'
import * as classNames from 'classnames'

/**
 * This component should be used in the [Tabs](#tabs) component.
 */
namespace Tab {

    export interface Props extends React.Props<Tab> {
        /** Id will be used when selecting a tab from <span className='quote'>Tabs</span> compoenent. */
        id: string;
        /** Icon in front of the title. */
        iconClass?: string;
        /** Displayed title. */
        title: string;
        /**
         * Closable or not.
         * @default false
         */
        closable?: boolean;
        /** Common CSS style shared between <span className='quote'>Tab</span> from Tabs component. */
        tabStyle?: React.CSSProperties;
        /** Common CSS class shared between <span className='quote'>Tab</span> from <span className='quote'>Tabs</span> component. */
        tabClassNames?: string;
        /** CSS class applied only to this tab link. */
        tabLinkUniqueClass?: string;
        /** CSS style applied only to this tab link. */
        tabLinkUniqueStyle?: React.CSSProperties;
        /** Custom render function of the tab content if children are not used. Should be used when tab content is dynamic and depends on parent data. */
        renderer?: () => JSX.Element;

        /** Hide props from documentation */

        /** @ignore */
        children?: React.ReactNode;
        /** @ignore */
        key?: React.ReactText;
        /** @ignore */
        ref?: React.Ref<Tab>;
    }

    export interface State {

    }


}

class Tab extends React.Component<Tab.Props, Tab.State> {


    constructor( props: Tab.Props ) {
        super( props )
        this.state = {}
    }

    render() {
        return <div>{this.props.children}</div>
    }

}

export default Tab
