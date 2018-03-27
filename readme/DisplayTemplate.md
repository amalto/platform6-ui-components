```typescript
export namespace DisplayTemplateItem {
    
    /** Available areas in the card template. */
    export enum Area {
        Title,
        Subtitle,
        MainLeft,
        MainRight,
        SubRight1,
        SubRight2,
        DetailsLeft,
        DetailsRight,
        DetailsCenter,
        Source
    }

    export interface InlineDef {

        /** Display or not. */
        display?: boolean;

        /** Display width. */
        width?: number;

        /** Display height. */
        order?: number;

        /** Display text alignment. */
        textAlign?: string;
    }
}

export interface DisplayTemplateItem {

    /** For card template. */
    area?: DisplayTemplateItem.Area;
    
    /** Display label or not.  */
    displayLabel?: boolean;

    /** For inline display templates. */
    laptop?: DisplayTemplateItem.InlineDef;
    desktop?: DisplayTemplateItem.InlineDef;

    /** For all template types. */
    color?: string

}

export interface BaseTemplate {
    
    /** Column background color. */
    backgroundColor?: string;

    /** Column text color. */
    mainColor?: string;

    /** Column width. */
    width?: number;

    /** Collapsed after search depending of the display mode. */
    collapseAfterSearch?: {
        mobile?: boolean;
        laptop?: boolean;
        desktop?: boolean;
    };

    /** Reseting will search with default value. */
    launchSearchAfterReset?: boolean;
}

export interface DisplayTemplate {

    /** Default template for the column. */
    base?: BaseTemplate;

    /** Customize template for the column. */
    [columnId: string]: DisplayTemplateItem | any

}
```