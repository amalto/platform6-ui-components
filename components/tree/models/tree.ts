
export interface OrgModel {
    id?: string;
    parentId?: string;
    elementName?: string;
    description?: string;
    propertiesMap?: KeyValDef;
    children?: OrgModel[];
    childrenCount?: number;
}

export interface TreeNodeDataModel {
    description?: string;
    propertiesMap?: {
        [key: string]: {
            contentType: string;
            contentBytes: string;
        };
    };
    parentId?: string;
    childNames?: string[];
}

//as used by jsTree
export interface TreeNodeModel {
    id: string;
    text: string;
    children?: TreeNodeModel[];
    icon?: string;
    data?: TreeNodeDataModel;
    state?: {
        opened?: boolean;
        disabled?: boolean;
        selected?: boolean;
    }
}

export interface KeyValDef {
    [key: string]: {
        contentType: string;
        contentBytes: string;
    };
}

export interface KeyValStoreDef {
    [idx: string]: {
        key: string;
        contentType: string;
        contentBytes: string
    };
}