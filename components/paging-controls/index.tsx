import * as React from 'react'

import { compileWordings } from '@amalto/helpers'
import { MULTILANGUAGE_WORDINGS } from '@amalto/wordings'

//modules
import { FormattedNumber } from 'react-intl'
import * as classNames from 'classnames'

/**
 * Page navigation toolbar.
 */
module PagingControls {
    export interface Props extends React.Props<PagingControls> {
        /** Class for the PagingControls component. */
        containerClass: string;
        /** Current page selected. */
        currentPage: number;
        /** Total page */
        totalPages: number;
        /** Method triggered when changing page. */
        handlePageChange: ( newPage: number | string ) => void;
        /** Get previous and next context from the handlePageChange props. */
        byContext?: {
            prevContextToken: string;
            nextContextToken: string;
        }
        /** Locale to bu used. */
        locale: string;

        /** Hide props from documentation */

        /** @ignore */
        children?: React.ReactNode;
        /** @ignore */
        key?: React.ReactText;
        /** @ignore */
        ref?: React.Ref<PagingControls>;
    }

    export interface State {
        wordings?: { [key: string]: string };
    }
}


class PagingControls extends React.Component<PagingControls.Props, PagingControls.State> {
    constructor( props: PagingControls.Props ) {
        super( props )
        this.state = {
            wordings: compileWordings( MULTILANGUAGE_WORDINGS, props.locale )
        }
    }

    render() {

        const { containerClass, currentPage, totalPages, byContext } = this.props

        //basic paging control by page number
        let prevDisabled = currentPage === 1
        let nextDisabled = totalPages === 1 || ( currentPage === totalPages )

        //paging control by context tokens
        if ( byContext ) {
            prevDisabled = !byContext.prevContextToken
            nextDisabled = !byContext.nextContextToken
        }

        return (

            totalPages !== 1 ? (

                <div className={containerClass}>

                    {
                        byContext ? null : (
                            <button type="button" disabled={prevDisabled} className="btn btn-primary btn-trans" onClick={this.goToFirstPage}>
                                <span className="fa fa-fw fa-fast-backward"></span>
                            </button>
                        )
                    }

                    <button type="button" disabled={prevDisabled} className="btn btn-primary btn-trans" onClick={this.goToPrevPage}>
                        <span className="fa fa-fw fa-backward"></span>
                    </button>

                    <span className="btn btn-primary btn-trans text-element no-border-right">
                        <span className="right-spaced">{this.state.wordings['pagingcontrols.page']}</span>
                        <strong className="right-spaced">
                            <FormattedNumber value={currentPage} />
                        </strong>
                        <span className="right-spaced">{this.state.wordings['pagingcontrols.page.of']}</span>
                        <span><FormattedNumber value={totalPages} /></span>
                    </span>

                    <button type="button" disabled={nextDisabled} className="btn btn-primary btn-trans" onClick={this.goToNextPage}>
                        <span className="fa fa-fw fa-forward"></span>
                    </button>

                    {
                        byContext ? null : (
                            <button type="button" disabled={nextDisabled} className="btn btn-primary btn-trans" onClick={this.goToLastPage}>
                                <span className="fa fa-fw fa-fast-forward"></span>
                            </button>
                        )
                    }
                </div>
            ) : null
        )
    }

    private goToFirstPage = ( event: any ): void => {
        $( event.currentTarget ).blur()//removes active state on the button
        this.props.handlePageChange( 1 )
    }

    private goToNextPage = ( event: any ): void => {
        $( event.currentTarget ).blur()

        const { byContext, handlePageChange } = this.props

        if ( byContext ) {
            handlePageChange( byContext.nextContextToken )
        }
        else {
            handlePageChange( this.props.currentPage + 1 )
        }

    }

    private goToPrevPage = ( event: any ): void => {
        $( event.currentTarget ).blur()

        const { byContext, handlePageChange } = this.props

        if ( byContext ) {
            handlePageChange( byContext.prevContextToken )
        }
        else {
            handlePageChange( this.props.currentPage - 1 )
        }

    }

    private goToLastPage = ( event: any ): void => {
        $( event.currentTarget ).blur()
        this.props.handlePageChange( this.props.totalPages )
    }

}

export default PagingControls