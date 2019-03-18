// Modules
import * as React from 'react'
import { FormattedNumber } from 'react-intl'

// Utils
import { getWordings } from '@amalto/helpers'

/**
 * Page navigation toolbar.
 * 
 * PagingControls uses [WebStorage](#webstorage)'s properties
 * which are accessible at the root component of your service.
 */
module PagingControls {
    export interface Props {
        /** CSS class wrapping the component. */
        containerClass?: string;
        /** Current page selected. */
        currentPage: number;
        /** Total page */
        totalPages: number;
        /** Method triggered when changing page. */
        handlePageChange: ( newPage: number | string ) => void;
        /** Get previous and next context from the <span className='quote'>handlePageChange</span> props. */
        byContext?: {
            prevContextToken: string;
            nextContextToken: string;
        }
        /**
         * Language to use on the component. e.g: <span className='quote'>en-US</span>.
         * Locales available at [Locale](#locale).
         * Accessible via [WebStorage](#webstorage).
         */
        locale: string;
    }
}

function PagingControls( props: PagingControls.Props ) {
    const [wordings, setWordings] = React.useState( {} as any )

    const { containerClass, currentPage, totalPages, byContext } = props

    const goToPageInput = React.useRef( null )

    React.useEffect( () => {
        setWordings( getWordings( {}, props.locale ) )
    }, [props.locale] )

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
                        <button type="button" disabled={prevDisabled} className="btn btn-primary btn-trans" onClick={e => goToFirstPage( e, props.handlePageChange )}>
                            <span className="fas fa-fw fa-fast-backward"></span>
                        </button>
                    )
                }

                <button type="button" disabled={prevDisabled} className="btn btn-primary btn-trans" onClick={e => goToPrevPage( e, props )}>
                    <span className="fas fa-fw fa-backward"></span>
                </button>

                <span className="btn btn-primary btn-trans text-element no-border-right">
                    <span className="right-spaced">{wordings.page}</span>
                    <strong className="right-spaced">
                        {
                            byContext ? <FormattedNumber value={currentPage} /> : (
                                <input
                                    style={{ color: '#61a653' }}
                                    type="text"
                                    size={( totalPages ).toString().length}
                                    value={currentPage}
                                    onChange={e => handleGoToPageInput( e, props )}
                                    ref={goToPageInput}
                                    onFocus={() => { goToPageInput.current.select() }}
                                />
                            )
                        }
                    </strong>
                    <span className="right-spaced">{wordings.of}</span>
                    <span><FormattedNumber value={totalPages} /></span>
                </span>

                <button type="button" disabled={nextDisabled} className="btn btn-primary btn-trans" onClick={e => goToNextPage( e, props )}>
                    <span className="fas fa-fw fa-forward"></span>
                </button>

                {
                    byContext ? null : (
                        <button type="button" disabled={nextDisabled} className="btn btn-primary btn-trans" onClick={e => goToLastPage( e, props )}>
                            <span className="fas fa-fw fa-fast-forward"></span>
                        </button>
                    )
                }
            </div>
        ) : null
    )
}

// Select page from input
function handleGoToPageInput( event: React.ChangeEvent<HTMLInputElement>, props: PagingControls.Props ): void {
    const { totalPages, handlePageChange } = props
    if ( /^\d+$/.test( event.target.value ) && parseInt( event.target.value ) > 0 && parseInt( event.target.value ) <= totalPages ) {
        handlePageChange( parseInt( event.target.value ) )
    }
    else {
        this.goToPageInput.blur()
    }
}

// Go back to first page
function goToFirstPage( event: any, handlePageChange: ( newPage: number | string ) => void ): void {
    $( event.currentTarget ).blur()//removes active state on the button
    handlePageChange( 1 )
}

// Go to next page
function goToNextPage( event: any, props: PagingControls.Props ): void {
    $( event.currentTarget ).blur()

    const { byContext, handlePageChange } = props

    if ( byContext ) {
        handlePageChange( byContext.nextContextToken )
    }
    else {
        handlePageChange( props.currentPage + 1 )
    }

}

// Go to previous page
function goToPrevPage( event: any, props: PagingControls.Props ): void {
    $( event.currentTarget ).blur()

    const { byContext, handlePageChange } = props

    if ( byContext ) {
        handlePageChange( byContext.prevContextToken )
    }
    else {
        handlePageChange( props.currentPage - 1 )
    }

}

// Go to last page
function goToLastPage( event: any, props: PagingControls.Props ): void {
    $( event.currentTarget ).blur()
    props.handlePageChange( props.totalPages )
}

export default PagingControls