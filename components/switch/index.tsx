// Modules
import * as React from 'react'
import * as classNames from 'classnames'

/**
 * Switch input.
 */
module Switch {
    export interface Props extends React.Props<Switch> {
        /** Input unique id. */
        id: string;
        /** Input value. */
        value: boolean;
        /** Method triggered when Switch is used. */
        changeHandler: ( value: boolean, name?: string ) => void;
        /** CSS class of <blockquote>Switch</blockquote> component. */
        cssClass?: string;
        /** Whether the switch input should be align left or not. */
        alignLeft?: boolean;
        /** Input name, if not define id is used instead. */
        name?: string;
        /** Disabled switch. */
        disabled?: boolean;

        /** Hide props from documentation */

        /** @ignore */
        children?: React.ReactNode;
        /** @ignore */
        key?: React.ReactText;
        /** @ignore */
        ref?: React.Ref<Switch>;
    }
}


class Switch extends React.Component<Switch.Props, any> {
    constructor( props: Switch.Props ) {
        super( props )
    }

    render() {

        return (
            <div style={{ paddingTop: 2, paddingBottom: 2 }} className={this.props.cssClass}>
                <div className={classNames( 'onoffswitch', {
                    'left-align': this.props.alignLeft
                } )}>
                    <input type="checkbox" className="onoffswitch-checkbox" id={this.props.id}
                        checked={this.props.value}
                        onChange={!this.props.disabled ? this.handleChange : () => {}}
                        name={this.props.name || this.props.id}
                    />
                    <label className="onoffswitch-label" htmlFor={this.props.id}>
                        <span className="onoffswitch-inner"></span>
                        <span className="onoffswitch-switch"></span>
                    </label>
                </div>
            </div>
        )
    }

    private handleChange = ( event: any ): void => {
        this.props.changeHandler( event.target.checked, event.target.name )
    }

}

export default Switch
