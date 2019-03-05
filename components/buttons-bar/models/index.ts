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