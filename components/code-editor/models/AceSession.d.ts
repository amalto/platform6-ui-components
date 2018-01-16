/// <reference types="ace" />
interface AceSession {
    id: string;
    selection: AceAjax.Selection;
    value: string;
    history: {
        undo: any[];
        redo: any[];
    };
    scrollTop: number;
    scrollLeft: number;
    options?: any;
    cursorPosition?: AceAjax.Position;
    savable?: boolean;
    firstChangeTime: number;
}
export default AceSession;
