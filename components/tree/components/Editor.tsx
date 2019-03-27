import * as React from 'react'
import classNames from 'classnames'

module Editor {
    export interface Props {
        formOpened: boolean;
        canModifyTree: ( emptyVals: string[] ) => void;
        disabled: boolean;
        expandAll: ( event: React.SyntheticEvent<HTMLButtonElement, Event> ) => void;
        collapseAll: ( event: React.SyntheticEvent<HTMLButtonElement, Event> ) => void;
        openCreateForm: () => void;
        openEditForm: () => void;
        deleteNode: () => void;
        clearForm: () => void;
        wordings: { [id: string]: string; };

        children: React.ReactNode;
    }
}

function Editor( props: Editor.Props ) {
    const { children, formOpened, canModifyTree, disabled, expandAll, collapseAll, openCreateForm, openEditForm, deleteNode, clearForm, wordings } = props

    return (
        <React.Fragment>
            <div className="row text-xs-center">
                <div className="col-xs-12">
                    <button type="button" disabled={disabled} className={classNames( 'btn btn-trans btn-primary right-margin bottom-margin' )} onClick={expandAll}>
                        <span>{wordings.expand}</span>
                    </button>
                    <button type="button" disabled={disabled} className={classNames( 'btn btn-trans btn-primary right-margin bottom-margin' )} onClick={collapseAll}>
                        <span>{wordings.collapse}</span>
                    </button>
                    {
                        canModifyTree ? (
                            <span>
                                <button type="button" disabled={disabled} className={classNames( 'btn btn-trans btn-success right-margin bottom-margin' )} onClick={openCreateForm}>
                                    {wordings.createChild}
                                </button>
                                <button type="button" disabled={disabled} className={classNames( 'btn btn-trans btn-warning right-margin bottom-margin' )} onClick={openEditForm}>
                                    {wordings.edit}
                                </button>
                                <button type="button" disabled={disabled} className={classNames( 'btn btn-trans btn-danger right-margin bottom-margin' )} onClick={deleteNode}>
                                    {wordings.delete}
                                </button>
                                <button type="button" disabled={disabled} className={classNames( 'btn btn-trans btn-font right-margin bottom-margin', {
                                    'hidden': !formOpened
                                } )} onClick={clearForm}>
                                    {wordings.cancel}
                                </button>
                            </span>
                        ) : null
                    }
                </div>
            </div>

            {children}
        </React.Fragment>
    )
}

export default Editor