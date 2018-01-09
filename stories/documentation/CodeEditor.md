export interface Settings {
    theme?: string;
    fontSize?: string;
    fontFamily?: string;
    showInvisibles?: boolean;
    showGutter?: boolean;
    showIndent?: boolean;
    wrap?: boolean;
    highlight?: boolean;
    marker?: Marker;
};

export interface Marker {
    row: number;
    column: number;
};