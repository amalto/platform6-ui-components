Settings is only used on [CodeEditor](#codeeditor) and [CodeEditorInput](#codeeditorinput) components.

```typescript
interface Settings {

    /** Editor's theme */
    theme?: string;

    /** Editor's police size. */
    fontSize?: string;

    /** Editor's text font family. */
    fontFamily?: string;

    /** Display special caracters like a new line. */
    showInvisibles?: boolean;

    /** Display gutter with lines numbers. */
    showGutter?: boolean;

    /** Show identation line. */
    showIndent?: boolean;

    /**
     * If a line is too long it will break the line and display the rest on a new line.
     */
    wrap?: boolean;

    /** Highlight cursor current line. */
    highlight?: boolean;

    /** Display a marker on the editor gutter. */
    marker?: Marker;
}
```