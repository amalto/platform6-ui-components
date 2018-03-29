// Models
import {
    Id
} from './ServiceHelpers'

export interface DataGrid {
    id: string;
	columnHeaders: any [];
    noItemsMsg: string;
    fetchingItems: () => void;
    selectedItems: ( selectedItems: number[] ) => void;
    selectHandler: ( id: Id ) => void;
}