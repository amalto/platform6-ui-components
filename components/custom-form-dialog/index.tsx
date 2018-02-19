import * as React from 'react'
import * as ReactDOM from 'react-dom'

//utils & stores
import { getStyleDef, compileWordings } from '@amalto/helpers'

//wordings
import { MULTILANGUAGE_WORDINGS } from '@amalto/wordings'

//models
import { WorkflowActionParam, CustomFormData } from './models/Workflow'
import { WebApi } from './models/WebApi'
import NotificationModel from './models/NotificationModel'

//components
import FormInput from './components/FormInput'
import Spinner from '@amalto/spinner'
import TogglePanel from '@amalto/toggle-panel'

//web api utils
import { ReduxProps } from './models/ReduxProps'

//modules
import * as classNames from 'classnames'

import FileWrapper from './models/FileWrapper'

/** Custom component display on a modal's panel body. */
namespace CustomFormDialog {
    export interface Props extends React.Props<CustomFormDialog> {

        /** Interface used to perform all the api call to the server. More details on [WebApi](http://localhost:6060/#webapi). */
        api: WebApi;
        /** Allow you to handle your navigation. */
        appHistory: History;

        /** Panel title. */
        title: string;
        /** Initial state of the form. More details on [CustomFormData](http://localhost:6060/#customformdata). */
        formData: CustomFormData;
        /** Refresh component data. */
        refreshData: () => void;
        /** Close form. */
        closeForm: () => void;
        /** Confirm form submission. */
        confirmAction: ( params: { [fieldName: string]: string | boolean } ) => void;
        /** Temporary token used to upload a file. */
        fileUploadSessionToken?: string;
        /** Generating a temporary token associated to the file you want to upload. */
        newFileUploadSession?: () => void;
        /** Cancel upload. */
        cancelFileUploadSession?: () => void;
        /** File to be uploaded. More details on [FileWrapper](http://localhost:6060/#filewrapper). */
        filesQueue?: {
            [fileName: string]: FileWrapper
        };
        /** Append file to queue. */
        addFiles?: ( files: File[] ) => void;
        /** Remove file from queue. */
        deleteFile?: ( fileName: string ) => void;

        /** Display the custom confirmation modal. */
        showDialog: ( title: string, body: React.ReactElement<any> | string, confirmAction?: any, cancelAction?: any, confirmLevel?: string, itemsList?: string[] ) => void;
        /** Hide the confirmation modal. */
        hideDialog: () => void;
        /** Display a custom notification. More details on [NotificationModel](http://localhost:6060/#notificationmodel). */
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
        ref?: React.Ref<CustomFormDialog>;
    }

    export interface State {

        customComponent?: any;
        display?: JSX.Element;
        preventRedraw?: boolean;
        wordings?: { [id: string]: string};
    }

    export interface CustomComponentProps extends ReduxProps {

        //WF SPECIFIC component title + submit utilities
        title: string;
        closeForm: () => void;
        submitForm: ( payload: { [fieldName: string]: string | boolean } ) => void;

        //injected data
        initialValues?: any;//used by redux forms
        //alias of initial values
        data?: any;

        //WF SPECIFIC files handling        
        fileUploadSessionToken?: string;
        newFileUploadSession?: () => void;
        cancelFileUploadSession?: () => void;
        filesQueue?: {
            [fileName: string]: FileWrapper
        };
        addFiles?: ( files: File[] ) => void;
        deleteFile?: ( fileName: string ) => void;

        //utils
        api: WebApi;
        appHistory: History;
        refreshData: () => void;
        showDialog: ( title: string, body: React.ReactElement<any> | string, confirmAction?: any, cancelAction?: any, confirmLevel?: string, itemsList?: string[] ) => void;
        hideDialog: () => void;
        displayNotification: ( notificationOptions: NotificationModel ) => void;
        handleErrorDisplay: ( error: any ) => void;
    }
}

class CustomFormDialog extends React.Component<CustomFormDialog.Props, CustomFormDialog.State> {

    constructor( props: CustomFormDialog.Props ) {
        super( props )
        this.state = {
            customComponent: null,
            display: null,
            preventRedraw: false,
            wordings: compileWordings( MULTILANGUAGE_WORDINGS, props.locale )
        }
    }

    render() {

        const {
            api,
            title,
            closeForm,
            formData,
            fileUploadSessionToken, newFileUploadSession, cancelFileUploadSession, filesQueue, addFiles, deleteFile,
            showDialog, hideDialog, displayNotification, handleErrorDisplay,
            appHistory
        } = this.props

        const componentProps: CustomFormDialog.CustomComponentProps = {
            title: title,
            closeForm: closeForm,
            submitForm: this.submitForm,

            initialValues: formData.model,
            data: formData.model,

            fileUploadSessionToken: fileUploadSessionToken,
            newFileUploadSession: newFileUploadSession,
            cancelFileUploadSession: cancelFileUploadSession,
            filesQueue: filesQueue,
            addFiles: addFiles,
            deleteFile: deleteFile,

            api,
            appHistory,
            refreshData: this.refreshData,
            showDialog: showDialog,
            hideDialog: hideDialog,
            displayNotification: displayNotification,
            handleErrorDisplay: handleErrorDisplay
        }

        return (
            <div className="form-dialog">

                <div className="col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2">

                    {
                        this.state.customComponent ? (
                            <this.state.customComponent
                                {...componentProps}
                            />
                        ) : this.state.display
                    }

                </div>

            </div>
        )

    }

    componentDidMount() {
        this.setState( {
            display: this.getFormDisplay()
        } )
    }

    componentDidUpdate( prevProps: CustomFormDialog.Props, prevState: CustomFormDialog.State ) {
        if ( ( this.state.preventRedraw !== true ) && prevProps.formData !== this.props.formData ) {
            this.setState( {
                display: this.getFormDisplay()
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

    private getFormDisplay = (): JSX.Element => {
        const { formData } = this.props
        const { wordings } = this.state

        let dialogContent = <div />

        if ( formData.fetching ) {
            dialogContent = <Spinner />
        }
        else if ( formData.content ) {
            let customComponent = eval( this.props.formData.content )

            if ( customComponent ) {

                this.setState( {
                    customComponent: customComponent.default || customComponent
                } )

                return (
                    <Spinner />
                )
            }
            else {
                dialogContent = (
                    <div className="text-medium danger-color" style={{ lineHeight: '22px' }}>
                        <span className="fa fa-exclamation-triangle right-spaced" />
                        <span>{wordings['customformdialog.error.loading']}</span>
                    </div>
                )
            }
        }
        else if ( formData.loadingError ) {
            dialogContent = (
                <div className="text-medium danger-color" style={{ lineHeight: '22px' }}>
                    <span className="fa fa-exclamation-triangle right-spaced" />
                    <span>{wordings['customformdialog.error.loading']}</span>
                </div>
            )
        }

        return (
            <TogglePanel panelTitle={this.props.title}
                defaultOpened={true} togglable={false}
                cancelBtn={{
                    label: wordings['customformdialog.cancel'],
                    action: this.props.closeForm
                }}>

                <div className="col-xs-12">
                    {dialogContent}
                </div>

            </TogglePanel>
        )
    }

    private submitForm = ( payload: { [fieldName: string]: string | boolean } ) => {
        this.props.closeForm()
        this.props.confirmAction( payload )
    }

}


export default CustomFormDialog