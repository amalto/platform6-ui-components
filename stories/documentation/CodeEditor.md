### Usage

```js
import CodeEditor from 'code-editor'
```

### Interfaces

```tsx
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
```

Each property are configuration for CodeEditor visual aspect except for the `marker` property which allow you to put a marker on the editor. 

### Props
```tsx
export interface Props extends React.Props<CodeEditor> {
    value: string;
    mode: string;
    readonly?: boolean;
    editorHeightOffset?: number;
    displaySettings?: Settings;
    loadTime: number;
    resetTick?: number;
    aceSession?: AceSession;
    docId: string;
    userJson?: UserModel.JsonContent;
    saveSession?: ( session: AceSession ) => void;
    saveContent?: ( session: AceSession ) => void;
};
```