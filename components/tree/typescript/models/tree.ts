
interface OrgModel {
    id?: string;
    parentId?: string;
    elementName?: string;
    description?: string;
    propertiesMap?: {
        [key: string]: {
            contentType: string;
            contentBytes: string;
        };
    };
    children?: OrgModel[];
}

interface TreeNodeDataModel {
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
interface TreeNodeModel {
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

export { OrgModel, TreeNodeModel }