/**
 * Created by franckmontaigne on 28/03/17.
 */

// Modules
import * as React from 'react'
import { default as classNames } from 'classnames'

// Wordings
import { MULTILANGUAGE_WORDINGS } from '@amalto/wordings'

// Utils
import { compileWordings } from '@amalto/helpers'
import { locale } from 'moment';

/**
 * Component allowing you to display a set of buttons as well as a search input if needed.
 *
 * ButtonsBar uses [WebStorage](#webstorage)'s properties which are accessible at the root component of your service.
 */
module ButtonsBar {

    export interface BtnGroupsProps {
        btns: ButtonProps[];
        style?: React.CSSProperties;
        cssClass?: string;
    }

    export interface ButtonProps {
        clickAction?: ( event?: any ) => void;
        cssClass?: string;
        iconClass?: string;
        text?: string;
        disabled?: boolean;
        tooltipText?: string;
        btnContent?: JSX.Element;
        content?: JSX.Element;
        type?: string;
    }

    export interface Props extends React.ClassAttributes<ButtonsBar> {
        /** Handle search value. */
        handleSearch?: ( searchValue: string ) => void;
        /** Search value usually used with list beneath it. */
        searchValue?: string;
        /** Button list to be displayed. More details on [BtnGroupsProps](#btngroupsprops) */
        btnGroups: BtnGroupsProps[];
        /**
         * Language to use on the component which determine the search input's placeholder language. e.g: <span className='quote'>en-US</span>.
         * Locales available at [Locale](#locale).
         * Accessible via [WebStorage](#webstorage).
         * @default 'en-US'
         */
        locale?: string;

        /** Hide props from documentation */

        /** @ignore */
        children?: React.ReactNode;
        /** @ignore */
        key?: React.ReactText;
        /** @ignore */
        ref?: React.Ref<ButtonsBar>;
    }

    export interface State {
        searchValue?: string;
        wordings: { [id: string]: string };
    }

}

class ButtonsBar extends React.Component<ButtonsBar.Props, ButtonsBar.State> {

    constructor( props: ButtonsBar.Props ) {
        super( props )

        this.state = {
            searchValue: props.handleSearch && props.searchValue || '',
            wordings: compileWordings( MULTILANGUAGE_WORDINGS, props.locale || 'en-US' )
        }
    }

    componentDidUpdate( prevProps: ButtonsBar.Props ) {
        if ( prevProps.searchValue !== this.props.searchValue && this.props.handleSearch ) {
            this.setState( { searchValue: this.props.searchValue } as ButtonsBar.State )
        }
    }

    render() {

        const { handleSearch, btnGroups } = this.props
        const { searchValue, wordings } = this.state

        return btnGroups && btnGroups.length || handleSearch ? (

            <div className="btn-toolbar">

                {
                    btnGroups.map( ( btnGroup, idx ) => {
                        return (
                            <div key={idx} className={classNames( "btn-group btn-group-sm", {
                                [btnGroup.cssClass]: !!btnGroup.cssClass
                            } )} style={btnGroup.style}>
                                {
                                    btnGroup.btns && btnGroup.btns.length ? (
                                        btnGroup.btns.map( ( btn, idx ) => {
                                            const Button: JSX.Element = !btn.btnContent ? (
                                                <button
                                                    key={idx}
                                                    onClick={btn.clickAction}
                                                    className={classNames( 'btn', btn.cssClass )}
                                                    disabled={btn.disabled}
                                                    data-original-title={btn.tooltipText}
                                                    type={btn.type || 'button'}
                                                    data-toggle="tooltip">

                                                    {
                                                        btn.content ? btn.content : btn.text ? (
                                                            <span>
                                                                {btn.iconClass ? <span className={classNames( 'fa-fw right-spaced', btn.iconClass )} /> : null}
                                                                <span>{btn.text}</span>
                                                            </span>
                                                        ) : <span className={classNames( 'fa-fw', btn.iconClass )} />
                                                    }

                                                </button>
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

                                            return Button
                                        } )
                                    ) : null
                                }
                            </div>
                        )
                    } )
                }

                {
                    handleSearch && locale ? (
                        <div className="btn-group btn-group-sm icon-input helvetica pull-right">
                            <form onSubmit={this.handleSearch}>
                                <input
                                    type="text"
                                    className="form-control" value={searchValue}
                                    onChange={e => { this.setState( { searchValue: e.target.value } ) }}
                                    placeholder={wordings.searchPlaceholder} />
                            </form>
                            <div className="icon-ctn">
                                <span className="fa fa-fw fa-search text-medium default-color" />
                                <span className="v-align-hook" />
                            </div>
                        </div>
                    ) : null
                }

            </div>

        ) : null
    }

    private handleSearch = ( event: React.FormEvent<HTMLFormElement> ) => {
        event.preventDefault()
        this.props.handleSearch( this.state.searchValue )
    }

}

export default ButtonsBar
