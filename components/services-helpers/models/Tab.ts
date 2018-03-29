export namespace Tab {

    export interface Props {
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
        /** Custom render function of the tab content if children are not used. Should be used when tab content is dynamic and depends on parent data. */
        renderer?: () => JSX.Element;
    }

}