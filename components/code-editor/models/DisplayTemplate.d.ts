export declare namespace DisplayTemplateItem {
    enum Area {
        Title = 0,
        Subtitle = 1,
        MainLeft = 2,
        MainRight = 3,
        SubRight1 = 4,
        SubRight2 = 5,
        DetailsLeft = 6,
        DetailsRight = 7,
        DetailsCenter = 8,
        Source = 9,
    }
    interface InlineDef {
        display?: boolean;
        width?: number;
        order?: number;
        textAlign?: string;
    }
}
export interface DisplayTemplateItem {
    area?: DisplayTemplateItem.Area;
    displayLabel?: boolean;
    laptop?: DisplayTemplateItem.InlineDef;
    desktop?: DisplayTemplateItem.InlineDef;
    color?: string;
}
export interface BaseTemplate {
    backgroundColor?: string;
    mainColor?: string;
    width?: number;
    collapseAfterSearch?: {
        mobile?: boolean;
        laptop?: boolean;
        desktop?: boolean;
    };
    launchSearchAfterReset?: boolean;
}
export interface DisplayTemplate {
    base?: BaseTemplate;
    [columnId: string]: DisplayTemplateItem | any;
}
