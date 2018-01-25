/**
 * Created by franckmontaigne on 16/11/15.
 */

export namespace DisplayTemplateItem {
    //available areas in the card template
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
        display?: boolean;
        width?: number;
        order?: number;
        textAlign?: string;
    }
}

export interface DisplayTemplateItem {

    //for card template
    area?: DisplayTemplateItem.Area;
    displayLabel?: boolean;

    //for inline display templates
    laptop?: DisplayTemplateItem.InlineDef;
    desktop?: DisplayTemplateItem.InlineDef;

    //for all template types
    color?: string

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

    [columnId: string]: DisplayTemplateItem | any

}