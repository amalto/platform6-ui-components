
import KeyValueEditor from '@amalto/key-value-editor'

declare type KeyValDef = KeyValueEditor.KeyValDef

export interface OrgModel {
    id?: string;
    parentId?: string;
    elementName?: string;
    description?: string;
    propertiesMap?: KeyValDef;
    children?: OrgModel[];
}

export interface TreeNodeDataModel {
    description?: string;
    propertiesMap?: KeyValDef;
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