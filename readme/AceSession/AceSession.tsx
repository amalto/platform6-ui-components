import * as React from 'react'

module AceSession {

    export interface Props extends React.ClassAttributes<AceSession> {
        /** Unique id. */
        id: string;
        /**
         * Selection of the ace editor document. Do not modify. For more information see https://ace.c9.io/#nav=api&api=selection
        **/
        selection?: AceAjax.Selection;
        /** Current value of ace session */
        value: string;
        /** Ace session history that allow you to undo and redo modifications.  */
        history: {
            undo: any[];
            redo: any[];
        };
        /** Scroll top to the value provided */
        scrollTop: number;
        /** Scroll left to the value provided */
        scrollLeft: number;
        /** Ace editor options set by the CodeEditor's props. Do not modify. */
        options?: any;
        /** Current cursor position. e.g: { row: 1, column: 10 }. */
        cursorPosition?: AceAjax.Position;
        /** Tell the user if there is some syntax error. */
        savable?: boolean;
        /** Time of the ace editor mounting in ms. */
        firstChangeTime: number;

        /**
         * Hide props from documentation
         */

        /** @ignore */
        children: React.ReactNode;
        /** @ignore */
        key: React.ReactText;
        /** @ignore */
        ref: React.Ref<AceSession>;
    }
}

class AceSession extends React.Component<AceSession.Props, any> {
    constructor( props: AceSession.Props ) { super( props ); this.state = {} }
    render() { return <div></div> }
}

export default AceSession