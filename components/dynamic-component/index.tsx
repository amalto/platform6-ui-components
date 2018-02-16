import * as React from 'react'
import * as ReactDOM from 'react-dom'

//utils & stores
import { MULTILANGUAGE_WORDINGS } from '@amalto/wordings'
import { compileWordings } from '@amalto/helpers'

//web api utils
import { ReduxProps } from './models/ReduxProps'

import Spinner from '@amalto/spinner'

//models
import { WebApi } from './models/WebApi'
import NotificationModel from './models/NotificationModel'
import { AppKey } from './models/AppKey'
import { RunningJob } from './models/JobControl'

//modules
import * as classNames from 'classnames'

/**
 * Display any component passed as props.
 */
namespace DynamicComponent {
    export interface Props extends React.Props<DynamicComponent> {

        /** Interface used to perform all the api call to the server. */
        api: WebApi;
        /** Allow you to handle your navigation. */
        appHistory: History;

        /** Component to be display by an eval. */
        componentScript: string;
        /** Component data to be passed has props. */
        componentData?: any;
        /** Refresh data to be passed to component. */
        refreshData?: () => void;
        /** Context data saved into store to be restored on serveur. */
        contextData?: any;
        /** Store component data inside the store as contextData. */
        storeContext?: ( contextData: any ) => void;
        /** Set dirty status of the component. */
        setStatus?: ( hasUnsavedChanges: boolean ) => void;
        /** Component height. */
        height?: number;
        /** Component fullscreen status. */
        fullscreen?: boolean;
        /** Manage component fullscreen status. */
        setFullscreen?: ( fullscreen: boolean ) => void;
        /** Reload tooltip if not displayed correctly. */
        reloadTooltips?: () => void;
        /** Show current job status. */
        showJobStatus?: ( jobId: string | number, callbackOnComplete?: ( job: RunningJob ) => void ) => void;
        /** If any application publisher profile is accessible to user. */
        canSelectAppKey?: boolean;
        /** Current application publisher profile object selected. */
        selectedAppKey?: AppKey;
        /** Current application publisher profile name selected. */
        selectedAppKeyName?: string;
        /** Application publisher profile is installed. */
        hasAppKeyInstalled?: ( appKeyName: string ) => boolean;

        /** Display the custom confirmation modal. */
        showDialog: ( title: string, body: React.ReactElement<any> | string, confirmAction?: any, cancelAction?: any, confirmLevel?: string, itemsList?: string[] ) => void;
        /** Hide the confirmation modal. */
        hideDialog: () => void;
        /** Display a custom notification. */
        displayNotification: ( notificationOptions: NotificationModel ) => void;
        /** Display an error notification for  */
        handleErrorDisplay: ( error: any ) => void;

        /** Locale use. */
        locale: string;

        /** Hide props from documentation */

        /** @ignore */
        children?: React.ReactNode;
        /** @ignore */
        key?: React.ReactText;
        /** @ignore */
        ref?: React.Ref<DynamicComponent>;
    }

    export interface State {

        dynamicComponent?: any;
        display?: JSX.Element;
        preventRedraw?: boolean;
        wordings?: { [id: string]: string };
    }

    export interface CustomProps extends ReduxProps {
        data?: any;
        api: WebApi;
        refreshData: () => void;
        contextData?: any;
        storeContext?: ( contextData: any ) => void;
        appHistory: History;
        showDialog: ( title: string, body: React.ReactElement<any> | string, confirmAction?: any, cancelAction?: any, confirmLevel?: string, itemsList?: string[] ) => void;
        hideDialog: () => void;
        displayNotification: ( notificationOptions: NotificationModel ) => void;
        handleErrorDisplay: ( error: any ) => void;
        setStatus?: ( hasUnsavedChanges: boolean ) => void;
        height?: number;
        fullscreen?: boolean;
        setFullscreen?: ( fullscreen: boolean ) => void;
        reloadTooltips?: () => void;
        showJobStatus?: ( jobId: string | number, callbackOnComplete?: ( job: RunningJob ) => void ) => void;
        canSelectAppKey?: boolean;
        selectedAppKey?: AppKey;
        selectedAppKeyName?: string;
        hasAppKeyInstalled?: ( appKeyName: string ) => boolean;
    }
}

class DynamicComponent extends React.Component<DynamicComponent.Props, DynamicComponent.State> {

    constructor( props: DynamicComponent.Props ) {
        super( props )
        this.state = {
            dynamicComponent: null,
            display: null,
            preventRedraw: false,
            wordings: compileWordings( MULTILANGUAGE_WORDINGS, props.locale )
        }
    }

    render() {

        const { componentData, height, fullscreen, setFullscreen, showDialog, hideDialog, displayNotification, handleErrorDisplay, setStatus, storeContext, contextData, reloadTooltips, showJobStatus, selectedAppKey, selectedAppKeyName, canSelectAppKey, hasAppKeyInstalled, api, appHistory } = this.props

        const componentProps: DynamicComponent.CustomProps = {
            data: componentData,
            api,
            appHistory,
            height,
            fullscreen,
            setFullscreen,
            refreshData: this.refreshData,
            showDialog,
            hideDialog,
            displayNotification,
            handleErrorDisplay,
            setStatus,
            storeContext,
            contextData,
            reloadTooltips,
            showJobStatus,
            canSelectAppKey,
            selectedAppKey,
            selectedAppKeyName,
            hasAppKeyInstalled
        }

        return (
            <div>

                {
                    this.state.dynamicComponent ? (
                        <this.state.dynamicComponent
                            {...componentProps}
                        />
                    ) : this.state.display
                }

            </div>
        )

    }

    componentDidMount() {
        this.setState( {
            display: this.getComponentDisplay()
        } )
    }

    componentDidUpdate( prevProps: DynamicComponent.Props, prevState: DynamicComponent.State ) {
        if ( ( this.state.preventRedraw !== true ) && ( prevProps.componentScript !== this.props.componentScript ) || ( prevProps.componentData !== this.props.componentData ) ) {
            this.setState( {
                display: this.getComponentDisplay()
            } )
        }
    }

    private refreshData = () => {
        this.setState( {
            preventRedraw: true
        }, () => {
            this.props.refreshData()
        } )
    }

    private getComponentDisplay = (): JSX.Element => {
        const { componentScript } = this.props
        const { wordings } = this.state

        let content = <div />

        if ( componentScript ) {
            let dynamicComponent = eval( componentScript )

            if ( dynamicComponent ) {

                this.setState( {
                    dynamicComponent: dynamicComponent.default || dynamicComponent
                } )

                return (
                    <Spinner />
                )
            }
            else {
                content = (
                    <div className="text-medium danger-color" style={{ lineHeight: '22px' }}>
                        <span className="fa fa-exclamation-triangle right-spaced" />
                        <span>{wordings['dynamiccomponent.error.loading']}</span>
                    </div>
                )
            }
        }

        return (
            <div>
                {content}
            </div>
        )
    }

}

export default DynamicComponent