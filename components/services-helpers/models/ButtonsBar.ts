export interface BtnModel {
    label: string;
    iconClass: string;
    btnClass: string;
    action: ( ...args: any[] ) => any;
    disabled?: boolean;
}

export interface ButtonsBar {
    locale: string;
    btnGroups: { [id: string]: BtnModel };
}