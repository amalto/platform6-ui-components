/**
 * Created by franckmontaigne on 13/06/16.
 */

import * as React from 'react'

//modules
import * as classNames from 'classnames'

/**
 * This component should be used in the Tabs component.
 */
namespace Tab {

    export interface Props extends React.Props<Tab> {
        /** Id will be used when selecting a tab from Tabs compoenent. */
        id: string;
        /** Icon in front of the title. */
        iconClass?: string;
        /** Tab displayed title. */
        title: string;
        /** Tab is closable or not. */
        closable?: boolean;
        /** Common CSS style shared between Tab from Tabs component. */
        tabStyle?: React.CSSProperties;
        /** Common CSS class shared between Tab from Tabs component. */
        tabClassNames?: string;
        /** CSS class applied only to thos tab link. */
        tabLinkUniqueClass?: string;
        /** CSS style applied only to thos tab link. */
        tabLinkUniqueStyle?: React.CSSProperties;

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
