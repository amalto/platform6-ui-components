export interface AceSession {
    cursorPosition?: AceAjax.Position;
    firstChangeTime: number;
    id: string;
    history: {
        undo: any[];
        redo: any[];
    };
    name?: string;
    options?: any;
    savable?: boolean;
    scrollLeft: number;
    scrollTop: number;
    selection: AceAjax.Selection;
    value: string;
}