
export interface DataGridPartialProps {
    dataGridId: string
    columnHeaders: any[];
    dataLines: any[];
    noItemsMsg: string;
    selectHandler?: ( indexes: number[] ) => void;
    sortDirection?: string;
    sortColumn?: string;
    sortHandler?: () => void;
}

export interface TabPartialProps {
    id: string;
    title: string;
    closable: boolean;
}

export interface ButtonsBarPartialProps {
    btnGroups: BtnGroupsProps[];
    locale: string;
}

export interface BtnGroupsProps {
    btns: ButtonProps[];
    style?: React.CSSProperties;
    cssClass?: string;
}

export interface ButtonProps {
    clickAction?: () => void;
    cssClass?: string;
    iconClass?: string;
    text?: string;
    disabled?: boolean;
    tooltipText?: string;
    btnContent?: JSX.Element;
    content?: JSX.Element;
    type?: string;
}