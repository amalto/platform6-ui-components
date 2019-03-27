// Modules
import * as React from 'react'
import * as classNames from 'classnames'

// Components
import Spinner from '@amalto/spinner'

/**
 * Panel component with configuration buttons.
 */
module TogglePanel {
    export interface Props {
        /** Header title. */
        panelTitle: string | JSX.Element;
        /**
         * Panel state on first render.
         * @default false
         */
        defaultOpened: boolean;
        /**
         * Totally hide the header.
         * Props <span className='quote'>panelTitle</span>, <span className='quote'>togglable</span>, <span className='quote'>showSpinner</span>, <span className='quote'>leftCustomControls</span> and <span className='quote'>rightCustomControls</span> wont be used if true.
         * @default false
         */
        hideTitle?: boolean;
        /**
         * Alow user to open and close panel.
         * @default false
         */
        togglable?: boolean;
        /** Panel toggling event. */
        toggleCallback?: ( opened: boolean ) => void;
        /**
         * Show spinner on the left side of header title.
         * @default false
         */
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
        /** CSS class for the header. */
        headerCustomCSS?: string;

        children?: React.ReactNode;
    }
}


function TogglePanel( props: TogglePanel.Props ) {

    const { togglable } = props

    const [opened, setOpened] = React.useState( props.defaultOpened )
    const [toggledPanel, setToggledPanel] = React.useState( false )

    React.useEffect( () => {
        if ( toggledPanel ) {
            props.toggleCallback && props.toggleCallback( opened )
            setToggledPanel( false )
        }
    }, [toggledPanel] )

    function togglePanelContent(): void {
        if ( togglable !== false ) {
            setOpened( !opened )
            setToggledPanel( true )
        }
    }

    let titleSpinner = props.showSpinner ? (
        <div className="spinner-container">
            <Spinner />
        </div>
    ) : null

    let lCustomControls = props.leftCustomControls ? (
        <div className="panel-heading-controls">
            {props.leftCustomControls}
        </div>
    ) : null

    let rCustomControls = props.rightCustomControls ? (
        <div className="panel-heading-controls" style={{ right: 0 }}>
            {props.rightCustomControls}
        </div>
    ) : null

    const cancelBtn = ( props.cancelBtn && props.cancelBtn.label && props.cancelBtn.action ) ? (
        <button type="button" className={classNames( 'btn', props.cancelBtn.cssClass, {
            'btn-font btn-trans': !props.cancelBtn.cssClass
        } )} onClick={props.cancelBtn.action}>
            {props.cancelBtn.label}
        </button>
    ) : null

    const submitBtn = ( props.submitBtn && props.submitBtn.label && props.submitBtn.action ) ? (
        <button type="button" className={classNames( 'btn pull-right', props.submitBtn.cssClass, {
            'btn-success': !props.submitBtn.cssClass
        } )} onClick={props.submitBtn.action}>
            {props.submitBtn.label}
        </button>
    ) : null

    let panelFooter = ( cancelBtn || submitBtn ) ? (
        <div className="panel-footer">
            {cancelBtn}
            {submitBtn}
        </div>
    ) : null

    return (

        <div className="panel panel-default" style={props.customStyle}>
            <div className={classNames( `panel-heading ${ props.headerCustomCSS }`, {
                'click-pointer': props.togglable !== false,
                'hidden': !!props.hideTitle
            } )}
                onClick={togglePanelContent}>
                <h3 className={classNames( 'panel-title', {
                    'has-spinner': props.showSpinner
                } )}>
                    {props.panelTitle}
                </h3>
                {titleSpinner}
                {lCustomControls}
                {rCustomControls}
                <div className={classNames( 'actions', { 'hidden': props.togglable === false } )}>
                    <span className={classNames( 'fas', {
                        'fa-chevron-down': !opened,
                        'fa-chevron-up': opened
                    }
                    )} />
                </div>
            </div>
            <div className={classNames( 'panel-body', {
                'hidden': !opened
            } )}>
                {props.children}
            </div>
            {panelFooter}
        </div>

    )

}

export default TogglePanel