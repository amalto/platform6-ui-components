import * as React from 'react'
import classNames from 'classnames'

module Button {
    export interface Props {
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
}

function Button( props: Button.Props ) {
    return (
        <button
            onClick={props.clickAction}
            className={classNames( 'btn', props.cssClass )}
            disabled={props.disabled}
            data-original-title={props.tooltipText}
            type={props.type || 'button'}
            data-toggle="tooltip">

            {
                props.content ? props.content : props.text ? (
                    <span>
                        {props.iconClass ? <span className={classNames( 'fa-fw right-spaced', props.iconClass )} /> : null}
                        <span>{props.text}</span>
                    </span>
                ) : <span className={classNames( 'fa-fw', props.iconClass )} />
            }

        </button>
    )
}

export default Button