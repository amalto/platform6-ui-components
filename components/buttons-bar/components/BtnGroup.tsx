import * as React from 'react'
import classNames from 'classnames'

import Button from './Button'

import { BtnGroupsProps } from '../models'

module BtnGroup {

    export interface Props extends BtnGroupsProps {
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

function BtnGroup( props: BtnGroup.Props ) {
    return (
        <div className={classNames( "btn-group btn-group-sm", {
            [props.cssClass]: !!props.cssClass
        } )} style={props.style}>
            {
                props.btns && props.btns.length ? (
                    props.btns.map( ( btn, idx ) => (
                        !btn.btnContent
                            ? (
                                <Button key={idx}
                                    clickAction={btn.clickAction}
                                    cssClass={btn.cssClass}
                                    iconClass={btn.iconClass}
                                    text={btn.text}
                                    disabled={btn.disabled}
                                    tooltipText={btn.tooltipText}
                                    btnContent={btn.btnContent}
                                    content={btn.content}
                                    type={btn.type} />
                            ) : (
                                <div
                                    key={idx}
                                    onClick={btn.clickAction}
                                    className={classNames( 'btn', btn.cssClass, {
                                        'disabled': btn.disabled
                                    } )}
                                    data-original-title={btn.tooltipText}
                                    data-toggle="tooltip">
                                    {btn.btnContent}
                                </div>
                            )
                    ) )
                ) : null
            }
        </div>
    )
}

export default BtnGroup