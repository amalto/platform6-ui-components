// Modules
import * as React from 'react'
import * as classNames from 'classnames'

/**
 * Switch input.
 */
module Switch {
    export interface Props {
        /** Input unique id. */
        id: string;
        /** Input value. */
        value: boolean;
        /** Method triggered when Switch is used. */
        changeHandler: ( value: boolean, name?: string ) => void;
        /** CSS class of <span className='quote'>Switch</span> component. */
        cssClass?: string;
        /** Whether the switch input should be align left or not. */
        alignLeft?: boolean;
        /** Input name, if not define id is used instead. */
        name?: string;
        /** Disabled switch. */
        disabled?: boolean;
    }
}

function Switch( props: Switch.Props ) {

    const handleChange = ( event: React.ChangeEvent<HTMLInputElement> ): void => {
        props.changeHandler( event.target.checked, event.target.name )
    }

    return (
        <div style={{ paddingTop: 2, paddingBottom: 2 }} className={props.cssClass}>
            <div className={classNames( 'onoffswitch', {
                'left-align': props.alignLeft
            } )}>
                <input type="checkbox" className='onoffswitch-checkbox' id={props.id}
                    checked={props.value}
                    onChange={!props.disabled ? handleChange : () => { }}
                    name={props.name || props.id}
                />
                <label className="onoffswitch-label" htmlFor={props.id}>
                    <span className={classNames( 'onoffswitch-inner', {
                        'disabled': props.disabled
                    } )}></span>
                    <span className="onoffswitch-switch"></span>
                </label>
            </div>
        </div>
    )
}

export default Switch
