/**
 * Created by franckmontaigne on 09/06/16.
 */

import { DisplayTemplate } from './DisplayTemplate'

interface ColumnHeader {
    id: string | number;
    label: string | JSX.Element;
    display?: boolean;
    order?: number;
    color?: string;
    width?: number;
    textAlign?: string;
    disableClick?: boolean;
    disableSort?: boolean;
}

interface CellData {
    allowDisplayAsTextAreaOnReadonly?: boolean;
    columnId: string;
    cssClass?: string;
    display?: boolean;
    displayValue: JSX.Element | string | number;
    displayValueMaxLength?: boolean;
    isEdited?: boolean;
    lastEditable?: boolean;
    options?: {
        value: string | number;
        label?: string;
        disabled?: boolean;
    }[];
    readOnly?: boolean;
    validate?: (value: string) => any;
}

interface DataGridTemplates {
    [instanceName: string]: {
        [serviceId: string]: {
            [dataGridId: string]: DisplayTemplate
        }
    }
}

type DisplayMode = 'mobile' | 'laptop' | 'desktop'

export { ColumnHeader, CellData, DataGridTemplates, DisplayMode }