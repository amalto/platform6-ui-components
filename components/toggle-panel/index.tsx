// Modules
import * as React from 'react'
import * as classNames from 'classnames'

// Components
import Spinner from '@amalto/spinner'

/**
 * Panel component with configuration buttons.
 */
module TogglePanel {
    export interface Props extends React.Props<TogglePanel> {
        /** Header title. */
        panelTitle: string | JSX.Element;
        /** Panel state on first render. */
        defaultOpened: boolean;
        /**
         * Totally hide the header.
         * Props <span className='quote'>panelTitle</span>, <span className='quote'>togglable</span>, <span className='quote'>showSpinner</span>, <span className='quote'>leftCustomControls</span> and <span className='quote'>rightCustomControls</span> wont be used if true.
         */
        hideTitle?: boolean;
        /** Alow user to open and close panel. */
        togglable?: boolean;
        /** Panel toggling event. */
        toggleCallback?: ( opened: boolean ) => void;
        /** Show spinner on the left side of header title. */
        showSpinner?: boolean;
        /** Buttons on the right side of the header title. */
        leftCustomControls?: JSX.Element;
        /** Buttons on the right side of the header panel. */
        rightCustomControls?: JSX.Element;
        /** Cancel button on the panel footer. */
        cancelBtn?: {
            label: string;
            action: any;
            cssClass?: string;
        };
        /** Submit button on the panel footer. */
        submitBtn?: {
            label: string;
            action: any;
            cssClass?: string;
        };
        /** CSS style of the panel. */
        customStyle?: React.CSSProperties;

        /** Hide props from documentation */

        /** @ignore */
        children?: React.ReactNode;
        /** @ignore */
        key?: React.ReactText;
        /** @ignore */
        ref?: React.Ref<TogglePanel>;
    }

    export interface State {
        opened?: boolean
    }
}


class TogglePanel extends React.Component<TogglePanel.Props, TogglePanel.State> {
    constructor( props: TogglePanel.Props ) {
        super( props )

        this.state = {
            opened: this.props.defaultOpened
        }
    }

    render() {

        let titleSpinner = this.props.showSpinner ? (
            <div className="spinner-container">
                <Spinner />
            </div>
        ) : null

        let lCustomControls = this.props.leftCustomControls ? (
            <div className="panel-heading-controls">
                {this.props.leftCustomControls}
            </div>
        ) : null

        let rCustomControls = this.props.rightCustomControls ? (
            <div className="panel-heading-controls" style={{ right: 0 }}>
                {this.props.rightCustomControls}
            </div>
        ) : null

        const cancelBtn = ( this.props.cancelBtn && this.props.cancelBtn.label && this.props.cancelBtn.action ) ? (
            <button type="button" className={classNames( 'btn', this.props.cancelBtn.cssClass, {
                'btn-font btn-trans': !this.props.cancelBtn.cssClass
            } )} onClick={this.props.cancelBtn.action}>
                {this.props.cancelBtn.label}
            </button>
        ) : null

        const submitBtn = ( this.props.submitBtn && this.props.submitBtn.label && this.props.submitBtn.action ) ? (
            <button type="button" className={classNames( 'btn pull-right', this.props.submitBtn.cssClass, {
                'btn-success': !this.props.submitBtn.cssClass
            } )} onClick={this.props.submitBtn.action}>
                {this.props.submitBtn.label}
            </button>
        ) : null

        let panelFooter = ( cancelBtn || submitBtn ) ? (
            <div className="panel-footer">
                {cancelBtn}
                {submitBtn}
            </div>
        ) : null

        return (

            <div className="panel panel-default" style={this.props.customStyle}>
                <div className={classNames( 'panel-heading', {
                    'click-pointer': this.props.togglable !== false,
                    'hidden': !!this.props.hideTitle
                } )}
                    onClick={this.togglePanelContent}>
                    <h3 className={classNames( 'panel-title', {
                        'has-spinner': this.props.showSpinner
                    } )}>
                        {this.props.panelTitle}
                    </h3>
                    {titleSpinner}
                    {lCustomControls}
                    {rCustomControls}
                    <div className={classNames( 'actions', { 'hidden': this.props.togglable === false } )}>
                        <span className={classNames( 'fas', {
                            'fa-chevron-down': !this.state.opened,
                            'fa-chevron-up': this.state.opened
                        }
                        )} />
                    </div>
                </div>
                <div className={classNames( 'panel-body', {
                    'hidden': !this.state.opened
                } )}>
                    {this.props.children}
                </div>
                {panelFooter}
            </div>

        )
    }

    componentWillReceiveProps( nextProps: TogglePanel.Props ) {
        if ( this.props.defaultOpened !== nextProps.defaultOpened ) {
            this.setState( {
                opened: nextProps.defaultOpened
            } )
        }
    }

    private togglePanelContent = ( event: any ): void => {
        if ( this.props.togglable !== false ) {
            this.setState( {
                opened: !this.state.opened
            }, () => {
                if ( this.props.toggleCallback ) {
                    this.props.toggleCallback( this.state.opened )
                }
            } )
        }
    }

}

export default TogglePanel